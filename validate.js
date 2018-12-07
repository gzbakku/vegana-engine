const common = require('./common');

module.exports = {
  json:json,
  email:checkEmail
};

function json(schema,data,type,maxSize){

  //if no type or maxSize is given static type and max size of 21 is automatically assumed
  if(!type){type == 'static'}
  if(type == 'dynamic' && !maxSize){maxSize = 21;}

  //check schema
  if(!schema || typeof(schema) !== 'object' || Object.keys(schema).length == 0){
    return common.error('not_found-valid_schema');
  }

  //check data
  if(!data || typeof(data) !== 'object' || Object.keys(data).length == 0){
    return common.error('not_found-valid_data');
  }

  let keys_schema = Object.keys(schema);
  let keys_data = Object.keys(data);

  //check size of both objects
  if(type == 'static' && keys_schema.length !== keys_data.length){
    return common.error('miss_matched-object_size');
  }

  //check data object keys size if maxSize property is set
  if(type == 'dynamic' && maxSize){
    if(keys_data.length > maxSize){
      return common.error('max_limit_reached-data_size');
    }
  }

  //add any further data types first
  let dataTypes = ['object','array','string','number','email','boolean'];

  const defaultStrLen = 255;

  //loop the schema and check the data
  for(var i=0;i<keys_schema.length;i++){

    let key = keys_schema[i];
    let item = schema[key];

    //check shcema item type
    if(typeof(item) !== 'object'){
      return common.error('invalid-schema_item_type-' + key);
      break;
    }

    //check if schema item have been declared
    if(!item.type || dataTypes.indexOf(item.type) < 0){
      return common.error('not_found/invalid-schema_item_type-' + key);
      break;
    }

    let
    type = item.type,
    needed = true,
    present = false;

    //check if the item is elective
    if(item.elective && item.elective == true){
      needed = false;
    }

    //check if schema key exists in data
    if(needed == true && !data[key]){
      return common.error('not_found-schema_key_in_data-' + key);
      break;
    }

    //check if static data exists
    if(needed == true && data[key]){
      present = true;
    }

    //check if elective data exists
    if(needed == false && data[key]){
      present = true;
    }

    //check if data type is valid
    if(present == true && type !== 'email' && checkType(data[key]) !== type){
      return common.error('invalid-data_type_for_key-' + key);
      break;
    }

    //check the array and string length for schema key in data
    if(type == 'array' || type == 'string' && present == true){

      if(item.min && data[key].length < item.min){
        return common.error('min_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(item.max && data[key].length > item.max){
        return common.error('max_length_reached-schema_key_in_data-' + key);
        break;
      } else if(type == 'string' && data[key].length > defaultStrLen){
        return common.error('deafult_max_length_reached-schema_key_in_data-' + key);
        break;
      }

    }

    //check the number for schema key in data
    if(type == 'number' && present == true){

      if(item.min && data[key] < item.min){
        return common.error('min_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(item.max && data[key] > item.max){
        return common.error('max_length_reached-schema_key_in_data-' + key);
        break;
      }

    }

    //check the object key size for schema key in data
    if(type == 'object' && present == true){

      if(item.min && Object.keys(data[key]).length < item.min){
        return common.error('min_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(item.max && Object.keys(data[key]).length > item.max){
        return common.error('max_length_reached-schema_key_in_data-' + key);
        break;
      }

    }

    //check email and email string length for schema key in data
    if(type == 'email' && present == true){

      if(checkType(data[key]) !== 'string'){
        return common.error('invalid-schema_key_in_data-' + key);
        break;
      }

      if(item.min && Object.keys(data[key]).length < item.min){
        return common.error('min_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(item.max && Object.keys(data[key]).length > item.max){
        return common.error('max_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(checkEmail(data[key]) == false){
        return common.error('invalid-email_key-' + key);
        break;
      }

    }

  }
  //loop ends here

  //final functional return
  return true;

}

function checkType(data){

  if(typeof(data) == 'object'){

    if(Object.keys(data).length == 0){
      return 'object';
    }

    if(!data.length){
      return 'object';
    } else if(data.length > 0){
      return 'array';
    }

  } else {
    return typeof(data);
  }

}

function checkEmail(mail){

  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let test = re.test(String(mail).toLowerCase());

  if(test == true){
    return true;
  } else {
    return false;
  }

}
