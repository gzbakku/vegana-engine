const common = require('./common');
const router = require('./router');
const view = require('./view');
const log = false;

module.exports= {

  hover : function(id,func){

    if(!id || !func){
      return common.error('not_found-id/function=>binder-hover');
    }

    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    get.addEventListener('mouseenter',()=>{
      func(id);
    });
    return id;

  },

  click : function(id,func){

    if(!id || !func){
      return common.error('not_found-id/function=>binder-click');
    }

    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    get.addEventListener('click',()=>{
      func(id);
    });
    return id;

  },

  text : function(id){

    if(id == null){
      return common.error('no_id_found');
    }

    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    return get.value;

  },

  number : function(id){

    if(id == null){
      return common.error('no_id_found');
    }

    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    if(Number(get.value)){
      return Number(get.value);
    } else {
      return false;
    }

  },

  value : function(id){

    if(id == null){
      return common.error('no_id_found');
    }

    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    if(get.value){
      return get.value;
    } else if(get.innerHTML){
      return get.innerHTML;
    } else {
      return false;
    }

  },

  active : function(id){

    if(id == null){
      return common.error('no_id_found');
    }
    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    if(get.checked){
      return true;
    } else {
      return false;
    }

  },

  boolean : function(id){

    if(id == null){
      return common.error('no_id_found');
    }

    let get = document.getElementById(id);
    if(get == null){
      return common.error('invalid_id');
    }

    let value = get.value;

    try{
      return JSON.parse(value);
    } catch(err){
      return null;
    }

  }

};
