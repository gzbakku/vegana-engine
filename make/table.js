const common = require('../common');
const checkBaseOptions = require('./check').check;
const log = false;
const seprator = false;

module.exports = {

  table : function(options){

    //id,parent,headers,class,trClass,thClass

    common.tell('+++ table',log);

    //security checks

    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(
      options.headers == null ||
      typeof(options.headers) !== 'object'
    ){
      return common.error('no_headers_found : ' + options);
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    //tabel object
    let tableId = options.parent + '-tabel-' + options.id;
    let tabelObject = document.createElement("table");
    tabelObject.id = tableId;
    if(options.class){
      tabelObject.className = options.class;
    }
    get.appendChild(tabelObject);

    //check header size
    if(options.headers.length == 0 || !options.headers.length){
      return common.error('headers not_found/invalid : ' + id);
    }

    //make table row
    let row = document.createElement('tr');
    row.id = tableId + '-row-th';
    if(options.trClass){
      row.className = options.trClass;
    }
    tabelObject.appendChild(row);

    //make table header items
    for(var i=0;i<options.headers.length;i++){
      let key = options.headers[i];
      if(typeof(key) == 'string'){
        let th = document.createElement('th');
        if(options.thClass){
          th.className = options.thClass;
          th.id = row.id + '-th-' + key.toLowerCase();
        }
        th.innerHTML = key;
        row.appendChild(th);
      }
    }

    return tableId;

  },

  tableRows : function(options){

    //id,parent,rowData,rowCls,tdCls

    common.tell('+++ table rows',log);

    //security checks

    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.rows.length || options.rows.length == 0 || !options.rows){
      return common.error('not_found-rows');
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    let rows = options.rows;

    for(var j=0;j<rows.length;j++){

      let row = rows[j];

      if(row.length){
        if(row.length > 0){

          //make row
          let rowId = options.parent + '-row-' + j;
          let rowObject = document.createElement('tr');
          rowObject.id = rowId;
          if(options.trClass){
            rowObject.className = options.trClass;
          }

          //add row items
          for(var i=0;i<row.length;i++){

            let key = row[i];

            if(typeof(key) == 'string'){
              let td = document.createElement('td');
              td.id = rowId + '-td-' + key.toLowerCase().replace(/\s/g, "-");
              if(options.tdClass){
                td.className = options.tdClass;
              }
              td.innerHTML = key;
              //add td to row object
              rowObject.appendChild(td);
            }

          }

          //add row function
          if(options.function){
            rowObject.addEventListener('click',options.function);
          }

          //add row to table
          get.appendChild(rowObject);

        }
      }
      //row length check ends here

    }
    //row loop ends here

    return options.parent;

  },

  tableRow : function(options){

    //id,parent,rowData,rowCls,tdCls

    common.tell('+++ table row',log);

    //security checks

    let check = checkBaseOptions(options);
    if(check == false){
      return common.error('invalid_options : ' + options);
    }
    if(!options.row.length || options.row.length == 0 || !options.row){
      return common.error('not_found-rows');
    }

    //check parent
    let get = document.getElementById(options.parent);
    if(get == null){
      return common.error('invalid_parent');
    }

    //make row
    let rowId = options.parent + '-row-' + options.id;
    let rowObject = document.createElement('tr');
    rowObject.id = rowId;
    if(options.trClass){
      rowObject.className = options.trClass;
    }

    let row = options.row;

    //add row items
    for(var i=0;i<row.length;i++){
      let key = row[i];
      if(typeof(key) == 'string'){
        let td = document.createElement('td');
        td.id = rowId + '-td-' + key.toLowerCase().replace(/\s/g, "-");
        if(options.tdClass){
          td.className = options.tdClass;
        }
        td.innerHTML = key;
        //add td to row object
        rowObject.appendChild(td);
      }
    }

    //add row function
    if(options.function){
      rowObject.addEventListener('click',options.function);
    }

    //add row to table
    get.appendChild(rowObject);


    return options.parent;

  }

};
