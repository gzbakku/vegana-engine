module.exports= {

  kill : false,

  tell : function(message,control){
    if(control == true || this.kill == true){
      console.log('>>> ' + message);
    }
    return true;
  },

  error : function(error,data){
    if(data){
      console.log(data);
    }
    console.log('!!! ' + error);
    return false;
  }

};
