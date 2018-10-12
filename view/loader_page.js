const router = require('../router');
const common = require('../common');
const log = false;

module.exports = {

  start : function(){

    common.tell('page loader started',log);

    //get the page workers here

    let routerRef = 'page-router';
    let loaderRef = 'page-loader';

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

    common.tell('stopping page loader',log);

    //get the page workers here

    let routerRef = 'page-router';
    let loaderRef = 'page-loader';

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
