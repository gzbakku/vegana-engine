const common = require('./common');
const log = false;

module.exports = {

  init : function(key,func){
    common.tell('adding a function to the global engine set',log);
    if(typeof(key) !== 'string'){
      return common.error('not_found-key');
    }
    if(typeof(func) !== 'function'){
      return common.error('not_found-func');
    }
    if(!window[key]){
      window.engine[key] = func;
    }
    return true;
  }

};
