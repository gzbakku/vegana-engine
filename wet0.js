var address = null;

async function query(options){

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
