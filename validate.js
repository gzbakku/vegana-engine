const common = require('./common');
const log = false;

module.exports = {

  email : function(mail){

    if(mail == null || mail == undefined){
      return common.error('not_found-email');
    }

    if(typeof(mail) !== 'string'){
      return common.error('invalid-email_data_type');
    }

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let test = re.test(String(mail).toLowerCase());

    if(test == true){
      return true;
    } else {
      return false;
    }

  },

  json : function(schema,object,strlen){

    common.tell('validating json',log);

    if(schema == null){
      return common.error('not_found-schema');
    }

    if(object == null){
      return common.error('not_found-object');
    }

    if(typeof(schema) !== 'object'){
      return common.error('invalid-schema');
    }

    if(typeof(object) !== 'object'){
      return common.error('invalid-object');
    }

    if(!Object.keys(schema) ){
      return common.error('invalid-schema_keys');
    }

    if(!Object.keys(object) ){
      return common.error('invalid-object_keys');
    }

    let schemaKeys = Object.keys(schema);
    let objectKeys = Object.keys(object);

    if(schemaKeys.length !== objectKeys.length){
      return common.error('doesnt_match-keys_array');
    }

    let maxStringLen = 128;

    if(strlen){
      if(typeof(strlen) == 'number'){
        if(strlen > 1028){
          maxStringLen = 1028;
        }
        if(strlen < 1028){
          maxStringLen = strlen;
        }
      }
    }

    let success = true;
    let failed = [];

    for(var i=0;i<schemaKeys.length;i++){

      let key = schemaKeys[i];

      //if the key is an object
      if(typeof(schema[key]) == 'object'){

        let thisObject = schema[key];

        //check key object keys array length
        if(
          Object.keys(thisObject).length < 2 ||
          Object.keys(thisObject).length > 3
        ){
          success = false;
          failed.push({key:key,error:'invalid-object_size'});
        }

        //check const keys
        if(!thisObject.max){
          success = false;
          failed.push({key:key,error:'not_found-max_property'});
        }
        if(!thisObject.type){
          success = false;
          failed.push({key:key,error:'not_found-type_property'});
        }

        //check keys type
        if(typeof(thisObject.max) !== 'number'){
          success = false;
          failed.push({key:key,error:'invalid-max_property'});
        }
        if(
          thisObject.type !== 'string' &&
          thisObject.type !== 'number' &&
          thisObject.type !== 'object'
        ){
          success = false;
          failed.push({key:key,error:'invalid-type_property'});
        }

        //check key validity
        if(objectKeys.indexOf(key) < 0){
          success = false;
          failed.push({key:key,error:'invalid-key'});
        }

        //match object and schema key type
        if(typeof(object[key]) !== thisObject.type){
          success = false;
          failed.push({key:key,error:'invalid-key'});
        }

        //check key data length
        if(thisObject.type !== 'object'){

          if(thisObject.type == 'string'){
            if(object[key].length > thisObject.max){
              success = false;
              failed.push({key:key,error:'reached-maximum_key_size_limit_reached'});
            }
            if(thisObject.min){
              if(typeof(thisObject.min) == 'number'){
                if(object[key].length < thisObject.min){
                  success = false;
                  failed.push({key:key,error:'failed-minimum_key_size_limit_reached'});
                }
              }
            }
          }

          if(thisObject.type == 'number'){
            if(object[key] > thisObject.max){
              success = false;
              failed.push({key:key,error:'reached-maximum_key_size_limit_reached'});
            }
            if(thisObject.min){
              if(typeof(thisObject.min) == 'number'){
                if(object[key] < thisObject.min){
                  success = false;
                  failed.push({key:key,error:'failed-minimum_key_size_limit_reached'});
                }
              }
            }
          }

        }

      }
      //check key type object ends here

      //check key type string
      if(schema[key] == 'string'){
        //check key existance
        if(!object[key]){
          success = false;
          failed.push({key:key,error:'not_found-object_key'});
        }
        //check object key data type
        if(typeof(object[key]) !== 'string'){
          success = false;
          failed.push({key:key,error:'invalid-object_key_data_type'});
        }
        //check object key data length
        if(object[key].length > maxStringLen){
          success = false;
          failed.push({key:key,error:'failed-maximum_key_size_limit_reached'});
        }
        if(object[key].length < 1){
          success = false;
          failed.push({key:key,error:'failed-minimum_key_size_limit_reached'});
        }
      }

      //check key type number
      if(schema[key] == 'number'){
        //check key existance
        if(!object[key]){
          success = false;
          failed.push({key:key,error:'not_found-object_key'});
        }
        //check object key data type
        if(typeof(object[key]) !== 'number'){
          success = false;
          failed.push({key:key,error:'invalid-object_key_data_type'});
        }
        //check object key data length
        if(object[key].toString().length > maxStringLen){
          success = false;
          failed.push({key:key,error:'failed-maximum_key_size_limit_reached'});
        }
        if(object[key].toString().length < 1){
          success = false;
          failed.push({key:key,error:'failed-minimum_key_size_limit_reached'});
        }
      }

      //check key type object
      if(schema[key] == 'object'){
        //check key existance
        if(!object[key]){
          success = false;
          failed.push({key:key,error:'not_found-object_key'});
        }
        //check object key data type
        if(typeof(object[key]) !== 'object'){
          success = false;
          failed.push({key:key,error:'invalid-object_key_data_type'});
        }
      }

      //check key type object
      if(schema[key] == 'email'){
        //check key existance
        if(!object[key]){
          success = false;
          failed.push({key:key,error:'not_found-object_key'});
        }
        //check object key data type
        if(typeof(object[key]) !== 'string'){
          success = false;
          failed.push({key:key,error:'invalid-object_key_data_type'});
        }
        //check object key data length
        if(object[key].toString().length > maxStringLen){
          success = false;
          failed.push({key:key,error:'failed-maximum_key_size_limit_reached'});
        }
        //check iof the string is an valid email
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let test = re.test(String(object[key]).toLowerCase());
        if(test == false){
          success = false;
          failed.push({key:key,error:'failed-invalid_email'});
        }
      }

    }
    //check loop ends here

    if(success == false){
      common.error('match failed');
      return failed;
    }

    return true;

  }

};
