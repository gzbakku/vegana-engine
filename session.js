const common = require('./common');
const log = false;

function check(){
  common.tell('checking-session',log);
  if(!sessionStorage.token){
    return false;
  } else {
    return true;
  }
}

let token = sessionStorage.getItem('token');
let user = sessionStorage.getItem('user');
let user_type = sessionStorage.getItem('user_type');
let uid = sessionStorage.getItem('uid');

module.exports = {

  check : check,

  start : function(token_arg,user_arg,uid){
    common.tell('starting-session',log);
    if(typeof(user) == 'object'){
      user_type = 'object';
      user_arg = JSON.stringify(user_arg);
    }
    if(!token_arg){
      return common.error("not_found-token");
    }
    sessionStorage.setItem('token',token_arg);
    sessionStorage.setItem('user',user_arg);
    token = token_arg;
    if(user_arg){
      user = user_arg;
    }
    return true;
  },

  end : function(){
    common.tell('ending-session',log);
    sessionStorage.clear();
    token = null;
    user = null;
    uid = null;
    return true;
  },

  token : token,
  uid   : uid,
  user  : user,
  user_type  : user_type,

  get : {

    user: function(){
      if(check() == false){
        return null;
      }
      if(user_type == "object"){
        return JSON.parse(user);
      } else {
        return user;
      }
    },

    token:function(){
      return token;
    },

    uid:function(){
      return uid;
    },

  }

};
