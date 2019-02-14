
module.exports = {

  nav_back : function(){

    if(engine.router.route.length > 1){
      let route = engine.router.route;
      route.pop();
      let last = route[route.length - 1];
      engine.router.navigate.to[last.type](last.mod,null);
      engine.router.route.pop();
      window.history.replaceState("object or string", null, last.url);
    }

  }

};
