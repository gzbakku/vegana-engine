

function fetch(){

  let params = {};

  if (/\?(.+?\=.+){1}/.test(document.URL)) {
    document.URL.split('?')[1].split('&').forEach(function(both){
      var e = both.split('=');
      params[e[0]] = e[1];
    });
  }

  return params;

}

function post(params){

  let url = document.URL.split('?')[0];
  for(var i in params){
    if(i && params[i]){
      if(url.indexOf("?") < 0){
        url += '?' + i + '=' + params[i];
      } else {
        url += '&' + i + '=' + params[i];
      }
    }
  }

  window.history.pushState("object or string", null, url);

  return true;

}

module.exports = {

  get : fetch,

  add:(key,val)=>{

    let params = fetch();

    if(typeof(key) == 'string'){
      params[key] = val;
    }

    if(typeof(key) == 'object'){
      for(var i in key){
        if(i && key[i]){
          params[i] = key[i];
        }
      }
    }

    post(params);

  },

  delete:(key)=>{

    let params = fetch();

    if(params.hasOwnProperty(key)){
      delete params[key];
      post(params);
    }

    return true;

  },

  native:{

    get:()=>{

      let result = {
        page:null,
        cont:null,
        panel:null,
        custom:[],
        params:fetch()
      };

      let url = document.URL;
      if(url.indexOf('?') >= 0){
        url = url.split('?')[0];
      }
      url = url.replace(window.location.protocol,'');
      url = url.replace(window.location.hostname,'');
      url = url.replace(window.location.port,'');
      url = url.replace('//','');
      url = url.replace(':','');

      let natives = url.split('/');

      if(natives.length == 0){
        return result;
      }
      if(natives[0].length == 0){
        delete natives.splice(0,1);
      }
      if(natives[0]){
        result.page = natives[0] + 'Page';
        natives.splice(0,1);
      }
      if(natives[0]){
        result.cont = natives[0] + 'Cont';
        natives.splice(0,1);
      }
      if(natives[0]){
        result.panel = natives[0] + 'Panel';
        natives.splice(0,1);
      }
      if(natives.length > 0){
        result.custom = natives;
      }

      return result;

    },

    push:(data)=>{

      let hold = document.URL.split('?');

      if(hold.length > 1){
        url = hold[0] + '/' + data + '?' + hold[1];
      } else {
        url = hold[0] + '/' + data;
      }

      window.history.pushState("object or string", null, url);
      return url;

    }

  }

}
