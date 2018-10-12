const router = require('../router');
const common = require('../common');
const log = false;

module.exports = {

  start : function(){

    common.tell('page loader started',log);

    //get the active page here

    let page = router.active.page;

    //make the router ref

    let routerRef = page + '-router-cont';
    let loaderRef = page + '-loader-cont';

    //get the router ref

    let checkRouter = document.getElementById(routerRef);
    let checkLoader = document.getElementById(loaderRef);

    //check the router and loader ref
    if(checkRouter == null || checkLoader == null){
      return common.error('invalid_config_cont_router_loader');
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

    let page = router.active.page;

    //make the router ref

    let routerRef = page + '-router-cont';
    let loaderRef = page + '-loader-cont';

    //get the router ref

    let checkRouter = document.getElementById(routerRef);
    let checkLoader = document.getElementById(loaderRef);

    //check the router and loader ref
    if(checkRouter == null || checkLoader == null){
      return common.error('invalid_config_cont_router_loader');
    }

    //hide the loader ref
    checkRouter.style.display = 'block';

    //show the router ref
    checkLoader.style.display = 'none';

    //return
    return true;

  }

};
