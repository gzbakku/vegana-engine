

window.uiModules = {};

module.exports = {

  add:(name,modules)=>{
    window.uiModules[name] = modules;
  },


  getComp:(lib,comp)=>{
    if(!window.uiModules[lib]){return false;}
    if(!window.uiModules[lib][comp]){return false;} else {
      return window.uiModules[lib][comp];
    }
  }

};
