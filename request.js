const common = require('./common');
const log = true;

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
      method:'get'
    };

    if(options.method){
      build['method'] = options.method;
    }
    if(options.headers){
      build['headers'] = new Header(options.headers);
    }

    let worker = await request(options.url)
    .then((response)=>{
      return response;
    })
    .catch((error)=>{
      return common.error(error);
    });

    if(worker !== false){
      if(!JSON.parse(worker)){
        return JSON.parse(worker);
      } else {
        common.error('invalid-request_body=>invalid_json');
        return false;
      }
    } else {
      return worker;
    }

  }

};
