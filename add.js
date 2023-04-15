

module.exports = {

  object : function(key,object){
    engine['global']['object'][key] = object;
  },

  function : function(key,func){
    engine['global']['function'][key] = func;
  },

  comp : function(key,mod){
    engine['global']['comp'][key] = mod;
  },

  var : function(key,mod){
    engine['global']['var'][key] = mod;
  }

};
