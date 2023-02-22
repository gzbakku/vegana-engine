
module.exports = {
  publish:async ()=>{
    return await builder.publish();
  },
  load:{
    js:(link)=>{builder.load.js.push(link);},
    css:(link)=>{builder.load.css.push(link);}
  },
  data:{},
  functions:{},
  get:{
    data:(key)=>{return engine.static.data[key];},
    function:(key)=>{return engine.static.functions[key];},
  },
  add:{
    data:(key,value)=>{engine.static.data[key] = value;},
    function:(key,value)=>{engine.static.functions[key] = value;},
    js:{
      call:(js)=>{builder.add.functionCall(`${js}`);},
      function:(name,func)=>{
        if(!builder){return;}
        if(typeof(func) === "function"){func = func.toString();}
        let hash = engine.md5(func);
        if(builder.hash.hasOwnProperty(hash)){
          return builder.hash[hash];
        }
        if(!name){name = builder.get_name();}
        builder.hash[hash] = name;
        builder.add.function(`const ${name} = ${func};`);
        return name;
      },
      variable:(name,v)=>{
        if(!builder){return;}
        v = builder.object_to_string.parse_value(v);
        let hash = engine.md5(v);
        if(builder.hash.hasOwnProperty(hash)){
          return builder.hash[hash];
        }
        if(!name){name = builder.get_name();}
        builder.hash[hash] = name;
        builder.add.variable(`const ${name} = ${v};`);
        return name;
      },
      font:(v)=>{if(builder){builder.add.font(v);}},
      variableChecked:(v)=>{
        if(!builder){return;}
        v = builder.object_to_string.parse_value(v);
        if(v.length <= 5){return v;}
        let hash = engine.md5(v);
        if(builder.hash.hasOwnProperty(hash)){
          return builder.hash[hash];
        }
        const new_name = builder.get_name();
        builder.hash[hash] = new_name;
        builder.add.variable(`const ${new_name} = ${v};`);
        return new_name;
      },
    },
    css:(v)=>{
      return builder.add.css(v);
      console.log({sc:v,t:builder.css instanceof Array});
      builder.css.push(v);
    }
  },
};
