
window.onpopstate = function(e){
  // console.log("back called");
  engine.router.back.nav_back(e);
}

module.exports = {

  //nav data
  closures:[],
  active:{
    page:null,
    routers:{}
  },
  built:{},
  route:[],
  track:{
    cont:{},
    panel:{},
    tabs:{},
    comp:{}
  },
  mods:{
    page:{},
    cont:{},
    panel:{}
  },
  routers:{
    comps:{},
    conts:{},
    panels:{}
  },

  //functions
  get : require('./get'),
  set : require('./set'),
  navigate : require('./nav'),
  init : require('./init'),
  back:require('./back'),

};
