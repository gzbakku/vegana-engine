
module.exports = {

  pageTitle : function(title){

    if(typeof(title) !== 'string'){
      return engine.common.error('invalid-title-data_type');
    }

    document.title = title;
    return true;

  },

  input : {

    value : function(id,value){
      let get = document.getElementById(id);
      if(get == null){
        return engine.common.error('invalid-parent');
      }
      get.value = value;
      return true;
    }

  },

  style: style,

  div : {

    text : function(id,value){
      let get = document.getElementById(id);
      if(get == null){
        return engine.common.error('invalid-parent');
      }
      get.innerHTML = value;
      return true;
    },

    style: style

  }

}

function style(id,styles){

  if(!id || typeof(styles) !== 'object' || !styles.length || styles.length == 0){
    return engine.common.error("not_found-id/styles");
  }

  let get = document.getElementById(id);
  if(get == null){
    return engine.common.error('invalid-parent');
  }

  for(var i=0;i<styles.length;i++){
    let hold = styles[i];
    let key = Object.keys(hold)[0];
    get.style[key] = hold[key];
  }

}
