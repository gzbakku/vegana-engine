const common = require('./common');
var db = {};

module.exports = {

  get : function(tag,where){

    if(typeof(tag) !== 'string'){
      return common.error('invalid_tag');
    }
    if(!where){
      where = 'mem';
    }

    if(where == 'mem'){
      if(db.hasOwnProperty(tag) == false){
        return null;
      } else {
        return db[tag];
      }
    }
    if(where == 'session'){
      if(sessionStorage.hasOwnProperty(tag) == false){
        return null;
      } else {
        return sessionStorage[tag];
      }
    }
    if(where == 'local'){
      if(localStorage.hasOwnProperty(tag) == false){
        return null;
      } else {
        return localStorage[tag];
      }
    }

  },

  set : function(tag,value,where){

    if(typeof(tag) !== 'string'){
      return common.error('invalid_tag');
    }
    if(!where){
      where = 'mem';
    }
    if(typeof(value) == 'object'){
      value = JSON.stringify(value);
    }
    if(typeof(value) !== 'string'){
      value = value.toString();
    }

    if(where == 'mem'){
      if(!db[tag]){
        db[tag] = value;
        return true;
      } else {
        return false;
      }
    }
    if(where == 'session'){
      if(!sessionStorage[tag]){
        sessionStorage.setItem(tag,value);
        return true;
      } else {
        return false;
      }
    }
    if(where == 'local'){
      if(!localStorage[tag]){
        localStorage.setItem(tag,value);
        return true;
      } else {
        return false;
      }
    }

  },

  reset : function(tag,value,where){

    if(typeof(tag) !== 'string'){
      return common.error('invalid_tag');
    }
    if(!where){
      where = 'mem';
    }
    if(typeof(value) == 'object'){
      value = JSON.stringify(value);
    }
    if(typeof(value) !== 'string'){
      value = value.toString();
    }

    if(where == 'mem'){
      db[tag] = value;
      return true;
    }
    if(where == 'session'){
      sessionStorage.setItem(tag,value);
      return true;
    }
    if(where == 'local'){
      localStorage.setItem(tag,value);
      return true;
    }

  }

}
