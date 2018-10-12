module.exports= {

  kill : false,

  tell : function(message,control){
    if(control == true || this.kill == true){
      console.log('>>> ' + message);
    }
    return true;
  },

  error : function(error){
    console.log('!!! ' + error);
    return false;
  }

};
