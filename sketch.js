

let book = {
  fonts:{},
  colors:{}
};

module.exports = {

 colors:{
   add:(name,val)=>{
     book.colors[name] = val;
   },
   get:(name)=>{
     return book.colors[name];
   }
 },

 fonts:{
   add:async (tag,name,location,style,global_url)=>{
     return new Promise((resolve,reject)=>{
       if((window.hasOwnProperty('is_electron') || window.hasOwnProperty('is_cordova') && !global_url)){
         location = location;
       } else {
         if(!global_url){
           if(location[0] !== "/"){
             location = "/" + location;
           }
           location = baseHref + location;
         }
       }
       location = "URL(" + location + ")";
       const run = new FontFace(name,location);
       run.load()
       .then((d)=>{
         document.fonts.add(d);
         book.fonts[tag] = name;
         resolve();
       })
       .catch((e)=>{
         reject(e);
       });
     });
   },
   get:(tag)=>{
     return book.fonts[tag];
   }
 }

};
