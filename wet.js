
var address = null;

let socket_requests = {};

function get_request_id() {
  while(true){
    let uid = engine.uniqid();
    if(!socket_requests.hasOwnProperty(uid)){return uid;}
  }
}

async function query(options){

  if(socket){
    let request_id = get_request_id();
    socket.send(JSON.stringify({
      id:request_id,
      at:options.at,
      body:options.body
    }));
    setTimeout(()=>{
      if(!socket_requests[request_id]){return true;}
      socket_requests[request_id].reject("timed out");
    },options.timeout || options.expire || 3000);
    return new Promise((resolve,reject)=>{
      socket_requests[request_id] = {resolve:resolve,reject:reject};
    });
  }

  if(typeof(options) !== 'object'){
    return engine.common.error('invalid_options');
  }

  if(!options.method){
    options.method = 'POST';
  }

  if(options){
    if(typeof(options) == 'object'){
      if(!options.url){
        return engine.common.error('not_found-url=>options');
      }
      if(!options.body){
        return engine.common.error('not_found-body=>options');
      }
      if(engine.session.check()){
        let token = engine.session.get.token();
        if(options.headers){
          if(typeof(options.headers) !== 'object'){
            options.headers['td-wet-token'] = token;
          } else {
            options.headers = {
              'td-wet-token':token
            };
          }
        } else {
          options.headers = {
            'td-wet-token':token
          };
        }
      }

    }
  }

  let worker = await engine.request(options);
  if(worker == false){
    return engine.common.error('failed-wet_query');
  }
  return worker;

}

let socket;
let socket_data = {};
let message_handler;

function retry_websocket(secs){
  setTimeout(()=>{
    module.exports.tryWebSocket().then(()=>{
      console.log("retry successfull");
    }).catch(()=>{
      if(secs < 10){secs += 2;}
      retry_websocket(secs);
    });
  },secs*1000);
}

module.exports = {

  get_web_socket:()=>{return socket;},

  send:(message)=>{
    if(!socket){return false;}
    if(typeof(message) === "object"){message = JSON.stringify(message);}
    socket.send(message);
  },

  add_message_handler:(handler)=>{message_handler = handler;},

  tryWebSocket:()=>{

    return new Promise((resolve,reject)=>{

      if(socket && socket_data.authenticated){resolve();}

      if(!engine.session.check()){return false;}

      let base = engine.wet.api.get();
      base = base.replace("https://","");
      base = base.replace("http://","");
      base = 'ws://' + base;

      socket = new WebSocket(base);

      socket.onopen = (e)=>{
        // console.log("connection estalished");
        socket.send(JSON.stringify({token:engine.session.get.token()}));
      };

      socket.onmessage = (e)=>{
        try{
          let parsed = JSON.parse(e.data);
          if(!socket_data.authenticated){
            if(parsed.auth !== true){
              reject("auth failed");
            } else {
              socket_data.authenticated = true;
              resolve();
              return;
            }
          }
          if(
            parsed.hasOwnProperty("request_id") &&
            parsed.hasOwnProperty("body")
          ){
            if(socket_requests[parsed.request_id]){
              socket_requests[parsed.request_id].resolve(parsed.body);
            }
          } else {
            if(message_handler instanceof Function){
              message_handler(parsed);
            }
          }
        }catch(e){
          if(message_handler instanceof Function){
            message_handler(e.data,e);
          }
        }
      };

      socket.onerror = (e)=>{
        console.log(e);
        console.log("wet websocket connection error");
      }

      socket.onclose = (e)=>{
        socket = undefined;
        socket_data = {};
        console.log(e);
        console.log("wet websocket connection closed");
        retry_websocket(3);
      }

    });



  },

  address:address,

  api:{

    get : function(){
      return address;
    },

    set : function(url){
      address = url;
      return true;
    },

    query : async function(options){
      //this query is performed without authetication token
      if(address == null){
        return engine.common.error('please set the api address first');
      }
      if(!options){
        return engine.common.error('not_found-options');
      }
      if(options){
        if(options.at){
          options.url = address + options.at;
          let result = await query(options);
          if(result == false){
            return engine.common.error('failed-wet_api_query');
          } else {
            return result;
          }
        } else {
          return engine.common.error('not_found-options=>at');
        }
      }
      return engine.common.error('invalid-options');
    }

  },

  query : query

};
