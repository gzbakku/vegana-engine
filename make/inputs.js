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
    } else {
      selectObject.className = 'form-select';
    }

    //add options
    for(var i=0;i<options.options.length;i++){
      let data = options.options[i];
      if(data.text && data.value !== 'undefined'){
        let option = document.createElement("option");
        option.text = data.text;
        option.value = data.value;
        if(data.class){
          option.className = data.class;
        } else {
          option.className = 'form-select-item';
        }
        if(options.value !== undefined){
          if(options.value == data.value){
            option.selected = true;
          }
        }
        selectObject.add(option);
      }
    }

    if(options.function){
      //selectObject.oninput = options.function;
      selectObject.addEventListener('click',()=>{
        options.function(selectObject.id);
      });
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
    } else {
      inputObject.className = 'form-input';
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

  checkBox : function(options){

    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }

    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make label first
    let label = document.createElement("label");
    if(options.labelClass){
      label.className = options.labelClass;
    } else {
      label.className = 'form-checkbox-label';
    }
    if(options.function){
      label.addEventListener('click',()=>{
        options.function(object.id);
      });
    }

    //create object
    let object = document.createElement("input");
    object.id = options.parent + '-input-checkBox-' + options.id;
    object.type = 'checkbox';
    if(options.class){
      object.className = options.class;
    } else {
      object.className = 'form-checkbox';
    }
    if(options.checked){
      if(options.checked == true){
        object.checked = true;
      }
    }
    label.appendChild(object);
    label.appendChild(document.createElement('span'));

    get.appendChild(label);
    return object.id;

  },

  textarea : function(options){

    //checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }

    //get parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent : ' + options);
    }

    //make oject
    let object = document.createElement('textarea');

    object.id = options.parent + '-textarea-' + options.id;

    //set object properties
    if(options.class){
      object.className = options.class;
    }
    if(options.placeholder){
      object.placeholder = options.placeholder;
    }
    if(options.rows){
      object.rows = options.rows;
    }
    if(options.value){
      object.value = options.value;
    }

    //apend object and return
    get.appendChild(object);
    return object.id;

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
    } else {
      buttonObject.className = 'form-button';
    }
    if(options.disabled){
      if(options.disabled == true){
        buttonObject.disabled = true;
      }
    }
    buttonObject.innerHTML = options.value;
    get.appendChild(buttonObject);

    if(options.function){
      buttonObject.addEventListener('click',()=>{
        if(options.functionData){
          options.function(buttonObject.id,options.functionData);
        } else {
          options.function(buttonObject.id);
        }
      });
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
