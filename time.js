

module.exports = {

  now : function(g){
    let d;if(g){d = new Date(g);} else {d = new Date();}
    return d.getTime();
  },

  date : function(g){
    let d;if(g){d = new Date(g);} else {d = new Date();}
    return d.getDate();
  },

  month : function(g){
    let d;if(g){d = new Date(g);} else {d = new Date();}
    return (d.getMonth() + 1);
  },

  year : function(g){
    let d;if(g){d = new Date(g);} else {d = new Date();}
    return (d.getFullYear());
  },

  day : function(g){
    let d;if(g){d = new Date(g);} else {d = new Date();}
    return (d.getDay() + 1);
  },

  elapsed:(one)=>{
    let two = engine.time.now();
    let diff = two - one;
    let t = '';
    if(diff > (1000*60*60*24)){diff = diff/(1000*60*60*24);t = 'd';} else
    if(diff > (1000*60*60)){diff = diff/(1000*60*60);t = 'h';} else
    if(diff > (1000*60)){diff = diff/(1000*60);t = 'm';} else
    if(diff > (1000)){diff = diff/(1000);t = 's';} else
    if(diff < 1000){diff = diff/1000;t = 'ms';}
    return {t:t,d:diff,value:`${diff}${t}`};
  },

};
