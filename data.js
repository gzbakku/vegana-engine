const common = require('./common');
var db = {};

module.exports = {

  get : function(tag){

    if(typeof(tag) !== 'string'){
      return common.error('invalid_tag');
    }
    if(db.hasOwnProperty(tag) == false){
      return null;
    } else {
      return db[tag];
    }

  },

  set : function(tag,value){

    if(typeof(tag) !== 'string'){
      return common.error('invalid_tag');
    }
    if(typeof(value) !== 'string'){
      return common.error('invalid_value');
    }

    db[tag] = value;

  }

}
