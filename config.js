
module.exports = (config)=>{

    if(!(config instanceof Object)){
        engine.router.set.baseHref("");
        return new engine.common.Error("expected a json object");
    }

    function f(v){
        engine.router.set.baseHref(
            typeof(v) === 'string' ? v : '',true
        );
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

}