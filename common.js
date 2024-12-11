
class Error{
  constructor(e) {
    if(
      e instanceof Error ||
      e instanceof TypeError
    ){
      e = e.toString();
    }
    else if(e instanceof Object){
      try{
        let o = JSON.stringify(e,null,2);
        if(typeof(o) === "string"){e = o}
      }catch(_e){}
    }
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
    let e = this.error;
    this.chain.reverse();
    for(let ee of this.chain){
      if(ee.length > 0){
        e += `\n${ee}`;
      }
    }
    console.error(e);
    return this;
  }
}



module.exports= {

  init_window_result:(on_window)=>{
    window.on_error = engine.on_error;
    window.failed = engine.failed;
    engine.Error = engine.common.Error;
  },

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

  },

  json_hash:json_hash

};

function json_hash(data){
  if(data instanceof Array){
    let hashes = [];
    for(let item of data){
        let hash = json_hash(item);
        hashes.push(hash);
    }
    hashes.sort();
    let cc = '';
    for(let item of hashes){
      cc = engine.md5(`${cc}:${item}`);
    }
    return cc;
  }
  if(data instanceof Object){
    let hashes = [];
    for(let key in data){
        let val = data[key];
        let hash = json_hash(val);
        hash = json_hash(`${key}:${hash}`);
        hashes.push(hash);
    }
    hashes.sort();
    let cc = '';
    for(let item of hashes){
      cc = engine.md5(`${cc}:${item}`);
    }
    return cc;
  }
  if(typeof(data) === "string"){
      return engine.md5(data);
  }
  if(typeof(data) === "number"){
      return engine.md5(`${data}`);
  }
  if(typeof(data) === "boolean"){
    return engine.md5(`${data}`);
  }
  return engine.md5(`${data}`);
}
