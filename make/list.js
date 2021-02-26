module.exports = {

  list : function(options){

    if(options.type !== 'ol' && options.type !== 'ul'){
      options.type = 'ol';
    }
    if(!options.data){
      options.data = 0;
    }

    let list_id = engine.make.creator(options.type,options);

    for(var i=0;i<options.data.length;i++){
      let thisItemData = options.data[i];
      make_list_item(list_id,thisItemData,options.itemClass,options.function,options.events,options.event);
    }

    return list_id;

  },

  listItem : (options)=>{
    return make_list_item(options.list_id,options,options.itemClass,options.function,options.events,options.event);
  },

  listItems : function(options){

    if(!options.list_id){
      return engine.common.error('not_found-list_id-listItems_make_engine');
    }
    let items = options.data;
    for(var i in items){
      make_list_item(options.list_id,items[i],options.itemClass,options.function,options.events,options.event);
    }
    return options.id;

  }

};

function make_list_item(id,item,superClass,superFunction,superEvents,superEvent){

  if(!item.id){
    item.id = engine.uniqid();
  }

  let cls = 'list-item';
  if(item.class){
    cls = item.class;
  } else if(superClass){
    cls = superClass;
  }

  let func = item.function;
  if(!func && superFunction){
    func = superFunction;
  }

  let local_function = (object)=>{
    if(typeof(func) == 'function'){
      func(object.id);
    }
  };

  let events = item.events;
  if(!events && superEvents){
    events = superEvents;
  }

  let eve = item.event;
  if(!eve && superEvent){
    eve = superEvent;
  }

  let build = {
    id:item.id,
    parent:id,
    class:cls,
    text:item.text,
    function:local_function,
    event:eve,
    events:events
  };

  return engine.make.creator('li',build);

}
