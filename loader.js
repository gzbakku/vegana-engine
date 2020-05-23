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
        window.wasmModules[options.module] = init;
        resolve(init);

      });

    },

    js : function(options){

      return new Promise((resolve,reject)=>{

        engine.common.tell('loading page module',log);

        let error;

        if(!engine.validate.json({
          id:{type:'string',elective:true},
          type:{type:'string',options:['local','url']},
          url:{type:'string',max:4048},
          module:{type:'boolean',elective:true}
        },options,'dynamic',4)){
          error = 'invalid/not_found-compName';
          reject(error);
        }

        let location;

        if(options.type == 'local'){
          if(window.hasOwnProperty('is_electron') || window.hasOwnProperty('is_cordova')){
            location = 'js/' + options.url;
          } else {
            location = baseHref + '/js/' + options.url;
          }
        }
        if(options.type == 'url'){
          location = options.url;
        }

        let parent = document.getElementsByTagName("head")[0];

        let scp = document.createElement('script');
        scp.type = "text/javascript";
        scp.src = location;
        if(options.module){
          scp.type = "module";
          if(options.id){
            scp.id = options.id;
          }
        }

        scp.onload  = function(dd){
          engine.common.tell('js_loaded',log);
          resolve(true);
        };

        scp.onreadystatechange = function(){
          engine.common.tell('js_loaded',log);
          resolve(true);
        };

        scp.onerror = function(e){
          console.error(e);
          engine.common.error('failed-load_js');
          error = 'failed-load_js';
          reject(error);
        }

        parent.appendChild(scp);

      });

    },

    comp : function(compName){

      return new Promise((resolve,reject)=>{

        engine.common.tell('loading page module',log);

        let error;

        if(!compName || typeof(compName) !== 'string'){
          error = 'invalid/not_found-compName';
          reject(error);
        }
        if(engine.global.comp.hasOwnProperty(compName)){
          error = 'global_comp-already-loaded';
          reject(error);
        }

        let location;
        if(window.hasOwnProperty('is_electron') || window.hasOwnProperty('is_cordova')){
          location = 'js/globals/' + compName + 'Comp/globalComp.js';
        } else {
          location = baseHref + '/js/globals/' + compName + 'Comp/globalComp.js';
        }

        let parent = document.getElementsByTagName("head")[0];

        let scp = document.createElement('script');
        scp.type = "text/javascript";
        scp.src = location;

        scp.onload  = function(){
          engine.common.tell('global_comp_loaded',log);
          resolve(true);
        };

        scp.onreadystatechange = function(){
          engine.common.tell('global_comp_loaded',log);
          resolve(true);
        };

        scp.onerror = function(){
          engine.common.error('failed-compLoad');
          error = 'failed-compLoad';
          reject(error);
        }

        parent.appendChild(scp);

      });

    },

    page : function(pageName){

      return new Promise((resolve,reject)=>{

        engine.common.tell('loading page module',log);

        let error;

        if(!pageName || typeof(pageName) !== 'string'){
          error = 'invalid/not_found-pageName';
          reject(error);
        }
        if(window.pageList[pageName] == 'onboard'){
          error = 'pageModule-already-loaded';
          reject(error);
        }

        let location;
        if(window.hasOwnProperty('is_electron') || window.hasOwnProperty('is_cordova')){
          location = 'js/pages/' + pageName + '/page.js';
        } else {
          location = baseHref + '/js/pages/' + pageName + '/page.js';
        }

        let parent = document.getElementsByTagName("head")[0];

        let scp = document.createElement('script');
        scp.type = "text/javascript";
        scp.src = location;

        scp.onload  = function(){
          engine.common.tell('page_loaded',log);
          resolve(true);
        };

        scp.onreadystatechange = function(){
          engine.common.tell('page_loaded',log);
          resolve(true);
        };

        scp.onerror = function(){
          engine.common.error('failed-pageLoad');
          error = 'failed-pageLoad';
          reject(error);
        }

        parent.appendChild(scp);
        window.pageList[pageName] = 'onboard';

      });

    },

    cont : function(pageName,contName){

      return new Promise((resolve,reject)=>{

        let error;

        engine.common.tell('loading cont module',log);


        if(!pageName || typeof(pageName) !== 'string'){
          error = 'invalid/not_found-pageName';
          reject(error);
        }
        if(!contName || typeof(contName) !== 'string'){
          error = 'invalid/not_found-ContName';
          reject(error);
        }
        if(window.pageModules[pageName].contList[contName] == 'onboard'){
          error = 'cont-already-loaded';
          reject(error);
        }

        let location;
        if(window.hasOwnProperty('is_electron') || window.hasOwnProperty('is_cordova')){
          location = 'js/pages/' + pageName + '/conts/' + contName + '/cont.js';
        } else {
          location = baseHref + '/js/pages/' + pageName + '/conts/' + contName + '/cont.js';
        }

        //console.log(location);

        let parent = document.getElementsByTagName("head")[0];

        let scp = document.createElement('script');
        scp.type = "text/javascript";
        scp.src = location;

        scp.onload  = function(){
          engine.common.tell('cont_loaded',log);
          resolve(true);
        };

        scp.onreadystatechange   = function(){
          engine.common.tell('cont_loaded',log);
          resolve(true);
        };

        parent.appendChild(scp);

      });

    },

    panel : function(pageName,contName,panelName){

      return new Promise((resolve,reject)=>{

        let error;

        engine.common.tell('loading panel module',log);

        if(!pageName || typeof(pageName) !== 'string'){
          error = 'invalid/not_found-pageName';
          reject(error);
        }
        if(!contName || typeof(contName) !== 'string'){
          error = 'invalid/not_found-ContName';
          reject(error);
        }
        if(!panelName || typeof(panelName) !== 'string'){
          error = 'invalid/not_found-panelName';
          reject(error);
        }

        let location;
        if(window.hasOwnProperty('is_electron') || window.hasOwnProperty('is_cordova')){
          location = 'js/pages/' + pageName + '/conts/' + contName + '/panels/' + panelName + '/panel.js';
        } else {
          location = baseHref + '/js/pages/' + pageName + '/conts/' + contName + '/panels/' + panelName + '/panel.js';
        }

        let parent = document.getElementsByTagName("head")[0];

        let scp = document.createElement('script');
        scp.type = "text/javascript";
        scp.src = location;

        scp.onload  = function(){
          engine.common.tell('panel_loaded',log);
          resolve(true);
        };

        scp.onreadystatechange   = function(){
          engine.common.tell('panel_loaded',log);
          resolve(true);
        };

        parent.appendChild(scp);

      });

    }

  },

  css : function(fileName){

    return new Promise((resolve,reject)=>{

      let error;

      engine.common.tell('loading page module',log);

      if(!fileName || typeof(fileName) !== 'string'){
        error = 'invalid/not_found-css_file_name';
        reject(error);
      }

      let location = baseHref + '/css/' + fileName + '.css';

      if(window.hasOwnProperty('is_electron') || window.hasOwnProperty('is_cordova')){
        location = 'css/' + fileName + '.css';
      } else {
        location = baseHref + '/css/' + fileName + '.css';
      }

      let parent = document.getElementsByTagName("head")[0];

      let css = document.createElement('link');
      css.rel  = 'stylesheet';
      css.type = 'text/css';
      css.href = location;
      css.media = 'all';
      parent.appendChild(link);

      resolve(true);

    });

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

  }

};
