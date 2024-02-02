var db = {};
let type_collection;

module.exports = {

  get : function(tag,where){

    if(!type_collection){
      process_type_collection();
    }

    let data_type;
    if(where === "local" || where === "session"){
      data_type = type_collection[where][tag];
    }

    if(typeof(tag) !== 'string'){
      return engine.common.error('invalid_tag');
    }
    if(!where){
      where = 'mem';
    }

    if(where == 'mem'){
      if(db.hasOwnProperty(tag) == false){
        return null;
      } else {
        return db[tag];
      }
    }
    if(where == 'session'){
      if(sessionStorage.hasOwnProperty(tag) == false){
        return null;
      } else {
        return convert(data_type,sessionStorage[tag]);
      }
    }
    if(where == 'local'){
      if(localStorage.hasOwnProperty(tag) == false){
        return null;
      } else {
        return convert(data_type,localStorage[tag]);
      }
    }

  },

  set : function(tag,value,where){

    if(typeof(tag) !== 'string'){
      return engine.common.error('invalid_tag');
    }
    if(!where){
      where = 'mem';
    }
    let parsed;
    if(typeof(value) == 'object'){
      parsed = JSON.stringify(value);
    } else if(typeof(value) !== 'string') {
      parsed = value.toString();
    } else {
      parsed = value;
    }

    if(where == 'mem'){
      if(!db[tag]){
        db[tag] = parsed;
      } else {
        return false;
      }
    }
    if(where == 'session'){
      if(!sessionStorage[tag]){
        sessionStorage.setItem(tag,parsed);
      } else {
        return false;
      }
    }
    if(where == 'local'){
      if(!localStorage[tag]){
        localStorage.setItem(tag,parsed);
      } else {
        return false;
      }
    }

    return save_data_type(tag,where,typeof(value));

  },

  reset : function(tag,value,where){

    if(typeof(tag) !== 'string'){
      return engine.common.error('invalid_tag');
    }
    if(!where){
      where = 'mem';
    }
    let parsed;
    if(typeof(value) == 'object'){
      parsed = JSON.stringify(value);
    } else if(typeof(value) !== 'string') {
      parsed = value.toString();
    } else {
      parsed = value;
    }

    if(where == 'mem'){
      db[tag] = value;
    }
    if(where == 'session'){
      sessionStorage.setItem(tag,parsed);
    }
    if(where == 'local'){
      localStorage.setItem(tag,parsed);
    }

    save_data_type(tag,where,typeof(value));

    return true;

  },

  delete:(tag,where)=>{

    if(!type_collection){
      process_type_collection();
    }

    if(where == 'mem'){
      delete db[tag];
    }
    if(where == 'session'){
      remove_data_type(tag,'session');
      sessionStorage.removeItem(tag);
    }
    if(where == 'local'){
      remove_data_type(tag,'local');
      localStorage.removeItem(tag);
    }

    return true;

  }

};

function convert(type,data){
  if(type == "number"){
    return Number(data);
  }
  if(type == "object"){
    return JSON.parse(data);
  }
  if(type == "boolean"){
    return JSON.parse(data);
  }
  return data;
}

function remove_data_type(tag,where){

  if(!type_collection){
    process_type_collection();
  }

  if(where === "local"){
    delete type_collection.local[tag];
    localStorage.setItem("type_collection_local",JSON.stringify(type_collection.local));
  }
  if(where === "session"){
    delete type_collection.session[tag];
    localStorage.setItem("type_collection_session",JSON.stringify(type_collection.session));
  }

  return true;

}

function save_data_type(tag,where,type){

  if(!type_collection){
    process_type_collection();
  }

  if(where === "local"){
    type_collection.local[tag] = type;
    localStorage.setItem("type_collection_local",JSON.stringify(type_collection.local));
  }
  if(where === "session"){
    type_collection.session[tag] = type;
    localStorage.setItem("type_collection_session",JSON.stringify(type_collection.session));
  }

  return true;

}

function process_type_collection(){
  let get_local,get_session;
  try{
    const fetch = localStorage.getItem("type_collection_session");
    if(fetch){
      get_session = JSON.parse(fetch)
    } else {
      get_session = {};
    }
  } catch(e) {
    get_session = {}
  }
  try{
    const fetch = localStorage.getItem("type_collection_local");
    if(fetch){
      get_local = JSON.parse(fetch)
    } else {
      get_local = {};
    }
  } catch(e) {
    get_local = {}
  }
  type_collection = {
    session:get_session,
    local:get_local
  };
  return true;
}
