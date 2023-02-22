
window.veganaLayoutFonts = {};
  
module.exports = {

    add:async (tag,name,location,style,global_url)=>{
        window.veganaLayoutFonts[tag] = name;
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
        //  window.veganaLayoutFonts[tag] = name;
            resolve();
        })
        .catch((e)=>{
            reject(e);
        });
        });
    },
    
    get:(tag)=>{
        return window.veganaLayoutFonts[tag];
    }

};
  