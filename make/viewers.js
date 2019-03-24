const common = require('../common');
const checkBaseOptions = require('./check').check;
const httpMarker = 'http://';

module.exports = {

  addClass : function(options){

    if(!options.id || !options.class){
      return common.error('not_found-id/class');
    }

    let object = document.getElementById(options.id);
    let style = object.className;
    if(style.indexOf(options.class) >= 0){
      return true;
    }
    style = style + ' ' + options.class;
    object.className = style;
    return true;

  },

  removeClass : function(options){

    if(!options.id || !options.class){
      return common.error('not_found-id/class');
    }

    let object = document.getElementById(options.id);
    let style = object.className;

    if(style.indexOf(options.class) < 0){
      return true;
    }

    let updated = style.replace(options.class,"");
    object.className = updated;
    return true;

  },

  span : function(options){

    //check options object
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make element
    let objectId = options.parent + '-div-' + options.id;
    let div = document.createElement("span");
    div.id = objectId;
    if(options.class){
      div.className = options.class;
    }
    if(options.function){
      div.addEventListener('click',options.function);
    }
    if(options.text !== undefined && options.text !== null){
      div.innerHTML = options.text;
    }
    if(options.style){
      div.style = options.style;
    }

    get.appendChild(div);
    return objectId;

  },

  div : div,

  text : function(options){

    //checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.parent){
      return common.error('no_parent_found');
    }
    if(!options.text){
      return common.error('no_text_found');
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent || parent : ' + options);
    }

    //set text
    get.innerHTML = options.text;
    return options.parent;

  },

  image : function(options){

    //checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.location || !options.type){
      return common.error('not_found-options=>location/type');
    }
    if(
      options.type !== 'local' &&
      options.type !== 'url'
    ){
      return common.error('invalid-type');
    }

    //get parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make image
    let imageId = options.parent + '-image-' + options.id;
    let imageObject = document.createElement("img");
    imageObject.id = imageId;
    if(options.class){
      imageObject.className = options.class;
    }
    if(options.type == 'local'){
      imageObject.src = window.baseHref + options.location;
    }
    if(options.type == 'url'){
      imageObject.src = options.location;
    }
    if(options.function){
      imageObject.addEventListener('click',options.function);
    }
    if(options.style){
      imageObject.style = options.style;
    }
    get.appendChild(imageObject);
    return imageId;

  },

  message : function(options){

    if(!options.id){
      options.id = engine.uniqid();
    }
    if(!options.parent){
      options.parent = 'page-router';
    }
    if(!options.type){
      options.type = 'info';
    }
    if(!options.messageContClass){
      options.messageContClass = 'message ';
    }

    let className = options.messageContClass + ' ';
    if(options.type == 'success'){
      className += 'message-success';
    } else if(options.type == 'info'){
      className += 'message-info';
    } else if(options.type == 'warning'){
      className += 'message-warning';
    } else if(options.type == 'danger'){
      className += 'message-danger';
    }

    if(!options.buttonContClass){
      options.buttonContClass = 'message-close-cont';
    }
    if(!options.closeButtonClass){
      options.closeButtonClass = 'message-close-button';
    }
    if(!options.textContClass){
      options.textContClass = 'message-text-cont';
    }
    if(!options.closeButtonText){
      options.closeButtonText = 'close';
    }
    if(!options.time){
      options.time = 5000;
    }


    //div
    let cont = engine.make.div({
      id:'-message-' + options.id,
      class:className,
      parent:options.parent
    });

      let closeCont = engine.make.div({
        id:'close',
        parent:cont,
        class:options.buttonContClass
      });

        engine.make.button({
          id:'close',
          parent:closeCont,
          value:options.closeButtonText,
          class:options.closeButtonClass,
          function:()=>{
            engine.view.remove(cont);
          }
        });

      engine.make.div({
        id:'text',
        parent:cont,
        class:options.textContClass,
        text:options.message
      });

      setTimeout(function () {
        engine.view.remove(cont);
      }, options.time);

  }

};

function div(options){

  //check options object
  let check = checkBaseOptions(options);
  if(check == false){
    return common.error('invalid_options : ' + options);
  }

  //check parent
  let get = document.getElementById(options.parent);
  if(get == null){
    return common.error('invalid_parent : ' + options);
  }

  //make element
  let objectId = options.parent + '-div-' + options.id;
  let div = document.createElement("div");
  div.id = objectId;
  if(options.class){
    div.className = options.class;
  }
  if(options.function){
    div.addEventListener('click',options.function);
  }
  if(options.text !== undefined && options.text !== null){
    div.innerHTML = options.text;
  }
  if(options.style){
    div.style = options.style;
  }

  get.appendChild(div);
  return objectId;

}
