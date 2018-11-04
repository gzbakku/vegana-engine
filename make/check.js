const common = require('../common');

module.exports = {

  check: function(object){

    if(typeof(object) !== 'object'){
      return common.error('invalid_object');
    }

    //check id property
    if(object.hasOwnProperty('id') !== true){
      return common.error('not_found-id');
    }
      if(typeof(object.id) !== 'string'){
        return common.error('not_found-id');
      }
    //check parent property
    if(object.hasOwnProperty('parent') !== true){
      return common.error('not_found-id');
    }
      if(typeof(object.parent) !== 'string'){
        return common.error('not_found-parent');
      }

    return true;

  }

};
