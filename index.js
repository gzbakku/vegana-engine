let hooks = {
  pages:{},
  conts:{},
  panels:{},
  comps:{}
};

module.exports = {
  static:require('./static'),
  ui:require('./ui'),
  sketch:require('./sketch'),
  meta:require('./meta'),
  add:require('./add'),
  binder:require('./binder'),
  make:require('./make'),
  view:require('./view'),
  router:require('./router'),
  common:require('./common'),
  loader:require('./loader'),
  session:require('./session'),
  request:require('./request').send,
  validate:require('./validate'),
  get:require('./get'),
  wet:require('./wet'),
  set:require('./set'),
  data:require('./data'),
  time:require('./time'),
  params:require('./params'),
  global:{
    function:{},
    comp:new Proxy({},{
      set(obj, prop, value){
        obj[prop] = value;
        if(hooks.comps.hasOwnProperty(prop) == true){
          hooks.comps[prop]();
        }
      }
    }),
    object:{}
  },
  hooks:hooks,
  md5:require('md5'),
  uniqid:require('uniqid'),
  app_version:null
};
