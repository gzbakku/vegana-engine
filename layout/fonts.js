
window.veganaLayoutFonts = {};
  
module.exports = {

    add:async (tag,name,location,style,global_url)=>{
        window.veganaLayoutFonts[tag] = name;
        return new Promise((resolve,reject)=>{
            if(is_static){
                engine.static.add.font({
                    tag:tag,
                    name:name,
                    location:location,
                    style:style,
                    global_url:global_url
                });
                resolve();
                return;
            }
            if(!global_url){
                if(
                    !window.is_electron && 
                    !window.is_cordova
                ){
                    location = engine.loader.process_location(location);
                }
            }
            location = "URL(" + location + ")";
            const run = new FontFace(name,location);
            run.load()
            .then((d)=>{
                document.fonts.add(d);
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
  