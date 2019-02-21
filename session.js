const common = require('./common');
const log = false;

let token,user,user_type,uid,session_type;

function check(){

  let type = localStorage.getItem('session_type');
  if(!type){
    return false;
  }

  if(type == 'temp'){
    token = sessionStorage.getItem('token');
    user = sessionStorage.getItem('user');
    user_type = sessionStorage.getItem('user_type');
    uid = sessionStorage.getItem('uid');
    session_type = localStorage.getItem('session_type');
  } else {
    token = localStorage.getItem('token');
    user = localStorage.getItem('user');
    user_type = localStorage.getItem('user_type');
    uid = localStorage.getItem('uid');
    session_type = localStorage.getItem('session_type');
  }

  if(!token){
    return false;
  }

  return true;

}

function end(){

  let type = localStorage.getItem('session_type');
  if(!type){
    return false;
  }

  if(type == 'temp'){
    token = sessionStorage.removeItem('token');
    user = sessionStorage.removeItem('user');
    user_type = sessionStorage.removeItem('user_type');
    uid = sessionStorage.removeItem('uid');
    session_type = localStorage.removeItem('session_type');
  } else {
    token = localStorage.removeItem('token');
    user = localStorage.removeItem('user');
    user_type = localStorage.removeItem('user_type');
    uid = localStorage.removeItem('uid');
    session_type = localStorage.removeItem('session_type');
  }

  return true;

}

module.exports = {

  check : check,

  start : function(token_arg,user_arg,uid,remember){

    common.tell('starting-session',log);

    if(!token_arg){
      return common.error("not_found-token");
    }

    if(user_arg && typeof(user_arg) == 'object'){
      user_type = 'object';
      user_arg = JSON.stringify(user_arg);
    }

    if(remember == true){
      localStorage.setItem('token',token_arg);
      localStorage.setItem('user',user_arg);
      localStorage.setItem('uid',uid);
      localStorage.setItem('session_type','persistant');
    } else {
      sessionStorage.setItem('token',token_arg);
      sessionStorage.setItem('user',user_arg);
      sessionStorage.setItem('uid',uid);
      localStorage.setItem('session_type','temp');
    }

    return check();

  },

  end : end,

  token : token,
  uid   : uid,
  user  : user,
  user_type  : user_type,
  session_type:session_type,

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
      check();
      return token;
    },

    uid:function(){
      check();
      return uid;
    },

    session_type:function(){
      check();
      return session_type;
    },

  }

};
