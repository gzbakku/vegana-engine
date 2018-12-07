const common = require('./common');
const log = false;

module.exports = {

  check : function(){
    common.tell('checking-session',log);
    if(!sessionStorage.token){
      return false;
    } else {
      return true;
    }
  },

  start : function(token,user){
    common.tell('starting-session',log);
    if(typeof(user) == 'object'){
      user = JSON.stringify(user);
    }
    sessionStorage.setItem('token',token);
    sessionStorage.setItem('user',user);
    this.token = token;
    this.user = user;
    return true;
  },

  end : function(){
    common.tell('ending-session',log);
    sessionStorage.clear();
    this.token = null;
    this.uid = null;
    return true;
  },

  token : sessionStorage.getItem('token'),
  user : sessionStorage.getItem('user')

};
