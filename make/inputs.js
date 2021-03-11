module.exports = {

  select : function(options){
    return engine.make.creator('select',options);
  },

  input : function(options){
    if(!options.type){options.type = 'string';}
    return engine.make.creator('input',options);
  },

  textarea : function(options){
    return engine.make.creator('textarea',options);
  },

  button : function(options){
    options.type = 'button';
    return engine.make.creator('input',options);
  }

};
