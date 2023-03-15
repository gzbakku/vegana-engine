

module.exports = {
    is_platform_type:is_platform_type,
    resolve:resolve,
    parse_viewport:parse_viewport
};

function parse_viewport(key){
    let regex = /(\d+)x(\d+)/;
    let hold = regex.test(key);
    if(!hold){return false;}
    hold = key.split("x");
    let h = Number(hold[0]);
    let w = Number(hold[1]);
    let b = h > w ? h : w;
    let s = h > w? w : h; 
    let o = h > w? "portrait" : "landscape";
    return {height:h,width:w,biggest:b,smallest:s,orientation:o};
}

function resolve(data,deep){

    // console.log("resolve");

    if(!is_platform_type(data) && false){
        return {
            data:data,
            path:[]
        };
    }

    let os = engine.get.os();
    let device = engine.get.platform("device");
    let native = engine.get.platform("native");
    let web = engine.get.platform("web");

    // console.log({
    //     device:device
    // });

    // native = true,web = false;

    // console.log([os,device,native,web]);

    let children;
    let path = [];
    if(native && data.native){
        path.push("native");
        if(data.native[os]){                       
            path.push(os);
            if(data.native[os][device]){
                path.push(device);
                children = data.native[os][device];
            } else {
                if(data.native[os].all){
                    path.push("all");
                    children = data.native[os].all;
                } else {
                    children = data.native[os];
                }
            }
        } else {
            if(data.native[device]){
                path.push(device);
                children = data[device];
            } else if(data.native.all){
                path.push("all");
                children = data.native.all;
            } else if(data[device]){
                path.push("primary_device");
                path.push(device);
                children = data[device];
            } else {
                children = data.native;
            }
        }
    } else if(web && data.web){
        // console.log("web");
        path.push("web");
        if(data.web[device]){
            // console.log("web device");
            path.push(device);
            children = data.web[device];
        } else if(data.web.all){
            path.push("all");
            children = data.web.all;
        } else if(data[device]){
            path.push("primary_device");
            path.push(device);
            children = data[device];
        } else {
            children = data.web;
        }
    } else {
        if(data[device]){
            path.push(device);
            children = data[device];
        } else if(data.all){
            path.push("all");
            children = data.all;
        } else {
            path.push("primary");
            children = data;
        }
    }

    //select orientation
    if((
        children instanceof Object) && 
        !(children instanceof Array) &&
        deep !== "orientation"
    ){

        let height = engine.get.body.height();
        let width = engine.get.body.width();

        let size = 0;
        let selected_viewport_key;
        let selected_viewport;
        for(let key of Object.keys(children)){
            let viewport = parse_viewport(key);
            if(viewport){
                if(
                    height >= viewport.height && 
                    width >= viewport.width
                ){
                    if(height*width>size){
                        selected_viewport_key = key;
                        selected_viewport = viewport;
                    }
                }
            }
        }

        if(!selected_viewport){
            if(height < width){
                if(children.landscape){
                    children = children.landscape;
                }
            } else {
                if(children.portrait){
                    children = children.portrait;
                }
            }
        } else {
            children = children[selected_viewport_key];
        }

    }

    return {
        data:children,
        path:path
    };

}

function is_platform_type(data){
    if(
        data.all instanceof Object ||
        data.mobile instanceof Object ||
        data.tablet instanceof Object ||
        data.pc instanceof Object ||
        data.native instanceof Object ||
        data.web instanceof Object
    ){
        return true;
    } else {
        return false;
    }
}