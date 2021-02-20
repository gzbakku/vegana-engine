

module.exports = {

  object : function(key,object){
    if(!key || !object){return engine.common.error("not_found-key/object");}
    engine['global']['object'][key] = object;
    return true;
  },

  function : function(key,func){
    if(!key || !func){return engine.common.error("not_found-key/function");}
    engine['global']['function'][key] = func;
    return true;
  },

  comp : function(key,mod){
    if(!key || !mod){return engine.common.error("not_found-key/mod");}
    engine['global']['comp'][key] = mod;
    return true;
  }

};
