const common = require('./common');
const request = require('./request');

module.exports = {

  query : async function(options){

    if(engine.session.check() == false){
      return common.error('not_found-session');
    }
    if(typeof(options) !== 'object'){
      return common.error('invalid_options');
    }

    let token = engine.session.token;

    if(options){
      if(typeof(options) == 'object'){
        if(!options.url){
          return common.error('not_found-url=>options');
        }
        if(!options.body){
          return common.error('not_found-body=>options');
        }
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

    let worker = await request(options);
    return worker;

  }

};
