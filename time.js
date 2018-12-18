

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

  diff : {

    days : function(time1,time2){

      let
      aHold = new Date(time1),
      bHold = new Date(time2),
      a,b;

      a = {
        day:aHold.getDate(),
        month:aHold.getMonth(),
        year:aHold.getFullYear(),
        hour:aHold.getHours(),
        minutes:aHold.getMinutes(),
        seconds:aHold.getSeconds()
      };

      b = {
        day:bHold.getDate(),
        month:bHold.getMonth(),
        year:bHold.getFullYear(),
        hour:bHold.getHours(),
        minutes:bHold.getMinutes(),
        seconds:bHold.getSeconds()
      };

      let base = 0;

      //check if same year
      if(a.year !== b.year){
        let yearDiff = b.year - a.year;
        base += yearDiff * 365;
      }

      //check month
      if(a.month !== b.month){
        let monthDiff = b.month - a.month;
        base += monthDiff * 30;
      }

      //check days
      if(a.day !== b.day){
        let dayDiff = b.day - a.day;
        if(dayDiff > 0){
          base += dayDiff;
        }
      }

      if(base > 0){
        return base;
      }

      //check hours
      if(a.hour !== b.hour){
        let hourDiff = b.hour - a.hour;
        base += hourDiff / 100;
      }

      return base;

    }

  }

};
