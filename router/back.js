

module.exports = {

  nav_back : function(){

    if(engine.router.closeures.length > 1){
      let closeures = engine.router.closeures;
      if(closeures.length === 0){return false;}
      let last = closeures[closeures.length - 1];
      last(true);
      engine.router.closeures.pop();
      return true;
    }

    if(engine.router.route.length > 1){
      let route = engine.router.route;
      route.pop();
      let last = route[route.length - 1];
      engine.router.navigate.to[last.type](last.mod,null);
      engine.router.route.pop();
      window.history.replaceState("object or string", null, last.url);
    }

  },

  close:{

    new:(func)=>{
      engine.router.closeures.push(func);
    },

    pop:()=>{
      let closeures = engine.router.closeures;
      if(closeures.length === 0){return false;}
      engine.router.closeures.pop();
      return true;
    },

    back:()=>{
      let closeures = engine.router.closeures;
      if(closeures.length === 0){return false;}
      let last = closeures[closeures.length - 1];
      last(true);
      engine.router.closeures.pop();
      return true;
    }

  }

};
