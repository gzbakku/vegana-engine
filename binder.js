const common = require('./common');
const router = require('./router');
const view = require('./view');
const log = false;

module.exports= {

  click : function(id,func){

    common.tell('### binding click',log);

    if(id == null){
      return common.error('no_id_found');
    }
    if(func == null){
      return common.error('no_function_found');
    }

    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    get.addEventListener('click',func);
    return id;

  },

  text : function(id,func){

    common.tell('### binding click',log);

    if(id == null){
      return common.error('no_id_found');
    }
    if(func == null){
      //return common.error('no_function_found');
    }

    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    return get.value;

  }

};
