const log = false;

let token,user,user_type,uid,session_type;

function check(){

  let type = engine.data.get('session_type','local');
  if(!type){
    return false;
  }

  if(type == 'temp'){
    token = engine.data.get('token','session');
    user = engine.data.get('user','session');
    user_type = engine.data.get('user_type','session');
    uid = engine.data.get('uid','session');
    session_type = engine.data.get('session_type','local');
  } else {
    token = engine.data.get('token','local');
    user = engine.data.get('user','local');
    user_type = engine.data.get('user_type','local');
    uid = engine.data.get('uid','local');
    session_type = engine.data.get('session_type','local');
  }

  if(!token){
    return false;
  }

  return true;

}

function end(){

  let type = engine.data.get('session_type','local');
  if(!type){
    return false;
  }

  if(type == 'temp'){
    token = engine.data.delete('token','session');
    user = engine.data.delete('user','session');
    user_type = engine.data.delete('user_type','session');
    uid = engine.data.delete('uid','session');
    session_type = engine.data.delete('session_type','local');
  } else {
    token = engine.data.delete('token','local');
    user = engine.data.delete('user','local');
    user_type = engine.data.delete('user_type','local');
    uid = engine.data.delete('uid','local');
    session_type = engine.data.delete('session_type','local');
  }

  return true;

}

module.exports = {

  check : check,

  start : function(token_arg,user_arg,uid,remember){

    engine.common.tell('starting-session',log);

    if(!token_arg){
      return engine.common.error("not_found-token");
    }

    if(remember === true){
      engine.data.reset('token',token_arg,'local');
      engine.data.reset('user',user_arg,'local');
      engine.data.reset('uid',uid,'local');
      engine.data.reset('session_type','persistant','local');
    } else {
      engine.data.reset('token',token_arg,'session');
      engine.data.reset('user',user_arg,'session');
      engine.data.reset('uid',uid,'session');
      engine.data.reset('session_type','temp','local');
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
