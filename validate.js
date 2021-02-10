module.exports = {
  json:json,
  email:checkEmail
};

function error(a,t,e){
  return {
    all:a,
    tag:t,
    error:e
  }
}

function json(schema,data,schema_type,maxSize,returnError){

  //if no type or maxSize is given static type and max size of 21 is automatically assumed
  if(!schema_type){schema_type = 'static'}
  if(schema_type == 'dynamic' && !maxSize){maxSize = 21;}

  //check schema
  if(!schema || typeof(schema) !== 'object' || Object.keys(schema).length == 0){
    if(returnError){return error(true,null,'not_found-valid_schema');}
    return engine.common.error('not_found-valid_schema');
  }

  //check data
  if(!data || typeof(data) !== 'object' || Object.keys(data).length == 0){
    if(returnError){return error(true,null,'not_found-valid_data');}
    return engine.common.error('not_found-valid_data');
  }

  let keys_schema = Object.keys(schema);
  let keys_data = Object.keys(data);

  //check size of both objects
  if(schema_type == 'static'){
    if(keys_schema.length !== keys_data.length){
      if(returnError){return error(true,null,'miss_matched-object_size');}
      return engine.common.error('miss_matched-object_size');
    }
  }

  //check data object keys size if maxSize property is set
  if(schema_type == 'dynamic' && maxSize){
    if(keys_data.length > maxSize){
      if(returnError){return error(true,null,'max_limit_reached-data_size');}
      return engine.common.error('max_limit_reached-data_size');
    }
  }

  //add any further data types first
  let dataTypes = ['object','array','string','number','email','boolean'];

  const defaultStrLen = 255;

  //loop the schema and check the data
  for(let key in schema){

    const item = schema[key];

    //check shcema item type
    if(typeof(item) !== 'object'){
      if(returnError){return error(false,key,'invalid-schema_item_type');}
      return engine.common.error('invalid-schema_item_type-' + key);
      break;
    }

    //check if schema item have been declared
    if(!item.type || dataTypes.indexOf(item.type) < 0){
      if(returnError){return error(false,key,'not_found/invalid-schema_item_type');}
      return engine.common.error('not_found/invalid-schema_item_type-' + key);
      break;
    }

    let
    type = item.type,
    needed = true,
    present = false;

    //check if the item is elective
    if(item.elective && item.elective == true){
      if(schema_type == 'static'){
        if(returnError){return error(false,key,'invalid-elective_item_in_static_schema-schema_key_in_data');}
        return engine.common.error('invalid-elective_item_in_static_schema-schema_key_in_data-' + key);
        break;
      } else {
        needed = false;
      }
    }

    //check if schema key exists in data
    if(needed == true && data.hasOwnProperty(key) == false){
      if(returnError){return error(false,key,'not_found-schema_key_in_data');}
      return engine.common.error('not_found-schema_key_in_data-' + key);
      break;
    }

    //check if static data exists
    if(data.hasOwnProperty(key) == true && data[key] !== undefined && data[key] !== null){
      present = true;
    }

	//check if the data value is not false for non boolean keys
    if(present && type !== 'boolean' && data[key] === false){
      present = false;
    }

    //check if the data is needed and present
    if(present == false && needed == true){
      if(returnError){return error(false,key,'not_found-data-data_type_for_key');}
      return engine.common.error('not_found-data-data_type_for_key-' + key);
      break;
    }

    //check if data type is valid
    if(present == true && type !== 'email' && checkType(data[key]) !== type){
      if(returnError){return error(false,key,'invalid-data_type_for_key');}
      return engine.common.error('invalid-data_type_for_key-' + key);
      break;
    }

    //check the array and string length for schema key in data
    if((type == 'array' || type == 'string') && present == true){

      if(!data[key]){
        if(returnError){return error(false,key,'not_found-data-schema_key_in_data');}
        return engine.common.error('not_found-data-schema_key_in_data-' + key);
        break;
      }

      if(item.min && data[key].length < item.min){
        if(returnError){return error(false,key,'min_length_reached-schema_key_in_data');}
        return engine.common.error('min_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(item.max && data[key].length > item.max){
        if(returnError){return error(false,key,'max_length_reached-schema_key_in_data');}
        return engine.common.error('max_length_reached-schema_key_in_data-' + key);
        break;
      } else if(!item.max && type == 'string' && data[key].length > defaultStrLen){
        if(returnError){return error(false,key,'default_max_length_reached-schema_key_in_data');}
        return engine.common.error('default_max_length_reached-schema_key_in_data-' + key);
        break;
      }

      //check if the key is a valid option
      if(type == 'string'){
        if(item.options && checkType(item.options)){
          if(item.options.indexOf(data[key]) < 0){
            if(returnError){return error(false,key,'invalid_option-schema_key_in_data');}
            return engine.common.error('invalid_option-schema_key_in_data-' + key);
            break;
          }
        }
      }

    }

    //check the number for schema key in data
    if(type == 'number' && present == true){

      if(data[key] !== 0 && !data[key]){
        if(returnError){return error(false,key,'not_found-data-schema_key_in_data');}
        return engine.common.error('not_found-data-schema_key_in_data-' + key);
        break;
      }

      if(item.min && data[key] < item.min){
        if(returnError){return error(false,key,'min_length_reached-schema_key_in_data');}
        return engine.common.error('min_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(item.max && data[key] > item.max){
        if(returnError){return error(false,key,'max_length_reached-schema_key_in_data');}
        return engine.common.error('max_length_reached-schema_key_in_data-' + key);
        break;
      }

    }

    //check the object key size for schema key in data
    if(type == 'object' && present == true){

      if(data[key] == false){
        if(returnError){return error(false,key,'not_found-data-schema_key_in_data');}
        return engine.common.error('not_found-data-schema_key_in_data-' + key);
        break;
      }

      if(item.min && Object.keys(data[key]).length < item.min){
        if(returnError){return error(false,key,'min_length_reached-schema_key_in_data');}
        return engine.common.error('min_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(item.max && Object.keys(data[key]).length > item.max){
        if(returnError){return error(false,key,'max_length_reached-schema_key_in_data');}
        return engine.common.error('max_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(item.validate && typeof(item.validate) === "object" && item.validate.hasOwnProperty('schema')){
        let checkSchema = json(item.validate.schema,data[key],item.validate.dynamic,item.validate.maxSize,item.validate.returnError);
        if(!checkSchema){
          if(returnError && item.validate.returnError){return error(false,key,'failed-object_schema_check-schema_key_in_data-'+key);}
          return engine.common.error('failed-object_schema_check-schema_key_in_data-' + key);
          break;
        }
      }

    }

    //check the boolean data type
    if(type == 'boolean' && present == true){
      if(data[key] !== true && data[key] !== false){
        if(returnError){return error(false,key,'invalid-invalid_data-expected_boolean');}
        return engine.common.error('invalid-invalid_data-expected_boolean' + key);
        break;
      }
    }

    //check email and email string length for schema key in data
    if(type == 'email' && present == true){

      if(checkType(data[key]) !== 'string'){
        if(returnError){return error(false,key,'invalid-schema_key_in_data');}
        return engine.common.error('invalid-schema_key_in_data-' + key);
        break;
      }

      if(item.min && Object.keys(data[key]).length < item.min){
        if(returnError){return error(false,key,'min_length_reached-schema_key_in_data');}
        return engine.common.error('min_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(item.max && Object.keys(data[key]).length > item.max){
        if(returnError){return error(false,key,'max_length_reached-schema_key_in_data');}
        return engine.common.error('max_length_reached-schema_key_in_data-' + key);
        break;
      }

      if(checkEmail(data[key]) == false){
        if(returnError){return error(false,key,'invalid-email_key');}
        return engine.common.error('invalid-email_key-' + key);
        break;
      }

    }

  }
  //loop ends here

  //final functional return
  return true;

}

function checkType(data){

  if(data == undefined || data == null){
    return data;
  }

  let base = typeof(data);

  if(base == 'object'){
    if(data instanceof Array){
      return 'array';
    }
    if(data instanceof Object){
      return 'object';
    }
  }

  if(base == 'string' || base == 'number'){
    return base;
  }

  if(data == false || data == true){
    return 'boolean';
  }

  return null;

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
