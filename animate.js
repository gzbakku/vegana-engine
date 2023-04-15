
window.veganaJsAnimations = {};

module.exports = {
    add:add,
    run:run
};

function run(key,id){
    if(window.veganaJsAnimations[key]){
        return animate(id,window.veganaJsAnimations[key]);
    } else if(
        typeof(key) === "string" && typeof(id) === "object"
    ){
        return animate(key,id);
    } else {
        return false;
    }
}

function add(key,data){
    if(!window.veganaJsAnimations){window.veganaJsAnimations = {};}
    window.veganaJsAnimations[key] = data;
}

function animate(id,animation){

    let styles = {};
    if(animation.styles){
        styles = engine.make.integrate_objects(
            styles,
            engine.make.styles.resolve(animation.styles)
        );
    }
    if(animation.style){
        styles = engine.make.integrate_objects(
            styles,
            animation.style
        );
    }
    if(animation.platforms){
        let resolved = engine.make.platform.resolve(animation.platforms);
        if((resolved instanceof Object) && !(resolved instanceof Array)){
            if(resolved.data instanceof Array){
                resolved = resolved.data;
            } else {
                if(!(resolved instanceof Array)){
                    return new engine.common.Error("platform needs to resolve to a array of styles stirngs");
                }
            }
        }
        styles = engine.make.integrate_objects(
            styles,
            engine.make.styles.resolve(resolved)
        );
    }

    let element = engine.get.element(id);
    if(!element){return false;}

    if(animation.time){
        element.style.transition = `all ${animation.time}`;
    }

    function update(){
        for(let key in styles){
            element.style[key] = styles[key];
        }
    }

    setTimeout(()=>{
        update();
    },0);

}