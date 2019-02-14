const common = require('./common');
const request = require('./request');

var address = null;

//this function takes a authetication token from sessions api
async function query(options){

  if(engine.session.check() == false){
    return common.error('not_found-session');
  }
  if(typeof(options) !== 'object'){
    return common.error('invalid_options');
  }

  let token = engine.session.get.token();

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

  let worker = await request.send(options);
  if(worker == false){
    return common.error('failed-wet_query');
  }
  return worker;

}

module.exports = {

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
        return common.error('please set the api address first');
      }
      if(!options){
        return common.error('not_found-options');
      }
      if(options){
        if(options.at){
          options.url = address + options.at;
          let result = await query(options);
          if(result == false){
            return common.error('failed-wet_api_query');
          } else {
            return result;
          }
        } else {
          return common.error('not_found-options=>at');
        }
      }
      return common.error('invalid-options');
    }

  },

  query : query

};
