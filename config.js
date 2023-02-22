
module.exports = (config)=>{

    // console.log("config called");
    // console.log(config);
    // console.log("base_url");
    // console.log(config.base_url);

    if(!(config instanceof Object)){
        engine.router.set.baseHref("");
        return new engine.common.Error("expected a json object");
    }

    function f(v){
        // console.log("/n/nBASEHREF/n/n");
        // console.log(v);
        engine.router.set.baseHref(
            typeof(v) === 'string' ? v : '',true
        );
        // console.log({baseHref:window.baseHref});
    }

    if(config.base_url instanceof Object){
        if(engine.get.platform("static") && config.base_url.static){
            f(config.base_url.static);
        } else if(config.base_url.web) {
            f(config.base_url.web);
        } else{
            f();
        }
    } else if(typeof(config.base_url) === "string"){
        f(config.base_url);
    } else {
        f();
    }

    if(config.layout instanceof Object){
        if(config.layout.colors instanceof Array){
            for(let color of config.layout.colors){
                if(color instanceof Object){
                    if(
                        color.name &&
                        color.color
                    ){
                        engine.layout.colors.add(color.name,color.color);
                    }
                }
            }
        }
        if(config.layout.fonts instanceof Array){
            for(let font of config.layout.fonts){
                if(font instanceof Object){
                    engine.layout.fonts.add(
                        font.tag,
                        font.name,
                        font.location,
                        font.style,
                        font.global_url
                    );
                }
            }
        }
    }

    

}