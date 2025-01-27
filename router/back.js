

window.onpopstate = function(e){
  // console.log(e);
  if(pop_promise.length > 0){
    let hold = pop_promise[pop_promise.length-1];
    hold();
    return;
  }
  engine.router.back.nav_back(e);
}

let on_back = [];
let pop_promise = [];

module.exports = {

  nav_back : function(e){

    if(on_back.length > 0){
      let ff = on_back.splice(on_back.length-1,1)[0];
      return ff.func(ff.id);
    }

    let closures = engine.router.closures;

    let url,url_string;
    if(closures.length === 0){
      window.history.back();
      return;
    }
    if(closures.length === 1){
      window.history.back();
      return;
    } else {
      closures.splice(closures.length-1,1);
      url_string = closures[closures.length-1];
      url = engine.make.url.parse(url_string);
    }

    if(!url){
      return;
    }

    let toWorker = engine.router.navigate.toWorker;
    let pageMod,contMod,panelMod;

    function get_mod(type,page,cont,panel){
      let router = type === "page" ? "pageModule" : type === "cont" ? "contModule" : type === "panel" ? "panelModule" : null;
      let l = engine.get[router];
      let mod = type === "page" ? l(page) : type === "cont" ? l(page,cont) : type === "panel" ? l(page,cont,panel) : null;
      if(mod){return mod;} else {console.error(`failed load module : ${type} ${name}`);return false;}
    }

    if(url.page){
      pageMod = get_mod("page",url.page);
      if(!pageMod){return false;}
      toWorker(pageMod,"page",false,null,{},true,false,true);
    }
    if(url.cont){
      contMod = get_mod("cont",url.page,url.cont);
      if(!contMod){return false;}
      toWorker(contMod,"cont",false,null,{},true,false,true);
    }
    if(url.panel){
      panelMod = get_mod("panel",url.page,url.cont,url.panel);
      if(!panelMod){return false;}
      toWorker(panelMod,"panel",false,null,{},true,false,true);
    }

    function onroute(mod){
      if(mod){
        if(mod.trackers){
          if(mod.trackers.onBack){
            mod.trackers.onBack(url);
          }
        }
      }
    }

    if(url.panel){onroute(panelMod);} 
    if(url.cont){onroute(contMod);} 
    if(url.page){onroute(pageMod);}

    engine.make.url.update_from_string(url_string,false,true);

  },

  new:(id,func,custom_url)=>{
    on_back.push({
      id:id,func:func
    });
    if(custom_url){
      engine.make.url.push_to_url(engine.get.url_path());
    } else {
      engine.make.url.push();
    }
  },

  pop:async (id)=>{
    if(on_back.length === 0){return;}
    let index = 0,found = false;
    for(let item of on_back){
      if(item.id === id){found = true;break;}
      index++;
    }
    if(!found){return false;}
    let prom = new Promise(((resolve)=>{
      pop_promise.push(resolve);
    }));
    let url = engine.make.url.build_url_string();
    window.history.back();
    await prom;
    engine.make.url.replace(url);
    return on_back.splice(index,1)[0];
  },

  back:()=>{
    return engine.router.back.nav_back();
  }

};
