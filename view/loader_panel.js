const router = require('../router');
const common = require('../common');
const log = false;

module.exports = {

  start : function(){

    common.tell('page loader started',log);

    //get the active cont here

    let cont = router.active.cont;

    //make the router ref

    let routerRef = cont + '-router-panel';
    let loaderRef = cont + '-loader-panel';

    //get the router ref

    let checkRouter = document.getElementById(routerRef);
    let checkLoader = document.getElementById(loaderRef);

    //check the router and loader ref
    if(checkRouter == null || checkLoader == null){
      return common.error('invalid_config_panel_router_loader');
    }

    //hide the router ref
    checkRouter.style.display = 'none';

    //show the loader ref
    checkLoader.style.display = 'block';

    //return
    return true;

  },

  stop : function(){

    common.tell('page loader stopped',log);

    //get the active page here

    let cont = router.active.cont;

    //make the router ref

    let routerRef = cont + '-router-panel';
    let loaderRef = cont + '-loader-panel';

    //get the router ref

    let checkRouter = document.getElementById(routerRef);
    let checkLoader = document.getElementById(loaderRef);

    //check the router and loader ref
    if(checkRouter == null || checkLoader == null){
      return common.error('invalid_config_panel_router_loader');
    }

    //hide the loader ref
    checkRouter.style.display = 'block';

    //show the router ref
    checkLoader.style.display = 'none';

    //return
    return true;

  }

};
