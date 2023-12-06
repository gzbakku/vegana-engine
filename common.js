
class Error{
  constructor(e) {
    this.error = e;
    this.chain = [];
  }
  now(e){
    this.chain.push(this.error);
    this.error = e;
    return this;
  }
  log(trigger){
    if(trigger === false){return;}
    console.log(this);
    return this;
  }
}

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
  },

  Error:Error,

  objtoary:(x)=>{
    let c = [];
    for(let key in x){c.push(x[key]);}
    return c;
  },

  indexArrange:(data,props)=>{

    let key = 'index';
    if(props && props.key){key = props.key;}

    let book = {};
    for(let item of data){
        book[item[key]] = item;
    }

    let index = [];
    for(let key of Object.keys(book)){
        index.push(Number(key));
    }
    index.sort(function(a, b){return a-b});

    let collect = [];
    for(let item of index){
        collect.push(book[String(item)]);
    }

    return collect;

  },

  unique_obj_key_checker:()=>{

    let hold = [];

    //input is string
    function exists(vv){
        if(hold.indexOf(vv) >= 0){
            return true;
        }
        return false;
    }

    //input is string
    function add(vv){
        if(hold.indexOf(vv) >= 0){
            return false;
        }
        hold.push(vv);
        return true;
    }

    function remove(vv){
        if(hold.indexOf(vv) >= 0){
            hold.splice(hold.indexOf(vv),1);
        }
    }

    return {
        exists:exists,
        add:add,
        remove:remove
    };

  }

};
