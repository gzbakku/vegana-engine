

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
    return engine.make.creator('span',options);
  },

  div : function(options){
    return engine.make.creator('div',options);
  },

  heading : function(options){
    if(!options.level){options.level = 1;}
    return engine.make.creator('h' + options.level,options);
  },

  p : function(options){
    return engine.make.creator('p',options);
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
      if(options.location[0] !== '/'){
        if(!window.hasOwnProperty('is_electron') && !window.hasOwnProperty('is_cordova')){
          options.location = '/' + options.location;
        }
      }
      options.src = window.baseHref + options.location;
    }
    if(options.type == 'url'){
      options.src = options.location;
    }
    return engine.make.creator('img',options);
  }

};
