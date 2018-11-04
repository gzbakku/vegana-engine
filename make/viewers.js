const common = require('../common');
const checkBaseOptions = require('./check').check;
const log = false;
const seprator = false;
const builder = require('./builder');
const httpMarker = 'http://';

module.exports = {

  div : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);
    common.tell('+++ div',log);

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
    if(options.text){
      div.innerHTML = options.text;
    }
    if(options.style){
      div.style = options.style;
    }

    get.appendChild(div);
    return objectId;

  },

  card : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);
    common.tell('+++ card',log);

    //checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //build card
    let cardCheck = builder.make.card(options);
    if(cardCheck == false){
      return common.error('failed-build_card');
    }

    return cardCheck;

  },

  text : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);
    common.tell('+++ text',log);

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

    common.tell(',,,,,,,,,,,,,,,,,',seprator);
    common.tell('+++ image',log);

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

  dropdown : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);
    common.tell('+++ dropdown',log);

    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.headerText){
      return common.error('not_found-options=>headerText');
    }

    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make dropdown
    let ddObjectId = options.parent + '-dropdown-' + options.id;
    let ddObject = document.createElement('div');
    ddObject.id = ddObjectId;
    ddObject.style = 'display:none';
    if(options.class){
      ddObject.className = options.class;
    }
    get.appendChild(ddObject);

    //make dropdown header cont
    let ddHeaderId = ddObjectId + '-header-cont';
    let ddHeaderObject = document.createElement('div');
    ddHeaderObject.id = ddHeaderId;
    if(options.headerContClass){
      ddHeaderObject.className = options.headerContClass;
    }
    ddObject.appendChild(ddHeaderObject);

      //make dropdown header text cont
      let ddHeaderTextContId = ddHeaderId + '-text-cont';
      let ddHeaderTextContObject = document.createElement('div');
      ddHeaderTextContObject.id = ddHeaderTextContId;
      if(options.headerTextContClass){
        ddHeaderTextContObject.className = options.headerTextContClass;
      }
      ddHeaderTextContObject.innerHTML = options.headerText;
      ddHeaderObject.appendChild(ddHeaderTextContObject);

      //make dropdown header action cont
      let ddHeaderActionContId = ddHeaderId + '-action-cont';
      let ddHeaderActionContObject = document.createElement('div');
      ddHeaderActionContObject.id = ddHeaderTextContId;
      if(options.headerActionContClass){
        ddHeaderActionContObject.className = options.headerActionContClass;
      }
      ddHeaderObject.appendChild(ddHeaderActionContObject);

        //make close button
        let ddCloseButtonId = ddHeaderActionContId + '-button-close';
        let ddCloseButtonObject = document.createElement('button');
        ddCloseButtonObject.id = ddCloseButtonId;
        ddCloseButtonObject.innerHTML = 'close';
        if(options.closeButtonClass){
          ddCloseButtonObject.className = options.closeButtonClass;
        }
        ddCloseButtonObject.addEventListener('click',()=>{
          engine.view.hide(ddObjectId);
        });
        ddHeaderActionContObject.appendChild(ddCloseButtonObject);

    return ddObjectId;

  }

};
