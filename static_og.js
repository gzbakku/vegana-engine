

module.exports = {
  onWeb:(d,f)=>{return f(d);},
  publish:()=>{return true;},
  add:{
    globalComp:()=>{return true;},
    page:()=>{return true;},
    cont:()=>{return true;},
    panel:()=>{return true;},
  },
};
