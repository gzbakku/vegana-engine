const log = false;
const httpMarker = 'http://';

module.exports = {

  load : {

    image:function(url){
      let img=new Image();
      img.src=url;
    },

    wasm : async function(options){

      return new Promise(async (resolve,reject)=>{

        engine.common.tell('loading page module',log);

        let error;

        if(!engine.validate.json({
          type:{type:'string',options:['local','url']},
          url:{type:'string',elective:true},
          module:{type:'string',elective:true}
        },options,'dynamic',3)){
          error = 'invalid/not_found-compName';
          reject(error);
        }

        let location;
        if(options.type === 'local'){
          if(!options.module){
            error = 'invalid/not_found-module';
            reject(error);
          }
          if(window.hasOwnProperty('is_electron') || window.hasOwnProperty('is_cordova')){
            location = 'js/wasm/' + options.module + '/index.wasm';
          } else {
            location = baseHref + '/js/wasm/' + options.module + '/' + '/index.wasm';
          }
        }
        if(options.type === 'url'){
          location = options.url;
        }

        let js_path = 'wasm/' + options.module + '/wrapper.js';
        const load_js = await engine.loader.load.js({
          type:'local',
          url:js_path,
        });
        if(!load_js){
          reject("failed-load_wasm_js_wrapper_file");
          return false;
        }

        let controller = options.module + '_wasm_controller';
        if(!eval(controller)){
          reject("failed-load_wasm_js_wrapper_controller");
          return false;
        }

        let hold_controller = eval(controller);
        if(!window.wasmControllers){
          window.wasmControllers = {};
        }
        window.wasmControllers[controller] = hold_controller;

        if(engine.get.platform("cordova")){
          let cordova_location = 'file:///android_asset/www/' + location;
          document.addEventListener("deviceready", ()=>{
              window.resolveLocalFileSystemURL(cordova_location,(fileEntry)=>{
                fileEntry.file((file)=>{
                  var reader = new FileReader();
                  reader.onloadend = async ()=>{
                    let init = await hold_controller(reader.result);
                    if(!init){
                      error = "failed-init-wasm_module";
                      console.log(e);
                      console.log(error);
                      reject(error);
                      return false;
                    }
                    if(!window.wasmModules){
                      window.wasmModules = {};
                    }
                    window.wasmModules[options.module] = init;
                    resolve(init);
                  };
                  reader.onerror = (e)=>{
                    error = "failed-file_reader";
                    console.log(e);
                    console.log(error);
                    reject(error);
                  }
                  reader.readAsArrayBuffer(file);
                },(e)=>{
                  error = "failed-file_opener";
                  console.log(e);
                  console.log(error);
                  reject(error);
                });
              },(e)=>{
                error = "failed-resolveLocalFileSystemURL";
                console.log(e);
                console.log(error);
                reject(error);
              });
          }, false);
          return;
        }

        let init = await hold_controller(location);
        if(!init){
          reject("failed-init-wasm_module");
          return false;
        }
        if(!window.wasmModules){
          window.wasmModules = {};
        }
        window.wasmModules[options.module] = hold_controller;
        resolve(hold_controller);

      });

    },

    js:(options)=>{
      if(!engine.validate.json({
        id:{type:'string',elective:true},
        type:{type:'string',options:['local','url']},
        url:{type:'string',max:4048},
        module:{type:'boolean',elective:true}
      },options,'dynamic',4)){return engine.common.error("failed-invalid_data-load_js");}
      let link = options.type != "url"?process_location("js/" + ensure(options.url,".js")):options.url;
      return load_js(options.id,link,options.module);
    },

    uiLib:(name,load_css)=>{
      return load_js_with_css(
        process_location('js/ui/' + ensure(name,"Ui") + '/ui.js'),
        process_location('css/ui/' + ensure(name,"Ui") + '/lazy.css'),load_css
      );
    },

    comp:(compName,load_css)=>{
      if(engine.global.comp[compName]){return return_resolve();}
      return load_js_with_css(
        process_location('js/globals/' + ensure(compName,"Comp") + '/globalComp.js'),
        process_location('css/globals/' + ensure(compName,"Comp") + '/comp.css'),load_css
      );
    },

    page:(pageName,load_css)=>{
      if(engine.get.pageModule(pageName)){return return_resolve();}
      return load_js_with_css(
        process_location('js/pages/' + ensure(pageName,"Page") + '/page.js'),
        process_location('css/pages/' + ensure(pageName,"Page") + '/page.css'),load_css
      );
    },

    cont:(pageName,contName,load_css)=>{
      if(engine.get.contModule(pageName,contName)){return return_resolve();}
      return load_js_with_css(
        process_location('js/pages/' + ensure(pageName,"Page") + '/conts/' + ensure(contName,"Cont") + "/cont.js"),
        process_location('css/pages/' + ensure(pageName,"Page") + '/conts/' + ensure(contName,"Cont") + "/cont.css"),load_css
      );
    },

    panel:(pageName,contName,panelName,load_css)=>{
      if(engine.get.panelModule(pageName,contName,panelName)){return return_resolve();}
      return load_js_with_css(
        process_location('js/pages/' + ensure(pageName,"Page") + '/conts/' + ensure(contName,"Cont") + '/panels/' + ensure(panelName,"Panel") + '/panel.js'),
        process_location('css/pages/' + ensure(pageName,"Page") + '/conts/' + ensure(contName,"Cont") + '/panels/' + ensure(panelName,"Panel") + '/panel.css'),load_css
      );
    },

    sassPack : function(packName,is_link){
      return load_css(process_location('css/sassPack/' + ensure(packName,"Pack") + "/pack.css"));
    },

    langPack:async (lang)=>{
      const hold = await load_json(process_location('js/languages/' + lang + ".json"));
      if(!hold){return false;} else {window.veganaLanguagePack = {name:lang,dict:hold};}
    }

  },

  css : function(fileName,only_link){
    let link = fileName;
    if(!only_link){
      link = process_location('css/' + ensure(fileName,".css"));
    }
    return load_css(link);
  },

  hook : {

    comp:(data)=>{

      if(!data.comp || !data.function){
        return engine.common.error("not_found-comp/function");
      }

      engine.hooks.comps[data.comp] = data.function;

    },

    page:(data)=>{

      if(!data.page || !data.function){
        return engine.common.error("not_found-page/function");
      }

      engine.hooks.pages[data.page] = data.function;
      let hold = window.pageModules;
      window.pageModules = new Proxy(hold,{
        set(obj,key,val){
          obj[key] = val;
          engine.hooks.pages[data.page]();
        }
      });

    },

    cont:(data)=>{

      if(!data.page || !data.cont || !data.function){
        return engine.common.error("not_found-page/cont/function");
      }

      engine.hooks.conts[data.page] = {};
      engine.hooks.conts[data.page][data.cont] = data.function;
      let hold = window.pageModules;

      window.pageModules[data.page].contModules = new Proxy(hold,{
        set(obj,key,val){
          obj[key] = val;
          engine.hooks.conts[data.page][key]();
        }
      });

    },

    panel:(data)=>{

      if(!data.page || !data.cont || !data.panel || !data.function){
        return engine.common.error("not_found-page/cont/panel/function");
      }

      engine.hooks.panels[data.page] = {};
      engine.hooks.panels[data.page][data.cont] = {};
      engine.hooks.panels[data.page][data.cont][data.panel] = data.function;
      let hold = window.pageModules;

      window.pageModules[data.page].contModules[data.cont].panelModules = new Proxy(hold,{
        set(obj,key,val){
          obj[key] = val;
          engine.hooks.panels[data.page][data.cont][key]();
        }
      });

    }

  },

  process_location:process_location

};

function return_resolve(){
  return new Promise((resolve)=>{resolve();});
}

function ensure(text,anchor){
  if(text.indexOf(anchor) >= 0){return text;} else {return text + anchor;}
}

function process_location(location){
  if(window.is_static && location.includes(".js") && !location.includes("js/bundle.js")){
    require(`../${location}`);
  }
  if(window.is_electron || window.is_cordova || window.is_native){
    return location;
  } else {
    return location = window.baseHref + '/' + location;
  }
}

function load_js_with_css(jsPath,cssPath,do_load_css){
  if(do_load_css !== false){do_load_css = true;}
  if(do_load_css){
    return new Promise((resolve,reject)=>{
      Promise.all([
        load_js(null,jsPath,false),
        load_css(cssPath)
      ])
      .then(()=>{
        resolve();
      })
      .catch((e)=>{
        reject(e);
      });
    });
  } else {
    return load_js(null,jsPath,false);
  }
}

function load_js(id,location,is_module){

  return new Promise((resolve,reject)=>{
    
    if(is_static){
      engine.static.load.js({id:id,location:location,is_module:is_module});
      resolve();
      return;
    }

    let parent = document.getElementsByTagName("head")[0];
    let scp = document.createElement('script');
    scp.type = "text/javascript";
    scp.src = location;
    if(is_module){
      scp.type = "module";
      if(id){
        scp.id = id;
      }
    }

    scp.onload  = function(dd){
      engine.common.tell('js_loaded',log);
      resolve(true);
    };

    scp.onerror = function(e){
      console.error(e);
      console.error('failed-load_js');
      reject('failed-load_js');
    }

    parent.appendChild(scp);

  });

}

function load_css(location){

  return new Promise((resolve,reject)=>{
    if(is_static){
      engine.static.load.css({location:location});
      resolve();
      return;
    }
    let parent = document.getElementsByTagName("head")[0];
    let css = document.createElement('link');
    css.rel  = 'stylesheet';
    css.type = 'text/css';
    css.href = location;
    css.media = 'all';
    parent.appendChild(css);
    css.onload  = function(dd){
      resolve();
    };
    css.onerror = function(e){
      console.error(e);
      engine.common.error('failed-load_js');
      reject('failed-load_css =>' + e);
    }
  });

}

async function load_json(location){
  return fetch(location)
  .then((response)=>{return response.json();})
  .catch((data)=>{return false;});
  return request;
}
