
if(!window.is_static){window.is_static = false;}
if(!window.is_static_web){window.is_static_web = false;}
if(!window.is_cordova){window.is_cordova = false;}
if(!window.is_electron){window.is_electron = false;}
if(!window.is_native){window.is_native = false;}
if(!window.is_web){window.is_web = false;}

window.pageModules = new Proxy({},{
  set(obj,key,val){
    obj[key] = val;
    let c = engine.loader.hooked.pages;
    if(c[key]){
      for(let item of c[key]){
        item.function(item.functionData);
      }
      delete c[key];
    }
  }
});

module.exports = {
  sot:require("./sot"),
  cookie:require("./cookie"),
  common:require('./common'),
  static:require('./static'),
  ui:require('./ui'),
  meta:require('./meta'),
  add:require('./add'),
  binder:require('./binder'),
  make:require('./make/index'),
  view:require('./view'),
  router:require('./router/index'),
  loader:require('./loader'),
  session:require('./session'),
  request:require('./request').send,
  validate:require('./validate'),
  get:require('./get'),
  wet:require('./wet'),
  set:require('./set'),
  data:require('./data'),
  time:require('./time'),
  // params:require('./params'),
  layout:require('./layout/index'),
  animate:require('./animate'),
  config:require('./config'),
  stylesheet:require('./stylesheet'),
  themes:require('./themes'),
  global:{
    function:{},
    comp:new Proxy({},{
      set(obj, key, value){
        obj[key] = value;
        let c = engine.loader.hooked.comps;
        if(c[key]){
          for(let item of c[key]){
            item.function(item.functionData);
          }
          delete c[key];
        }
      }
    }),
    object:{}
  },
  hooks:{
    pages:{},
    conts:{},
    panels:{},
    comps:{}
  },
  md5:require('md5'),
  uniqid:require('uniqid'),
  app_version:null,
  sleep:(time)=>{
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve();
      },time || 1000);
    });
  },
  scroll_pos:()=>{
    let pos = document.documentElement.scrollHeight;
    return {to:()=>{window.scrollTo(0, pos);}};
  },
  scrollTo:(id)=>{
    if(typeof(id) === "number"){
      window.scrollTo(0, id);
      return true;
    }
    let elem = engine.get.element(id);
    if(!elem){return false;}
    elem.scrollIntoView();
    return true;
  },
  div:(parent)=>{
    return engine.make.div({parent:parent});
  },
  d:(parent)=>{
    return engine.make.div({parent:parent});
  },
  is_obj:(o)=>{
    return (o instanceof Object) && !(o instanceof Array) ? true : false;
  },
  is_array:(o)=>{
    return o instanceof Array ? true : false;
  },
  is_string:(o)=>{
    return typeof(o) === 'string' ? true : false;
  },
  is_num:(o)=>{
    return typeof(o) === 'number' || !isNaN(o) ? true : false;
  },
  len:(o)=>{
    if(o instanceof Array || typeof(o) === 'string'){return o.length;}
    if(o instanceof Object){return Object.keys(o).length;}
    if(typeof(o) === 'number'){return o;}
    return 0;
  }
};
