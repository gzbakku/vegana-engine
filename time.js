

module.exports = {

  now : function(g){
    let d;if(g){d = g} else {d = new Date();}
    return d.getTime();
  },

  date : function(g){
    let d;if(g){d = g} else {d = new Date();}
    return d.getDate();
  },

  month : function(g){
    let d;if(g){d = g} else {d = new Date();}
    return (d.getMonth() + 1);
  },

  year : function(g){
    let d;if(g){d = g} else {d = new Date();}
    return (d.getFullYear());
  },

  day : function(g){
    let d;if(g){d = g} else {d = new Date();}
    return (d.getDay() + 1);
  }

};
