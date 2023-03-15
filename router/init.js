

function build(parent,type,mod,data,cls){

  let router = engine.make.div({
    id:`router-${type}`,
    parent:parent,
    class:cls ? cls : `router-${type}`
  });

  let routers = engine.router.routers;
  let active = engine.router.active;

  let id = `${router}${mod.ref}`;
  if(type === "cont"){
    routers.conts[active.page] = router;
    active.routers[router] = id;
    engine.router.built[id] = router;
  } else if(type === "panel"){
    let cont_router = routers.conts[active.page];
    let active_cont = active.routers[cont_router];
    routers.panels[active_cont] = router;
    active.routers[router] = id;
    engine.router.built[id] = router;
  } else if(type === "comp"){
    active.routers[router] = id;
    engine.router.built[id] = router;
  }

  let url = engine.make.url;

  if(type === "page"){url.update("page",mod.name.replace("Page",""));} else
  if(type === "cont"){url.update("cont",mod.contName.replace("Cont",""));} else
  if(type === "panel"){url.update("panel",mod.panelName.replace("Panel",""));}

  if(mod){
    mod.init(router,data);
    engine.router.navigate.run_trackers(mod);
  }

  return router;

}

module.exports = {

  conts : function(parent,mod,data,cls){
    return build(parent,'cont',mod,data,cls);
  },

  panels : function(parent,mod,data,cls){
    return build(parent,'panel',mod,data,cls);
  },

  comps : function(parent,mod,data,cls){
    return build(parent,'comp',mod,data,cls);
  }

};
