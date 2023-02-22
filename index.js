
if(!window.is_static){window.is_static = false;}
if(!window.is_static_web){window.is_static_web = false;}
if(!window.is_cordova){window.is_cordova = false;}
if(!window.is_electron){window.is_electron = false;}
if(!window.is_native){window.is_native = false;}
if(!window.is_web){window.is_web = false;}

// console.log("window updated");
// console.log(window);

let hooks = {
  pages:{},
  conts:{},
  panels:{},
  comps:{}
};

module.exports = {
  common:require('./common'),
  static:require('./static'),
  ui:require('./ui'),
  meta:require('./meta'),
  add:require('./add'),
  binder:require('./binder'),
  make:require('./make/index'),
  view:require('./view'),
  router:require('./router'),
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
  layout:require('./layout/index'),
  animate:require('./animate'),
  config:require('./config'),
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
