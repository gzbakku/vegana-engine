const common = require('../common');
const log = false;

module.exports = {

  make : {

    card : function(options){

      common.tell('+++ building card',log);

      let cardId = options.parent + '-div-card-' + options.id;
      let cardObject = document.createElement('div');
      cardObject.id = cardId;
      if(options.function){
        cardObject.addEventListener('click',options.function);
      }
      if(options.hasOwnProperty('class') == true){
        cardObject.className = options.class;
      } else {
        cardObject.className = 'card';
      }

      //check if the close button is required but header test is not found
      if(options.hasOwnProperty('close') == true){
        if(options.close == true){
          if(options.hasOwnProperty('headerText') == false){
            return common.error('card_close-called without card header text property');
          }
        }
      }

      if(options.hasOwnProperty('headerText') == true){

        //make card header object
        let cardHeaderObject = document.createElement('div');
        cardHeaderObject.id = cardId + '-header';
        if(options.hasOwnProperty('headerClass') == true){
          cardHeaderObject.className = options.headerClass;
        } else {
          cardHeaderObject.className = 'card-header';
        }
        cardObject.appendChild(cardHeaderObject);

        //make card header text cont
        let headerTextContObject = document.createElement('div');
        headerTextContObject.id = cardHeaderObject.id + '-cont-text';
        if(options.headerTextContClass){
          headerTextContObject.className = options.headerTextContClass;
        } else {
          headerTextContObject.className = 'card-header-text-cont';
        }
        headerTextContObject.innerHTML = options.headerText;
        cardHeaderObject.appendChild(headerTextContObject);

        //make card header action cont
        if(options.hasOwnProperty('close') == true){
          if(options.close == true){

            //make card header action cont here
            let headerActionContObject = document.createElement('div');
            headerActionContObject.id = cardHeaderObject.id + '-cont-action';
            if(options.headerActionContClass){
              headerActionContObject.className = options.headerActionContClass;
            } else {
              headerActionContObject.className = 'card-header-action-cont';
            }
            cardHeaderObject.appendChild(headerActionContObject);

            //make card action close button
            let closeButtonObject = document.createElement('button');
            if(options.hasOwnProperty('closeButtonClass') == true){
              closeButtonObject.className = options.closeButtonClass;
            } else {
              closeButtonObject.className = 'card-header-close-button';
            }
            if(options.closeButtonValue){
              closeButtonObject.innerHTML = options.closeButtonValue;
            } else {
              closeButtonObject.innerHTML = 'close';
            }

            headerActionContObject.appendChild(closeButtonObject);

            //check close button function
            if(options.hasOwnProperty('closeButtonFunction') == true){
              closeButtonObject.addEventListener('click',()=>{
                options.closeButtonFunction(cardId);
              });
            }

          }
        }
      }
      //card header buolder ends here

      //add card body
      let cardBodyId = cardId + '-body'
      let cardBodyObject = document.createElement('div');
      cardBodyObject.id = cardBodyId;
      if(options.hasOwnProperty('cardBodyClass') == true){
        cardBodyObject.className = options.cardBodyClass;
      } else {
        cardBodyObject.className = 'card-body';
      }

      //add card body object to card object
      cardObject.appendChild(cardBodyObject);

      //add card object to the parent
      let get = document.getElementById(options.parent);
      get.appendChild(cardObject);

      return cardId;

    },

    table : function(options){

      let tabelId = options.parent + '-table-' + options.id;
      let tabelObject = document.createElement("table");
      if(options.class){
        tabelObject.className = options.class;
      }
      tabelObject.id = tabelId;

      if(options.headers.length == 0 || !options.headers.length){
        return common.error('headers not_found/invalid : ' + options);
      }

      //make table row
      let row = document.createElement('tr');
      row.id = tabelId + '-row-heading';
      //console.log(row.id);
      if(options.rowCls){
        //console.log(rowCls);
        row.className = rowCls;
      }

      //make table header items
      for(var i=0;i<options.headers.length;i++){
        let key = options.headers[i];
        if(typeof(key) == 'string'){
          //create td
          let th = document.createElement('th');
          if(options.thClass){
            //console.log(thCls);
            th.className = thCls;
            th.id = row.id + '-th-' + key.toLowerCase();
          }
          th.innerHTML = key;
          row.appendChild(th);
        }
      }

      //insert row to the table
      tabelObject.appendChild(row);
      get.appendChild(tabelObject);
      return id;

    }

  }

}
