const common = require('../common');
const checkBaseOptions = require('./check').check;
const log = false;
const seprator = false;

module.exports = {

  list : function(options){

    //id,parent,listClass,itemClass,type,data

    common.tell('+++ list',log);

    //security checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(options.type !== 'ol' && options.type !== 'ul'){
      return common.error('invalid_list_type : ' + options);
    }
    if(options.data == null || !options.data.length || options.data.length == 0){
      return common.error('invalid_list_item_dataSet : ' + options);
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    let listId = options.parent + '-list-' + options.id;
    let listObject = document.createElement(options.type);
    if(options.listClass){
      listObject.className = options.listClass;
    }
    listObject.id = listId;

    for(var i=0;i<options.data.length;i++){
      let thisItemData = options.data[i];
      //check this item type
      if(typeof(thisItemData) == 'string'){
        //make list item dom
        let thisItem = document.createElement('li');
        if(options.itemClass){
          thisItem.className = options.itemClass;
        }
        thisItem.id = options.parent + '-' + thisItemData.toLowerCase().replace(/\s/g, "-");
        thisItem.innerHTML = thisItemData;
        if(options.function){
          thisItem.addEventListener('click',options.function);
        }
        listObject.appendChild(thisItem);
      }
    }

    get.appendChild(listObject);

    return listId;

  },

  listItem : function(options){

    common.tell('+++ list item',log);

    //security checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(options.item == null){
      return common.error('invalid_list_item_dataSet : ' + options);
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    //make list item
    let listItemId = options.parent + '-' + options.item.toLowerCase().replace(/\s/g, "-");
    let listItemObject = document.createElement('li');
    listItemObject.id = listItemId;
    if(options.itemClass){
      listItemObject.className = options.itemClass;
    }
    listItemObject.innerHTML = options.item;
    if(options.function){
      listItemObject.addEventListener('click',options.function);
    }
    get.appendChild(listItemObject);

    return listItemId;

  },

  listItems : function(options){

    //id,parent,listClass,itemClass,type,data

    common.tell('+++ list items',log);

    //security checks
    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(options.data == null || !options.data.length || options.data.length == 0){
      return common.error('invalid_list_item_dataSet : ' + options);
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    for(var i=0;i<options.data.length;i++){
      let thisItemData = options.data[i];
      //check this item type
      if(typeof(thisItemData) == 'string'){
        //make list item dom
        let thisItem = document.createElement('li');
        if(options.itemClass){
          thisItem.className = options.itemClass;
        }
        thisItem.id = options.parent + '-' + thisItemData.toLowerCase().replace(/\s/g, "-");
        thisItem.innerHTML = thisItemData;
        if(options.function){
          thisItem.addEventListener('click',options.function);
        }
        get.appendChild(thisItem);
      }
    }

    return options.parent;

  }

};
