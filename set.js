
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
  if(!id || !styles){return engine.common.error("not_found-id/styles");}
  let object = engine.get.element(id);
  if(!object){return engine.common.error('invalid-parent');}
  for(let style in styles){
    object.style[style] = styles[style];
  }
}
