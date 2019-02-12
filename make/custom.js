const common = require('../common');
const checkBaseOptions = require('./check').check;

module.exports = {

  element : function(id,parent,cls,type,ats){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //tell
    common.tell('+++ custom_element',log);

    if(typeof(options) !== 'object'){
      return common.error('invalid-options');
    }
    if(!options.id){
      return common.error('not_found-id');
    }
    if(!options.parent){
      return common.error('not_found-parent');
    }
    if(!options.tag){
      return common.error('not_found-element_tag');
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

    let keys = Object.keys(ats);

    if(typeof(options.options) == 'object' && options.options.length > 0){
      for(var i=0;i<options.options;i++){
        let option = options.options[i];
        if(typeof(option) == 'object'){
          if(option.tag && option.data){
            element[option.tag] = option.data;
          }
        }
      }
    }

    //append select
    get.appendChild(element);
    return element.id;

  }

};
