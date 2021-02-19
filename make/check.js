module.exports = {

  check: function(object){

    if(typeof(object) !== 'object'){
      return engine.common.error('invalid_object');
    }

    //check parent property
    if(!object.hasOwnProperty('parent') == true){
      return engine.common.error('not_found-parent');
    }
      if(typeof(object.parent) !== 'string'){
        return engine.common.error('not_found-parent');
      }

    return true;

  }

};
