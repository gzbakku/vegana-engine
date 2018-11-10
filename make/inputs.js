const common = require('../common');
const checkBaseOptions = require('./check').check;
const log = false;
const seprator = false;

module.exports = {

  select : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //tell
    common.tell('+++ select',log);

    //checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(
      options.options.length == 0 ||
      options.options.length == undefined ||
      options.options == null
    ){
      return common.error('no_options_found');
    }

    //get parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make select
    let selectId = options.parent + '-select-' + options.id;
    let selectObject = document.createElement("select");
    selectObject.id = selectId;
    if(options.class){
      selectObject.className = options.class;
    }

    //add options
    for(var i=0;i<options.options.length;i++){
      let data = options.options[i];
      if(data.text && data.value){
        let option = document.createElement("option");
        option.text = data.text;
        option.value = data.value;
        if(data.class){
          option.className = data.class;
        }
        selectObject.add(option);
      }
    }

    if(options.function){
      selectObject.oninput = options.function;
    }

    //append select
    get.appendChild(selectObject);
    return selectId;

  },

  input : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //tell
    common.tell('+++ input',log);

    //checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.type){
      return common.error('not_found-options=>type');
    }

    //get parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make button
    let inputId = options.parent + '-input-' + options.type + '-' + options.id;
    let inputObject = document.createElement("input");
    inputObject.id = inputId;
    if(options.class){
      inputObject.className = options.class;
    }
    inputObject.type = options.type;

    if(options.placeholder){
      inputObject.placeholder = options.placeholder;
    }
    if(options.value){
      inputObject.value = options.value;
    }
    if(options.function){
      //inputObject.oninput = options.function;
      inputObject.addEventListener('input',()=>{
        options.function(inputId);
      });
    }


    get.appendChild(inputObject);
    return inputId;

  },

  button : function(options){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //tell
    common.tell('+++ button',log);

    //checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.value){
      return common.error('not_found-options=>value');
    }

    //get parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make button
    let buttonId = options.parent + '-button-' + options.id;
    let buttonObject = document.createElement("button");
    buttonObject.type = 'button';
    buttonObject.id = buttonId;
    if(options.class){
      buttonObject.className = options.class;
    }
    if(options.disabled){
      if(options.disabled == true){
        buttonObject.disabled = true;
      }
    }
    buttonObject.innerHTML = options.value;
    get.appendChild(buttonObject);

    if(options.function){
      buttonObject.onclick = options.function;
    }

    return buttonId;

  },

  enableButton : function(buttonId){

    let get = document.getElementById(buttonId);
    if(get == null){
      return common.error('not-found/invalid-buttonId');
    } else {
      get.disabled = false;
      return true;
    }

  }

};
