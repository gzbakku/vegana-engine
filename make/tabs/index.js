"use strict";
const make = require('./make');

//input object sample
// {
//   tabs:[
//     {value:value0,module,module0,active:true},
//     {value:value1,module,module1}
//   ]
// }

function build(type,options,clickFunction,activeFunction){

  if(!options || !options.tabs.length || !options.parent || !document.getElementById(options.parent)){
    return engine.common.error('invalid_parent : ' + options);
  }

  options.tabClass = options.tabClass || 'tab-idle';
  options.tabsContClass = options.tabsContClass || 'tab-cont-main';
  options.activeTabClass = options.activeTabClass || 'tab-active';
  options.navButtonClass = options.navButtonClass || 'tab-nav';
  options.linksContClass = options.linksContClass || 'tab-cont-links';
  options.moduleContClass = options.moduleContClass || 'tab-cont-module';
  options.navButtonClass = options.navButtonClass || 'tab-nav';

  const parentButtonCont = engine.make.div({
    id:'links',
    parent:options.parent,
    class:options.linksContClass
  });

  let parentModuleCont;
  if(type == 'comp'){
    const moduleCont = engine.make.div({
      id:'modules',
      parent:options.parent,
      class:options.tabsContClass
    });
    parentModuleCont = engine.router.init.comps(moduleCont,null,null,options.moduleContClass);
  } else {
    parentModuleCont = engine.make.div({
      id:'tabs',
      parent:options.parent,
      class:options.tabsContClass
    });
  }

  make.tabs(
    parentButtonCont,
    parentModuleCont,
    options.tabs,
    clickFunction,
    activeFunction,
    options.tabClass,
    options.activeTabClass,
    options.navButtonClass
  );

  return parentModuleCont;

}

module.exports = {

  comp : function(options){

    function clickFunction(id,mod,data,router){
      engine.router.navigate.to.comp(mod,data,router);
    }

    function activeFunction(id,mod,data,router){
      mod.init(router,data);
      engine.router.track.comp[router] = router + mod.ref;
      engine.router.built.comp.push(router + mod.ref);
    }

    return build('comp',options,clickFunction,activeFunction);

  },

  panel : function(options){

    let routerId;

    function clickFunction(id,mod,data){
      engine.router.navigate.to.panel(mod,data);
    }

    function activeFunction(id,mod,data){
      const page = engine.router.active.page + '-router-cont';
      const cont = engine.router.track.cont[page];
      routerId = engine.router.init.panels(cont);
      mod.init(routerId,data);
    }

    return build('panel',options,clickFunction,activeFunction);

  },

  cont : function(options){

    function clickFunction(id,mod,data){
      engine.router.navigate.to.cont(mod,data);
    }

    function activeFunction(id,mod,data){
      const routerId = engine.router.init.conts(engine.router.active.page);
      mod.init(routerId,data);
    }

    return build('cont',options,clickFunction,activeFunction);

  }

};
