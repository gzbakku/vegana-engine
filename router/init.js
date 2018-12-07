const common = require('../common');
const log = false;

function build(parent,type,mod,data){

  common.tell('building router',log);

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

  let routerApp = require('../router');

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

  conts : function(parent){
    if(parent == null){
      return common.error('no_parent_found : ' + parent);
    }
    return build(parent,'cont');
  },

  panels : function(parent){
    if(parent == null){
      return common.error('no_parent_found : ' + parent);
    }
    return build(parent,'panel');
  },

  comps : function(parent,mod,data){
    if(parent == null){
      return common.error('no_parent_found : ' + parent);
    }
    return build(parent,'comp',mod,data);
  }

};
