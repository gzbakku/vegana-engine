const log = false;

// let token,user,user_type,uid,session_type;

function check(){

  let type = engine.data.get('session_type','local');
  if(!type){return false;}

  let get = engine.data.get;
  let s = engine.session;
  let where = type === "temp" ? "session" : "local";

  s.token = get('token',where);
  s.user = get('user',where);
  s.user_type = get('user_type',where);
  s.uid = get('uid',where);
  s.session_type = get('session_type','local');

  if(!s.token){return false;} else {return true;}

}

function end(){

  let type = engine.data.get('session_type','local');
  if(!type){return true;}

  let del = engine.data.delete;
  let s = engine.session;
  let where = type === "temp" ? "session" : "local";

  s.token = del('token',where);
  s.user = del('user',where);
  s.user_type = del('user_type',where);
  s.uid = del('uid',where);
  s.session_type = del('session_type','local');

  return true;

}

module.exports = {

  check : check,

  start : function(token_arg,user_arg,uid,remember,cookie_path,cookie_samesite){

    if(!token_arg){return new engine.common.Error("not_found-token");}

    let where = remember === true ? "local" : "session";
    let reset = engine.data.reset;
    let cookie = engine.cookie;
    let time;
    if(remember){
      let day = 1000 * 60 * 60 * 24;
      time = day * 365;
    }

    function set(k,v,w){
      reset(k,v,w);
      if(typeof(v) === "object"){v = JSON.stringify(v);}
      cookie.set(k,v,time,null,cookie_samesite);
    }

    set('token',token_arg,where);
    set('user',user_arg,where);
    set('uid',uid,where);
    set('session_type',remember === true ? "persistant" : "temp",'local');

    return check();

  },

  end : end,

  token : null,
  uid   : null,
  user  : null,
  user_type  : null,
  session_type:null,

  get : {

    user: function(){
      if(check() == false){return null;}
      let s = engine.session;
      if(s.user_type == "object"){
        return JSON.parse(s.user);
      } else {
        return s.user;
      }
    },

    token:function(){
      check();
      return engine.session.token;
    },

    uid:function(){
      check();
      return engine.session.uid;
    },

    session_type:function(){
      check();
      return engine.session.session_type;
    },

  }

};
