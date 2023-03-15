

module.exports = {

  nav_back : function(e){

    let closeures = engine.router.closeures;
    let url,url_string;
    if(closeures.length === 0){
      window.history.back();
      return;
    }
    if(closeures.length === 1){
      window.history.back();
      return;
    } else {
      closeures.splice(closeures.length-1,1);
      url_string = closeures[closeures.length-1];
      url = engine.make.url.parse(url_string);
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
      if(mod){if(mod.trackers){if(mod.trackers.onBack){mod.trackers.onBack(url);}}}
    }

    if(url.panel){onroute(panelMod);} else 
    if(url.cont){onroute(contMod);} else 
    if(url.page){onroute(pageMod);}

    engine.make.url.update_from_string(url_string,false,true);

  },

  //TODO
  close:{

    new:(func)=>{},

    pop:()=>{},

    back:()=>{}

  }

};
