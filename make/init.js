

async function build(type,id,parent,cls){

  engine.make.div({
    parent:parent,
    id:id,
    only_id:true,
    class:cls
  });

  let router = engine.router;
  let url = engine.make.url;

  if(type == 'page' && !engine.router.active.page){
    let hold = id.split('-')[1] + 'Page';
    let mod = engine.get.pageModule(hold);
    if(mod){
      engine.router.navigate.run_trackers(mod);
    }
    url.update("page",hold.replace("Page",""));
    router.built[id] = "page-router";
    router.active.page = id;
    router.active.routers["page-router"] = id;
  }

  return id;

}

module.exports = {

  page : function(id,cls){
    return build('page',id,'page-router',cls);
  },

  comp : function(id,parent,cls){
    return build('comp',id,parent,cls);
  },

  cont : function(id,parent,cls){
    return build('cont',id,parent,cls);
  },

  panel : function(id,parent,cls){
    return build('panel',id,parent,cls);
  }

}
