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

  start : function(data){
    common.tell('starting-session',log);
    if(typeof(data) !== 'object'){
      return common.error('invalid_data');
    }
    if(!data.token || !data.uid){
      return common.error('not_found=>data||token/uid');
    }
    sessionStorage.setItem('token',data.token);
    sessionStorage.setItem('uid',data.uid);
    this.token = data.token;
    this.uid = data.uid;
    return true;
  },

  end : function(){
    common.tell('ending-session',log);
    sessionStorage.clear();
    this.token = null;
    this.uid = null;
    return true;
  },

  token : null,
  uid : null

};
