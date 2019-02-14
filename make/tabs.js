"use strict";

const common = require('../common');
const checkBaseOptions = require('./check').check;
const view = require('../view');
const router = require('../router');
const log = false;
const viewers = require('./viewers');
let gets = require('../get');

const make = require('./tabs/make');
const reduce = require('./tabs/reduce');

//input object sample
/*
  {
    id:id,
    parent:'parent',
    tabsContClass:tabsCont,
    linksContClass:linksCont,
      tabClass:idleTab,
      activeTabClass:activeTab,
      navButtonClass:navButton,
    moduleContClass:viewerCont,
    tabs:[
      {value:value0,module,module0,active:true},
      {value:value1,module,module1}
    ]
  }
*/

function build(type,options,clickFunction,activeFunction){

  common.tell('+++ initiating tabs build',log);

  let check = checkBaseOptions(options);
  if(check == false){
    return common.error('invalid_options');
  }
  if(!options.tabs || !options.tabs.length || options.tabs.length == 0){
    return common.error('not_found-tabs');
  }
  if(!options.tabClass){
    options.tabClass = 'tab-idle';
  }
  if(!options.tabsContClass){
    options.tabsContClass = 'tab-cont-main';
  }
  if(!options.activeTabClass){
    options.activeTabClass = 'tab-active';
  }
  if(!options.navButtonClass){
    options.navButtonClass = 'tab-nav';
  }
  if(!options.linksContClass){
    options.linksContClass = 'tab-cont-links';
  }
  if(!options.moduleContClass){
    options.moduleContClass = 'tab-cont-module';
  }
  if(!options.navButtonClass){
    options.navButtonClass = 'tab-nav';
  }

  //check parent
  let get = document.getElementById(options.parent);
  if(get == null){
    return common.error('invalid_parent : ' + options);
  }

  let parentButtonCont,parentModuleCont = null;

  //make tabsCont
  let tabsCont = make.cont(
    options.parent,
    'tabs',
    options.tabsContClass
  );
  let linksCont = make.cont(
    tabsCont,
    'links',
    options.linksContClass
  );
  parentButtonCont = linksCont;

  //only make these conts for comp tabs routing
  if(type == 'comp'){
    let moduleCont = engine.router.init.comps(tabsCont);
    parentModuleCont = moduleCont;
  }

  let makeTabs = make.tabs(
    parentButtonCont,
    parentModuleCont,
    options.tabs,
    clickFunction,
    activeFunction,
    options.tabClass,
    options.activeTabClass
  );

  let doReduce = reduce(
    parentButtonCont,
    options.navButtonClass
  );

  return true;

}

module.exports = {

  comp : function(options){

    common.tell('+++ initiating make comp tabs',log);

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

    common.tell('+++ initiating make panel tabs',log);

    let routerId;

    function clickFunction(id,mod,data){
      engine.router.navigate.to.panel(mod,data);
    }

    function activeFunction(id,mod,data){
      let page = engine.router.active.page + '-router-cont';
      let cont = engine.router.track.cont[page];
      routerId = engine.router.init.panels(cont);
      mod.init(routerId);
    }

    return build('panel',options,clickFunction,activeFunction);

  },

  cont : function(options){

    common.tell('+++ making cont tabs',log);

    function clickFunction(id,mod,data){
      engine.router.navigate.to.cont(mod,data);
    }

    function activeFunction(id,mod,data){
      let routerId = engine.router.init.conts(engine.router.active.page);
      mod.init(routerId,data);
    }

    return build('cont',options,clickFunction,activeFunction);

  }

};
