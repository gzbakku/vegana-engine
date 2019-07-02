const creator = require('./creator');

module.exports = {

  style : (options)=>{

    if(!options.id || !options.style){
      return engine.common.error('not_found-id/style-addStyle-make-engine');
    }

    let object = document.getElementById(options.id);
    if(object){
      object.style = options.style;
      return true;
    } else {
      return engine.common.error('not_found-doc_element_by_id-addStyle-make-engine');
    }

  },

  addClass : function(options){

    if(!options.id || !options.class){
      return engine.common.error('not_found-id/class-addClass-make-engine');
    }

    let object = document.getElementById(options.id);
    if(object){
      let style = object.className;
      if(style.indexOf(options.class) >= 0){
        return true;
      }
      style = style + ' ' + options.class;
      object.className = style;
      return true;
    } else {
      return engine.common.error('not_found-doc_element_by_id-addClass-make-engine');
    }


  },

  removeClass : function(options){

    if(!options.id || !options.class){
      return engine.common.error('not_found-id/class-removeClass-make-engine');
    }

    let object = document.getElementById(options.id);
    if(object){
      let style = object.className;
      if(style.indexOf(options.class) < 0){
        return true;
      }
      let updated = style.replace(options.class,"");
      object.className = updated;
      return true;
    } else {
      return engine.common.error('not_found-doc_element_by_id-removeClass-make-engine');
    }

  },

  span : function(options){
    if(options.function){
      let user_function = options.function;
      let local_function = (object)=>{
        user_function(object.id);
      };
      options.function = local_function;
    }
    return creator('span',options);
  },

  div : function(options){
    if(options.function){
      let user_function = options.function;
      let local_function = (object)=>{
        user_function(object.id);
      };
      options.function = local_function;
    }
    return creator('div',options);
  },

  heading : function(options){
    if(options.function){
      let user_function = options.function;
      let local_function = (object)=>{
        user_function(object.id);
      };
      options.function = local_function;
    }
    if(!options.level){options.level = 1;}
    return creator('h' + options.level,options);
  },

  p : function(options){
    if(options.function){
      let user_function = options.function;
      let local_function = (object)=>{
        user_function(object.id);
      };
      options.function = local_function;
    }
    return creator('p',options);
  },

  text : function(options){

    if(!options.id || !options.text){
      return engine.common.error('not_found-id/text-text-make-engine');
    }

    let object = document.getElementById(options.id);
    if(object){
      object.innerHTML = options.text;
      return true;
    } else {
      return engine.common.error('not_found-doc_element_by_id-text-make-engine');
    }

  },

  image : function(options){

    if(!options.location){
      return engine.common.error('not_found-image_location-image-make-engine');
    }
    if(!options.type || (options.type !== 'local' && options.type !== 'url')){
      options.type = 'local';
    }
    if(options.type == 'local'){
      options.src = window.baseHref + options.location;
    }
    if(options.type == 'url'){
      options.src = options.location;
    }
    if(options.function){
      let user_function = options.function;
      let local_function = (object)=>{
        user_function(object.id);
      };
      options.function = local_function;
    }

    return creator('img',options);

  }

};
