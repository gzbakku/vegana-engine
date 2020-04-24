
const creator = require('./creator');


module.exports = (options)=>{

  if(!options.href && options.type == 'url'){
    return engine.common.error('not_found/invalid-href-a-make-engine');
  }
  if(options.type !== 'url' && options.type !== 'local'){
    return engine.common.error('not_found/invalid-type-a-make-engine');
  }

  if(options.type == 'local'){

    let href = window.baseHref;

    if(options.page){
      let local = options.page;
      let replace = local.replace('Page','');
      href += '/' + replace;
    }
    if(options.cont){
      let local = options.cont;
      let replace = local.replace('Cont','');
      href += '/' + replace;
    }
    if(options.panel){
      let local = options.panel;
      let replace = local.replace('Panel','');
      href += '/' + replace;
    }

    if(options.params){
      for(var key in options.params){
        if(href.indexOf('?') < 0){
          href += '?' + key + '=' + options.params[key];
        } else {
          href += '&' + key + '=' + options.params[key];
        }
      }
    }

    options.href = href;

    //options.href = '#';

    let router = 'to';
    if(options.new == true){
      router = 'new';
    }

    options.function = (object,data,e)=>{

      e.preventDefault();
      e.stopPropagation();

      if(options.baseFunction){
        options.baseFunction();
      }

      if(options.superFuction){
        options.superFuction();
        return;
      }

      if(options.page && !options.cont && !options.panel){
        const page = engine.get.pageModule(options.page);
        if(page){
          engine.router.navigate[router].page(page,options.data);
        }
      }

      if(options.page && options.cont && !options.panel){
        const cont = engine.get.contModule(options.page,options.cont);
        if(cont){
          engine.router.navigate[router].cont(cont,options.data);
        }
      }

      if(options.page && options.cont && options.panel){
        const panel = engine.get.panelModule(options.page,options.cont,options.panel);
        if(panel){
          engine.router.navigate[router].panel(panel,options.data);
        }
      }

      return true;

    }// local function

  }// make the href local



  return creator('a',options);

};
