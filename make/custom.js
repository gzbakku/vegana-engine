const common = require('../common');
const checkBaseOptions = require('./check').check;

module.exports = {

  element : function(id,parent,cls,type,ats){

    common.tell(',,,,,,,,,,,,,,,,,',seprator);

    //tell
    common.tell('+++ custom_element',log);

    //security checks
    if(id == null){
      return common.error('no_id_found : ' + id);
    }
    if(parent == null){
      return common.error('no_parent_found : ' + id + ' || parent : ' + parent);
    }
    if(cls == null){
      return common.error('no_class_found : ' + id);
    }
    if(options.length == 0 || options.length == undefined || options == null){
      return common.error('no_options_found');
    }

    //get parent
    let get = document.getElementById(parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    //make select
    let div = document.createElement(type);
    div.id = id;
    div.className = cls;

    let keys = Object.keys(ats);

    if(keys == null || keys.length == undefined || keys.length == 0){
      return common.error('no_valid_attributes_found');
    }

    //add ats
    for(var i=0;i<keys.length;i++){
      div[keys[i]] = ats[keys];
    }

    //append select
    get.appendChild(div);
    return id;

  }

};
