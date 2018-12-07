const common = require('./common');
const log = false;

module.exports = {

  send : async function(options){

    common.tell('sending request',log);

    if(typeof(options) !== 'object'){
      return common.error('invalid_options');
    }
    if(!options.body || !options.url){
      return common.error('not_found-body/headers/url/method||options');
    }

    let build = {
      method:'get',
      body:JSON.stringify(options.body)
    };

    common.tell('build configured',log);

    if(options.method){
      build['method'] = options.method;
    }
    //add header content type tag if doent exists for wet platform
    if(options.headers){
      build['headers'] = (options.headers);
      if(!options.headers['Content-Type']){
        if(typeof(options.body) == 'object'){
          build['headers']['Content-Type'] = 'application/json';
        }
      }
    }
    if(!options.headers){
      if(typeof(options.body) == 'object'){
        build['headers'] = {
          'Content-Type': 'application/json'
        }
      }
    }

    function reponseProcessor(str){
      try {
        /*
        let object = JSON.parse(str);
        if(typeof(object) == 'object'){
            return object;
        } else {
          return str;
        }
        */
        return str.json();
      } catch (err) {
        return str;
      }
    }

    let worker = await fetch(options.url,build)
    .then((response)=>{
      //console.log(response);
      if(typeof(response) == 'string'){
        return reponseProcessor(response);
      } else {
        let data = response.json();
        return data;
      }
    })
    .catch((error)=>{
      common.error('request_error : ' + error);
      return common.error('failed-request');
    });

    common.tell('worker called',log);

    return worker;

  }

};
