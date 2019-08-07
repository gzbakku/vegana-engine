const common = require('../common');
const checkBaseOptions = require('./check').check;
const log = false;
const seprator = false;
const creator = require('./creator');

module.exports = {

  upload: function(options){
    if(options.function){
      let user_function = options.function;
      let local_function = (object)=>{
        user_function(object.id,object.files);
      };
      options.function = local_function;
    }
    options.type = 'file';
    return creator('input',options);
  },

  select : function(options){
    if(options.function){
      let user_function = options.function;
      let local_function = (object)=>{
        user_function(object.id,object.value);
      };
      options.function = local_function;
    }
    return creator('select',options);
  },

  input : function(options){

    if(options.function){
      let user_function = options.function;
      let fetch_this = 'value';
      if(options.type == 'file'){fetch_this = 'files';}
      let local_function = (object)=>{
        if(options.type == 'number'){
          user_function(object.id,Number(object[fetch_this]));
        } else {
          user_function(object.id,object[fetch_this]);
        }
      };
      options.function = local_function;
    }

    if(!options.type){options.type = 'string';}
    return creator('input',options);

  },

  checkBox : function(options){

    //check options object
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options',options);
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent',options);
    }

    //make label first
    let label = document.createElement("label");
    if(options.labelClass){
      label.className = options.labelClass;
    } else {
      label.className = 'form-checkbox-label';
    }

    //create object
    let object = document.createElement("input");
    object.id = options.parent + '-checkbox-' + options.id;
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

    if(options.function){
      object.addEventListener('click',()=>{
        options.function(object.id);
      });
    }

    get.appendChild(label);
    return object.id;

  },

  textarea : function(options){

    if(options.function){
      let user_function = options.function;
      let local_function = (object)=>{
        user_function(object.id,object.value);
      };
      options.function = local_function;
    }

    return creator('textarea',options);

  },

  button : function(options){

    if(options.function){
      let user_function = options.function;
      let local_function = (object,data)=>{
        user_function(object.id,data);
      };
      options.function = local_function;
    }

    options.type = 'button';
    return creator('input',options);

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
