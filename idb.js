window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

let dbs = {};
let stores = {};

module.exports = {

  open:async (name)=>{

    return new Promise(function(resolve, reject) {

      let error;

      if(!name){
        error = 'not_found-name-open-idb-engine';
        reject(error);
      }
      if(dbs.hasOwnProperty(name)){
        error = 'db_already_initiated-open-idb-engine';
        reject(error);
      }

      const run = indexedDB.open(name);
      run.onsuccess = (e)=>{
        dbs[name] = run.result;
        stores[name] = {};
        resolve();
      }
      run.onerror = (e)=>{
        error = 'failed-open-ids-engine';
        reject(error);
      }

    });



  },

  stores:(db)=>{

    return new Promise(function(resolve, reject) {

      if(!db){
        return reject('not_found-db/store-stores-idb-engine');
      }

      if(!dbs[db]){
        return reject('db_not_initiated_yet-stores-idb-engine');
      }

      return resolve(dbs[db].objectStoreNames);

    });

  },

  store:{

    create:async (data)=>{

      const logger = false;

      return new Promise(async function(resolve, reject) {

        if(!data.db || !data.store){
          return reject('not_found-db/store-create-store-idb-engine');
        }

        engine.common.tell('object_verified-create-store-idb-engine',logger);

        if(!dbs[data.db]){
          return reject('db_not_initiated_yet-create-store-idb-engine');
        }

        engine.common.tell('db_intiation_checked-create-store-idb-engine',logger);

        if(true){
          console.log({
            list:dbs[data.db].objectStoreNames,
            contains:dbs[data.db].objectStoreNames.contains(data.store)
          });
        }

        if(dbs[data.db].objectStoreNames.contains(data.store)){
          return reject('already_exists-object_store-db_version_check-create-store-idb-engine');
        }

        engine.common.tell('store_duplicate_checked-create-store-idb-engine',logger);

        const version = dbs[data.db].version;
        dbs[data.db].close();
        delete dbs[data.db];

        engine.common.tell('old_db_connection_closed-create-store-idb-engine',logger);

        const open = indexedDB.open(data.db,version + 1);
        open.onupgradeneeded = ()=>{

          engine.common.tell('upgrade_function_called-create-store-idb-engine',logger);

          const run = open.result.createObjectStore(data.store,data.key,data.options);
          run.onsuccess = (e)=>{
            engine.common.tell('object_store_created-create-store-idb-engine',logger);
            dbs[data.db] = open.result;
            return resolve();
          }
          run.onerror = (e)=>{
            return reject('failed-create-store-db_version_upgrade-db_version_check-create-store-idb-engine');
          }

        }
        open.onerror = (e)=>{
          return reject('failed-db_version_upgrade-create-store-idb-engine');
        }

      });

    },

    check:(data)=>{

      return new Promise(function(resolve, reject){

        if(!data.db || !data.store){
          return reject('not_found-db/store-create-store-idb-engine');
        }

        if(!dbs[data.db]){
          return reject('db_not_initiated_yet-create-store-idb-engine');
        }

        if(dbs[data.db].objectStoreNames.contains(data.store)){
          return resolve(true);
        } else {
          return resolve(false);
        }

      });

    },

    delete : (data)=>{

      const logger = false;

      return new Promise(async function(resolve, reject) {

        if(!data.db || !data.store){
          return reject('not_found-db/store-delete-store-idb-engine');
        }

        engine.common.tell('object_verified-delete-store-idb-engine',logger);

        if(!dbs[data.db]){
          return reject('db_not_initiated_yet-delete-store-idb-engine');
        }

        engine.common.tell('db_intiation_checked-delete-store-idb-engine',logger);

        if(false){
          console.log({
            list:dbs[data.db].objectStoreNames,
            contains:dbs[data.db].objectStoreNames.contains(data.store)
          });
        }

        if(!dbs[data.db].objectStoreNames.contains(data.store)){
          return reject('not_found-object_store-db_version_check-delete-store-idb-engine');
        }

        engine.common.tell('store_duplicate_checked-delete-store-idb-engine',logger);

        const version = dbs[data.db].version;
        dbs[data.db].close();
        delete dbs[data.db];

        engine.common.tell('old_db_connection_closed-delete-store-idb-engine',logger);

        const open = indexedDB.open(data.db,version + 1);
        open.onupgradeneeded = ()=>{

          engine.common.tell('upgrade_function_called-delete-store-idb-engine',logger);

          const run = open.result.deleteObjectStore(data.store);

          console.log(run);

          run.onsuccess = (e)=>{
            engine.common.tell('object_store_created-delete-store-idb-engine',logger);
            dbs[data.db] = open.result;
            return resolve();
          }
          run.onerror = (e)=>{
            return reject('failed-create-store-db_version_upgrade-db_version_check-delete-store-idb-engine');
          }

        }
        open.onerror = (e)=>{
          return reject('failed-db_version_upgrade-delete-store-idb-engine');
        }

      });

    }

  }

};
