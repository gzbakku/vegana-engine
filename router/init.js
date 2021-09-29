

function build(parent,type,mod,data,cls){

  //check parent
  let get = document.getElementById(parent);
  if(get == null){
    return common.error('invalid_parent : ' + parent);
  }

  //make router
  let router = document.createElement("div");

  if(type == 'comp'){
    router.id = parent + '-router-' + engine.uniqid() + '-' + type;
  } else {
    router.id = parent + '-router-' + type;
  }

  if(type === "cont"){
    engine.router.routers.conts[engine.router.active.page] = router.id;
  } else if(type === "panel"){
    if(!engine.router.routers.panels[engine.router.active.page]){
      engine.router.routers.panels[engine.router.active.page] = {};
    }
    engine.router.routers.panels[engine.router.active.page][engine.router.active.cont] = router.id;
  }

  if(cls){
    router.className = cls;
  } else {
    router.className = 'router-' + type;
  }

  // let routerApp = require('../router');
  let routerApp = engine.router;

  //append router
  get.appendChild(router);
  if(mod && type == 'comp'){
    routerApp.track.comp[router.id] = router.id + mod.ref;
    routerApp.built.comp.push(router.id + mod.ref);
    mod.init(router.id,data);
  }
  return router.id;

}

module.exports = {

  conts : function(parent,cls){
    if(parent == null){
      return common.error('no_parent_found : ' + parent);
    }
    return build(parent,'cont',null,null,cls);
  },

  panels : function(parent,cls){
    if(parent == null){
      return common.error('no_parent_found : ' + parent);
    }
    return build(parent,'panel',null,null,cls);
  },

  comps : function(parent,mod,data,cls){
    if(parent == null){
      return common.error('no_parent_found : ' + parent);
    }
    return build(parent,'comp',mod,data,cls);
  }

};
