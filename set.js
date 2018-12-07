const common = require('./common');
const log = false;

module.exports = {

  pageTitle : function(title){

    common.tell('setting pageTitle',log);

    if(typeof(title) !== 'string'){
      return common.error('invalid-title-data_type');
    }

    document.title = title;
    return true;

  },

  input : {

    value : function(id,value){
      let get = document.getElementById(id);
      if(get == null){
        return common.error('invalid-parent');
      }
      get.value = value;
      return true;
    }

  },

  div : {

    value : function(id,value){
      let get = document.getElementById(id);
      if(get == null){
        return common.error('invalid-parent');
      }
      get.innerHTML = value;
      return true;
    }

  }

}
