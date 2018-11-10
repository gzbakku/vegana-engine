const common = require('../common');
const checkBaseOptions = require('./check').check;
const view = require('../view');
const router = require('../router');
const log = false;
const viewers = require('./viewers');
let gets = require('../get');

const make = require('./tabs/make');
const reduce = require('./tabs/reduce');

module.exports = {

  comp : function(options){

    common.tell('+++ making comp tabs',log);

    /*
      {
        ..
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

    //make linksCont
    let linksCont = make.cont(
      tabsCont,
      'links',
      options.linksContClass
    );

    //make moduleCont
    let moduleCont = make.cont(
      tabsCont,
      'module',
      options.moduleContClass
    );


    function clickFunction(id,mod){

      //check for active tab
      if(router.track.tabs[tabsCont]['tab'] == id){
        return true;
      }

      let tabRef = moduleCont + mod.ref;

      //remove active class from active tab
      let activeTab = router.track.tabs[tabsCont]['tab'];
      if(options.activeTabClass){
        viewers.removeClass({id:activeTab,parent:'any',class:options.activeTabClass});
        viewers.addClass({id:id,parent:'any',class:options.activeTabClass});
      }

      //hide the active tab
      view.hide(router.track.tabs[tabsCont].module);

      //check if tab was buolt previously
      if(router.built.tab.indexOf(tabRef) >= 0){
        router.track.tabs[tabsCont] = {module:tabRef,tab:id};
        view.show(tabRef);
        return true;
      } else {
        mod.init(moduleCont);
      }

      //set comp router tags
      router.track.tabs[tabsCont] = {module:tabRef,tab:id};
      router.built.tab.push(tabRef);

    }

    function activeFunction(id,mod){
      router.track.tabs[tabsCont] = {module:moduleCont + mod.ref,tab:id};
      router.built.tab.push(moduleCont + mod.ref);
      mod.init(moduleCont);
    }

    let makeTabs = make.tabs(
      linksCont,
      options.tabs,
      clickFunction,
      activeFunction,
      options.tabClass,
      options.activeTabClass
    );

    let doReduce = reduce(
      linksCont,
      options.navButtonClass
    );

    console.log(doReduce);

    return true;


  },

  panel : function(options){

    common.tell('+++ making panel tabs',log);

    //sec checks
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
      options.linksContClass
    );

    function clickFunction(id,mod){
      //remove active class from active tab
      let activeTab = router.track.tabs[tabsCont]['tab'];
      if(options.activeTabClass){
        let remove = viewers.removeClass({id:activeTab,parent:'any',class:options.activeTabClass});
        viewers.addClass({id:id,parent:'any',class:options.activeTabClass});
      }
      router.track.tabs[tabsCont] = {module:tabsCont + mod.ref,tab:id};
      engine.router.navigate.to.panel(mod);
    }

    function activeFunction(id,mod){
      router.track.tabs[tabsCont] = {module:tabsCont + mod.ref,tab:id};
      router.built.tab.push(tabsCont + mod.ref);
    }

    //make tabs
    let makeTabs = make.tabs(
      tabsCont,
      options.tabs,
      clickFunction,
      activeFunction,
      options.tabClass,
      options.activeTabClass
    );

    let doReduce = reduce(
      tabsCont,
      options.navButtonClass
    );

    return true;

  }

};
