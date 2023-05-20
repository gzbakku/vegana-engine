
function check(){
  let cookies = engine.cookie.get_all();
  function get(key){return cookies[key];}
  let s = engine.session;
  s.token = get('token');
  s.user = get('user');
  s.user_type = get('user_type');
  if(get('user_type') === "object"){s.user = JSON.parse(s.user);}
  s.uid = get('uid');
  s.session_type = get('session_type','local');
  if(!s.token){return false;} else {return true;}
}

function end(){
  let s = engine.session;
  let del = engine.cookie.delete;
  for(let name of ["token","user","user_type",'uid',"session_type"]){
    del('token');
    s[name] = null;
  }
  return true;
}

module.exports = {

  check : check,

  start : function(token_arg,user_arg,uid,remember,cookie_path,cookie_samesite){

    if(!token_arg){return new engine.common.Error("not_found-token");}

    let where = remember === true ? "local" : "session";
    let cookie = engine.cookie;
    let time;
    if(remember){
      let day = 1000 * 60 * 60 * 24;
      time = day * 365;
    }

    let session_types = {};
    function set(k,v,d){
      if(!d){session_types[k] = typeof(v);}
      if(typeof(v) === "object"){v = JSON.stringify(v);}
      cookie.set(k,v,time,null,cookie_samesite);
    }

    set('token',token_arg);
    set('user',user_arg);
    set("user_type",typeof(user_arg));
    set('uid',uid);
    set('session_type',remember === true ? "persistant" : "temp");
    set('session_data_types',session_types,true);

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
      return engine.session.user;
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
