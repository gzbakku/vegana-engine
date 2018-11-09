const common = require('../common');
const checkBaseOptions = require('./check').check;
const log = false;
const seprator = false;
const builder = require('./builder');
const httpMarker = 'http://';

module.exports = {

  addClass : function(options){

    if(typeof(options) !== 'object'){
      return common.error('invalid-options');
    }
    if(!options.id){
      return common.error('not_found-id||options');
    }
    if(!options.class){
      return common.error('not_found-class||options');
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

    if(typeof(options) !== 'object'){
      return common.error('invalid-options');
    }
    if(!options.id){
      return common.error('not_found-id||options');
    }
    if(!options.class){
      return common.error('not_found-class||options');
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

  },

  message : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);
    common.tell('+++ message',log);

    //check options array
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.message){
      return common.error('not_found-message||options');
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //check if the message already exists
    let messageObjectId = options.parent + '-message-' + options.id;
    let checkMessage = document.getElementById(messageObjectId);
    if(checkMessage !== null){
      engine.view.show(messageObjectId);
      return true;
    }

    //make element
    let messageObject = document.createElement("div");
    messageObject.id = messageObjectId;
    messageObject.innerHTML = options.message;

    let activeTypes = [
      'info','warning','danger','success'
    ];

    if(
      !options.type ||
      options.type == null ||
      options.type == false ||
      options.type == undefined ||
      activeTypes.indexOf(options.type) < 0
    ){
      messageObject.className = 'message message-info';
    } else if (options.type == 'info'){
      messageObject.className = 'message message-info';
    } else if (options.type == 'warning'){
      messageObject.className = 'message message-warning';
    } else if (options.type == 'danger'){
      messageObject.className = 'message message-danger';
    } else if (options.type == 'success'){
      messageObject.className = 'message message-success';
    }

    if(options.text){
      messageObject.innerHTML = options.text;
    }
    if(options.style){
      messageObject.style = options.style;
    }
    //append message object
    get.appendChild(messageObject);

    //make message close button
    let closeButtonObjectId = messageObjectId + '-button-close';
    let closeButtonObject = document.createElement('button');
    closeButtonObject.id = closeButtonObjectId;
    //close button css
    if(options.closeButtonClass){
      closeButtonObject.className = options.closeButtonClass;
    } else {
      closeButtonObject.className = 'message-close-button';
    }
    //close button value
    if(options.closeButtonValue){
      closeButtonObject.innerHTML = options.closeButtonValue;
    } else {
      closeButtonObject.innerHTML = 'close';
    }
    //close button function
    function hide(){
      engine.view.hide(messageObjectId);
    }
    closeButtonObject.addEventListener('click',hide);
    //closeButtonObject.onclick = hide;
    //append close button to mesasage div object
    messageObject.appendChild(closeButtonObject);

    let timeOut = 5000;
    if(options.time){
      timeout = options.time * 1000;
    }

    setTimeout(function () {
      engine.view.hide(messageObjectId);
    }, timeOut);

    return messageObjectId;

  }

};
