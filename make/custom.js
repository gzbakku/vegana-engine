const creator = require('./creator');

module.exports = {

  element : function(options){
    if(!options.tag){
      return engine.common.error('not_found-tag-custom-make-engine');
    }
    return creator(options.tag,options);
  }

};
