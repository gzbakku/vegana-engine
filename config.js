
module.exports = (config)=>{

    // console.log("config called");
    // console.log(config);
    // console.log("base_url");
    // console.log(config.base_url);

    if(!(config instanceof Object)){
        engine.router.set.baseHref("");
        return new engine.common.Error("expected a json object");
    }

    //git remote add origin https://github.com/gzbakku/vegana-static.git
    //git config --global user.name "gzbakku"
    //git config --global user.email "gzbakku@gmail.com"

    function f(v){
        // console.log("/n/nBASEHREF/n/n");
        // console.log({base_href:v});
        engine.router.set.baseHref(
            typeof(v) === 'string' ? v : '',true
        );
        // console.log({baseHref:window.baseHref});
    }

    let base;
    if(config.production){
        base = config.prod;
    } else {
        base = config.dev;
    }

    if(base.base_url instanceof Object){
        if(engine.get.platform("static") && base.base_url.static){
            f(base.base_url.static);
        } else if(base.base_url.web) {
            f(base.base_url.web);
        } else{
            f();
        }
    } else if(typeof(base.base_url) === "string"){
        f(base.base_url);
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
        if((config.layout.fonts instanceof Array) && !is_static_web){
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