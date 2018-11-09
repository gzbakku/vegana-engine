const common = require('./common');
var db = {};

module.exports = {

  get : function(tag,where){

    if(typeof(tag) !== 'string'){
      return common.error('invalid_tag');
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

    //if where is not defined
    if(db.hasOwnProperty(tag) == true){
      return db[tag];
    } else {
      return null;
    }

  },

  set : function(tag,value,where){

    if(typeof(tag) !== 'string'){
      return common.error('invalid_tag');
    }
    if(typeof(value) !== 'string'){
      return common.error('invalid_value');
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

    //if where is not defined check mem db
    if(!db[tag]){
      db[tag] = value;
      return true;
    } else {
      return false;
    }

  }

}
