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
    options.tabClass = null;
  }
  if(!options.activeTabClass){
    options.activeTabClass = null;
  }
  if(!options.navButtonClass){
    options.navButtonClass = null;
  }

  //check parent
  let get = document.getElementById(options.parent);
  if(get == null){
    return common.error('invalid_parent : ' + options);
  }

  //make tabsCont
  let tabsCont = make.cont(
    options.parent,
    'tabs',
    options.tabsContClass
  );

  let parentButtonCont = tabsCont;
  let parentModuleCont = null;

  //only make these conts for comp tabs routing
  if(type == 'comp'){
    //make linksCont
    let linksCont = make.cont(
      tabsCont,
      'links',
      options.linksContClass
    );
    parentButtonCont = linksCont;
    //make moduleCont
    let moduleCont = make.cont(
      tabsCont,
      'module',
      options.moduleContClass
    );
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

    function clickFunction(id,mod){
      return true;
    }

    function activeFunction(id,mod){
      mod.init(moduleCont);
    }

    return build('comp',options,clickFunction,activeFunction);

  },

  panel : function(options){

    common.tell('+++ initiating make panel tabs',log);

    function clickFunction(id,mod){
      engine.router.navigate.to.panel(mod);
    }

    function activeFunction(id,mod){
      mod.init(router.track.cont[router.active.page]);
    }

    return build('panel',options,clickFunction,activeFunction);

  },

  cont : function(options){

    common.tell('+++ making cont tabs',log);

    function clickFunction(id,mod){

      //remove active class from active tab
      let activeTab = router.track.tabs[parent]['tab'];
      if(options.activeTabClass){
        let remove = viewers.removeClass({id:activeTab,parent:'any',class:options.activeTabClass});
        viewers.addClass({id:id,parent:'any',class:options.activeTabClass});
      }

      router.track.tabs[parent] = {module:parent + mod.ref,tab:id};
      engine.router.navigate.to.cont(mod);

    }

    function activeFunction(id,mod){
      mod.init(router.active.page);
      router.track.tabs[parent] = {module:parent + mod.ref,tab:id};
      router.built.tab.push(parent + mod.ref);
    }

    return build('cont',options,clickFunction,activeFunction);

  }

};
