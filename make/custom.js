const common = require('../common');
const checkBaseOptions = require('./check').check;

module.exports = {

  element : function(options){

    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }

    //get parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    //make select
    let element = document.createElement(options.tag);
    element.id = options.parent + '-' + options.tag + '-' + options.id;
    if(options.class){
      element.className = options.class;
    }

    //let keys = Object.keys(options.options);


    if(typeof(options.options) == 'object' && options.options.length > 0){
      for(var i=0;i<options.options.length;i++){
        let option = options.options[i];
        if(typeof(option) == 'object'){
          if(option.tag && option.data){
            //element[option.tag] = option.data;
            element.setAttribute(option.tag, option.data);
          }
        }
      }
    }

    console.log(element);

    //append select
    get.appendChild(element);
    return element.id;

  }

};
