# Vegana

Vegana is a js framework to build single page apps with native support of a defined document structure for ease of developemnt in big teams, code sharing, native and fast lazyness for a smooth browsing experience and native js web api plugins for ease of use and faster development speeds.basic concept is to reduce final bundle size and break the bundle based on a document structure making the browsing experience smooth and fast.

  - tiny and broken up document  structure
  - native lazyness with super fast loading and web api plugins.
  - native api framework support with rocket iron and wet.
  - only js and sass develoment enviorment to speed up development multitudes of time.
  - prebuilt native components and upcoming support for web compoenets.
  - defined code structure to make onboarding new devs easy for big teams.
  - native nodejs cli with cross platform support.
  - non defined sass data structure.
  - sass loader for electron and cordova is now supported sorry guys for breaking that.

# what's new

  - loader is more efficient in space and faster then before.
  - module loader now checks if modules are already loaded and resolves if they are.
  - loader now allows to load module css just by passing load_css param as true.
  - you can load sassPack from sassPack loader api
  - native sass lazy files are deprecated.

# When to use!

 - if your project is big and you need the website to load in under a sec.
 - if you have a big team and want to develop something fast with easy of dev onboarding
 - if your project is with multiple use heavy pages.
 - if your project use an api.
 - if you dont want breaking changes in upcoming updates in app or in cli.
 - if you have prebuilt sass or css style sheet.

# Before you start

 - please get yourself familiar with atleast js css and sass.
 - get a little bit familiar with concepts of js api's, npm libraries, size of final bundle and component laziness.
 - get familier with nodejs and npm.
 - installing npm module as a global app.
 - efficiency of js data structures.
 - read the document structure docs.

this framework is a js and sass only enviorment please dont get confused in finding where to place the html.

official docs at [Docs]

[Docs]: <https://vegana.github.io>

------
------

## Installation

 - install node js here [NodeJs]
 - make sure npm is installed.
 - install vegana as a global module  ``` $ npm i --global vegana ```
 - check if vegana is installed globally ``` $ vegana check ```

[NodeJs]: <https://nodejs.org/en/download/>

------
------

# Index
- [CLI](#cli)
    - [Initiate a new Project](#initiate-a-new-project)
    - [Serve the Project Generated](#serve-the-project-generated)
    - [Build the Project](#build-the-project)
    - [Generate Components](#generate-components)
        - [Generate a Page](#generate-a-page)
        - [Generate a Cont](#generate-a-cont)
        - [Generate a Panel](#generate-a-panel)
        - [Generate a Component](#generate-a-component)
- [Vegana Document Structure](#vegana-document-structure)
- [Vegana App Structure](#vegana-app-structure)
- [Vegana engine Apis](#vegana-engine-apis)
    - [Vegana Routing System](#vegana-routing-system)
        - [Router Init Apis](#router-init-apis)
        - [Router Navigate](#router-navigate)
        - [Router Get](#router-get)
        - [Router Set](#router-set)
    - [Lazy Loader Apis](#lazy-loader-apis)
    - [Vegana Make Apis](#vegana-make-apis)
        - [Vegana Standard Dom Element Apis](#vegana-standard-dom-element-apis)
        - [Vegana Exclusive Element Apis](#vegana-exclusive-element-apis)
    - [Vegana view Api](#vegana-view-api)
    - [Vegana Session Api](#vegana-session-api)
    - [Vegana Validate Api](#vegana-validate-api)
    - [Vegana Http Request Api](#vegana-http-request-api)
    - [Wet Vegana Api](#wet-vegana-api)

------
------

## Cli
Vegana cli is a nodejs based cli app and gives a cross platform uniform experience. the goal with cli was to make a fast developement enviorment by doing all the heavy lifting like live reloading, final app building and optimization image optimization ,component generation and inbuilt server for development.

### features

 - Inbuilt Server with Live Reloading
 - Live sass compilation
 - Native app building and code and image optimization.
 - Fast Component generation and auto lazy componet integration.

------

### Commands

#### Initiate a new Project
this shell command generates the files required by the vegana framework in current working directory or the directory where you have called the command. in other words make the directory with project name and initiate the project inside the new directory.

```sh
$ vegana init test
```
here test is the project name.

------

#### Serve the Project Generated
this command starts a server and compiles the app files and serves a built app to the browser. Vegana use the port 5566 to start the server at and currently cannot use any other port please make sure the port is not in use while you serve the app.
this app listens for file chnages in the app directory and re buods the app as nessesery. the app is optimized to reload only the compoent rebuild you should not have any issue with the optimization either.the bundle served is non optimized for faster builds and does not represent the final bundle size.

```sh
$ vegana serve
```

you can now start you app development. the app comes with a test document which can be removed or worked around your choice.

------

#### Build the Project
this app builds a optimized version of you app with app the lazy components integrated in the build folder the build folder is now ready to be deployed to any server.the code generated cannot be used for further generated so please keep you app sources code backed up for future development.

```sh
$ vegana build
```

------

## Generate Components
this command generates a predined set of components please read the component docs before hand to understand the proper and optimized use of em.

#### Generate a Page
this command generates a page ocmponets and takes page name and lazziness flag as argument please make sure you are running this command in the app/pages folder for it to work. if page name is repeated i guess the query fails if not a folder with page name will be generated with a page.js file inside of it all the further page componets have to be built inside of the page folder.this mod can be routed inside the page router.

```sh
$ vegana generate page home --lazy
```

here the page name is home and the lazy flag integartes the component as a lazy one.
you dont have to use the lazy flag if the page is not lazy.

#### Generate a Cont
this command have to be called inside the page folder 'app/page/homePage/' and generates and cont mod inside a folder names cont in page direcoty. again the format is same and this component is also lazy and can be loaded when is required by the user.this component can be routed inside the page in cont router.

```sh
$ vegana generate cont home --lazy
```

this componet cannot be shared with other pages.

#### Generate a Panel
this module can be generated inside a cont and can be routed in the panel router with the cont module.this command generated the panel file insde a panel folder with the cont folder 'app/pages/homePage/cont/mainCont/panels/mainPanel/panel.js' with a panel js file insdie of it.

```sh
$ vegana generate panel main --lazy
```

#### Generate a Component
this module can be genearted in any of the other modules and can be shared inbetween other modules by making itself global within the app. this module cannot be lazy and is to be available whenever is called. is have to be called within the app folder to work.

```sh
$ vegana generate comp menu
```

where menu is the name of the component generated. this can be used by multiple pages.

------
------

# Vegana Document Structure
Vegana follows a predifined nesting document structure which allows the final bundle to be broken up into multiple lazy modules which can be loaded whenever is requires by the user this makes the final bundle very light, making experience of browsing through the app smooth and fast.the initial page load is also super fast which makes the user experience even better.

## Page Module
this is the top level module and is routable in the page router.this can be a contact page, home page,login page or singup page and can be loaded to the app as required.the app needs to contain atleast one page module. all the further mods are nested inside of it.
this module is required to be generated inside the app/pages folder to work.
page module can call vegana apis to make html and vegana dom elements.

### file structure
this module consist of constants with the page name and page id varibales with a init function this function is called whenever a page is to be loaded the page module automatically integrates itself into the app bundle once is required in the nodejs code or the lazy loader more will be provided on this in the routing system docs.
you need to code your app within the init function and call any further functions from it user defined function are not globally available.
constants modules are required to be called from outside the init function so then can be included in the final bundle.

-------

## Cont Module
this module is nested inside of the page module directory and is routable in the cont router each page has its own cont router and any route request for conts is treated to be on the activated page.this cont can be used for diffrent features of a page like tabs which does diffrent things for example a home page on instagram have search cont, feed cont or user account cont.which can be loaded as required.

### file structure
file structure is mainly similar design wise execpt this module defines the page id and page name too and exists inside the parent page directory.any arguments require by the module can be passed in through the init function by the parent page or can be transferred through the native vegana data managemnt system.

-----

## Panel Module
this module is nested inside the cont module and is routable through panel router. each cont have a unique panel router and each panel route query is processed for the activated cont module.these can be used for diffrent tabs inside the user info section like followers albums and such.

### file structure
file structure is mainly similar design wise execpt this module defines the cont id and name too and exists inside the parent cont directory.any arguments require by the module can be passed in through the init function by the parent cont or can be transferred through the native vegana data managemnt system.

-----

## Comp Module
this module is a static part of any of the other modules and can be shared inbetween them, this module have a native routing system too if required by the app.this is not a lazy module and is required to be a part of any other module.

### file structure
file structure is mainly similar design wise, this mod exists inside the parent mod directory.any arguments require by the module can be passed in through the init function by the parent mod or can be transferred through the native vegana data managemnt system.

-----
-----

# Vegana App Structure

-----
-----

# Vegana engine Apis
Vegana engine is the core vegana apis which enables devs to build pure js html elements like divs, inputs, images, links and buttons,make http api requestes, manage data stored locally on user's browser control js apis with easy to use plugins,apply lazy modules, authentication and routing systems.

# Vegana Routing System
Vegana use a module based routing system with uniqe router for each module type.
page,cont and panel mods can be lazy and loaded whenever is required, comp module have a native routing system too but cannot be lazy loaded. page,cont and panel modules are nested inside by the order defined in the document structure first page mod then cont module is nested within the page router in the cont router each page consist of its unique cont router and can only be called once.panel router is same and is nested within the cont with its own unique panel router which can be called only once.comp router can be called as many times as the app requires it to within it self.

routing system have the following apis
- router apis
    - router init
    - navigate
    - get
    - set
- lazy loader apis
    - load
        - page
        - cont
        - panel
    - css

## Router Apis

### Router Init Apis
these apis init diffrent routers in diff mods

#### Conts Router Init
this api initiates a cont router on a page module this api can only be called once and returns the div id of the router div on current page.

```sh
engine.conts.init(pageId);
```

this function should only be called on the page module with the pageId as input.
pageId is predefined on the page module.

#### Panels Router Init
this api initiates a cont router on a Cont module this api can only be called once and returns the div id of the router div on current Cont.

```sh
engine.panels.init(contId);
```

this function should only be called on the Cont module with the contId as input.
contId is predefined on the Cont module.

#### Comps Router Init
this api initiates a comp router on any other module this api can be called multiple times and returns the div id of the router div.this api takes parent mod's id, comp module which is to be activated and the data which is needed to be transafered.

```sh
//engine.router.comps.init(pageId,pageModule,any_data);
let pageModule = engine.router.get.pageModule("homePage");
engine.router.comps.init(pageId,pageModule,{user_exists:true});
```

data is a optional argument in this module.

this function should only be called on the Cont module with the contId as input.
contId is predefined on the Cont module.

-----

### Router Navigate
these apis navigate mods through there routers. this api have two options if you wanna recreate a module you can call the new function or if you just wanna navigate to a prebuilt module just call the to option of the api.

#### To Navigate Api
this api navigates to prebuilt module or builts a module if it doent exists and navigates to it.this api navigates in between page,cont,panel and comp modules.
nested modules only need module and data to navigate but comp navigation router takes the router if which is returned when comp router is initated.the data argument is optional.

```sh
engine.router.navigate.to.page(pageModule,any_data);
engine.router.navigate.to.cont(contModule,any_data);
engine.router.navigate.to.panel(panelModule,any_data);
engine.router.navigate.to.comp(compModule,any_data,Router_id);
```

#### New Navigate Api
this api rebuilds a module and navigates to it, arguments are same as the to module.

```sh
engine.router.navigate.new.page(pageModule,any_data);
engine.router.navigate.new.cont(contModule,any_data);
engine.router.navigate.new.panel(panelModule,any_data);
engine.router.navigate.new.comp(compModule,any_data,Router_id);
```

-----

### Router Get
these apis can be called to fetch diffrent modules.

#### Get Page Module
this api fetch the page module if available or returns a string as an error if its not found. this takes the page name as a argument.

```sh
engine.router.get.pageModule(pageName);
```

here pageName is the name of a directory of the page.

#### Get Cont Module
this api fetch the cont module if available or returns a string as an error if its not found. this takes the page name and cont name as its arguments.

```sh
engine.router.get.contModule(pageName,contName);
```

here pageName is the name of a directory of the page and contName is the name of the directory of the cont.

#### Get Panel Module
this api fetch the cont module if available or returns a string as an error if its not found. this takes the page, cont and panel name  as its arguments.

```sh
engine.router.get.contModule(pageName,contName,panelName);
```

#### Get Base Href
this argument fetches the base href url of the app. this is generally setuped on the index.js page in the app dirctory.this function does not take any argument and returns a string.

```sh
engine.router.get.baseHref();
```

-----

### Router Set
these apis integrate modules to the base app.there are many sub apis in this set but you will only use one rest are for module integration and you dont wannna use em they are already automated.

#### Set Base Href
this argument sets the base href if you are going to host the app in a sub directory i mean you can do it. if you wanna fetch something manually.this function takes the hosting directory path without the '/' at the begnning of the address.

```sh
//engine.router.set.baseHref(path_as_string);
engine.router.set.baseHref('home/test/');
```

-----
-----

## Lazy Loader Apis
these apis fetch lazy modules and files when you need em.all of these are async and returns a error if the files are not found.

### Lazy Load Page Module
this api fetches the lazy page and takes the pageName as a argument and resolves it the page is successfully loaded or returns a error if not.

```sh
engine.loader.load.page('testPage')
.then(()=>{
    console.log('fetched');
})
.catch((error)=>{
    console.log(error);
})
```

### Lazy Load Cont Module
this api fetches the lazy Cont and takes the pageName and contName as arguments and resolves it the cont is successfully loaded or returns a error if not.

```sh
engine.loader.load.cont('testPage','testCont')
.then(()=>{
    console.log('fetched');
})
.catch((error)=>{
    console.log(error);
})
```

### Lazy Load Panel Module
this api fetches the lazy page and takes the pageName,contName and panelName as arguments and resolves it the panel is successfully loaded or returns a error if not.

```sh
engine.loader.load.panel('testPage','contName','panelName')
.then(()=>{
    console.log('fetched');
})
.catch((error)=>{
    console.log(error);
})
```

### Lazy Load Css StyleSheet
this api fetches a lazy sass file by the filename.

```sh
engine.loader.load.css('testCss')
.then(()=>{
    console.log('fetched');
})
.catch((error)=>{
    console.log(error);
})
```

-----
-----

# Vegana Make Apis
these apis make html dom and vegana elements. each make api returns a id of the dom element.

## Vegana Standard Dom Element Apis

### Make A Div
this api makes a div container inside a module and takes the following arguments.

```sh
engine.make.div({
    id:'whatever-box',
    parent:'parent-cont-id',
    class:'whatever-class',
    text:'this is a test div',
    function:(id)=>{
        console.log(id);
    }
});
```

the text function here is called whenever the div is clicked and the text makes the test node inside the div.

--------

### Make A Text Node
this api makes a text node in a div

```sh
engine.make.text({
    parent:'parent-cont-id',
    text:'this is a text node'
});
```

--------

### Make A Image
this api makes a div container inside a module and takes the following arguments.

```sh
engine.make.div({
    id:'whatever-box',
    parent:'parent-cont-id',
    class:'whatever-class',
    type:"local",           //options are : local and url.
    location:'images/text.png',
    function:(id)=>{
        console.log(id);
    }
});
```

this api make a image node in parent div it takes a type of local or url if local you can store your images in any directory inside the assets directory these images can be fetched where ever you deploy your app you just have to set the base href address in the index.js file in the app directory.if you use the url type the image can be fetched by a url.

--------

### Make Input Feild
this api makes a input feild and takes the following arguments.

```sh
engine.make.input({
    id:'text-input',
    parent:'text-form',
    class:'test-input',
    type:'string',              //type can be string or number
    value:'hello world',
    placeholder:'type something',
    function:(id)=>{
        console.log(id);
        let val = engine.binder.value(id);
        console.log(val);
        //val would be the input feild value
    }
});
```

here the value key defines the value of the feild placeholder is self explanetory and the function is called whenever the user types something.

-----

### Make Select Input
this api makes a select input and takes the following arguments.

```sh
engine.make.select({
    id:'text-input',
    parent:'text-form',
    class:'test-input',
    options:{
        {text:'yes',value:true},
        {text:'no',value:false}
    }
});
```

options is a array of objects with text and value as keys value can be any data and can be binded as nesseseary.text needs to be a string.

-----

### Make Check Box
this api makes a check box input and takes the following arguments.

```sh
engine.make.checkBox({
    id:'test-checkBox',
    parent:'test-form',
    class:'test-check_box',
    labelClass:'test-label-class',
    checked:true
});
```

-----

### Make textarea
this api makes a textarea and takes the following arguments.

```sh
engine.make.textarea({
    id:'test-textarea',
    parent:'test-form',
    class:'test-textarea',
    rows:5,
    placeholder:'please write something.',
    value:'this is a textarea.'
});
```

-----

### Make Button
this api makes a button and takes the following arguments.

```sh
engine.make.button({
    id:'test-textarea',
    parent:'test-form',
    class:'test-textarea',
    value:"click me.",
    disabled:true,
    function:(id)=>{
        console.log(id);
    }
});
```

the function will be triggered when someone clicks the button and the value is the text node inside the button.disabled makes the button non clickable.

to enable a button run the following function


```sh
engine.make.enableButton(buttonId);
```

-----

### Make Html Web Component / Custom Element
this api makes a custom html web component or a custom element whatever you call it and takes the following arguments.

```sh
engine.make.element({
    id:'messages',
    parent:pageId,
    class:'if-you-waana-pass-something',
    tag:'message',
    options:[{
        tag:'height',
        data:5
    },{
        tag:'width',
        data:10
    }]
});
```

the options array are the arguments passed with the html dom element.tag have to be passed.

### Add Class to a Element

```sh
engine.make.addClass({
    id:'test-textarea',
    class:'super-text'
});
```

### Remove a Class from a Element

```sh
engine.make.removeClass({
    id:'test-textarea',
    class:'super-text'
});
```

## Vegana Exclusive Element Apis

### Vegana Make Card
this api makes a custom vegana dom element.the card have a header section which is optional and a close button which will call a close function passed onto the element.

```sh
engine.make.card({
    id:'test-card',
    parent:pageId,
    class:'card',                    //default class.
    close:true,                      // can be false and still use card header
    headerText:'test card header',   // pass if you wanna use close button.
    headerClass:'card-header',                          //default class.
    headerTextContClass:'card-header-text-cont',        //default class.
    headerActionContClass:'card-header-action-cont',    //default class.
    closeButtonClass:'card-header-close-button',        //default class.
    closeButtonValue:'close',                           //default value.
    closeButtonFunction:()=>{
        //do something
    }
});
```

default classes and value dosent need to be passed but can be used if you wanna style you card diffrently, you can use default values to style your cards globally.

### Vegana Make Message
this api makes message with a close button with the following arguments.

```sh
engine.make.card({
    id:'test-card',
    parent:pageId,
    type:'info'             //default value
    message:'this is a test message',
    style:'display:flex',    //optional
    closeButtonClass:'message-close-button',     //default class
    closeButtonValue:'close'                     //default value
});
```

message have fixed class names of 'message' for the div and 'message-info', 'message-success', 'message-warning', 'message-danger'.

message type options are info,success,warning and danger.

### Vegana Make Tabs
Vegana tabs is a custom vegana component which makes a cutom router of components and tabs which is built upon dynamic css and works with mobile and desktop just fine.tabs are optimized for efficiency and does not rebuild the comps if already built and takes the following arguments.

```sh
engine.make.tabs({
    id:'test-tabs',
    parent:pageId,
    tabsContClass:'tab-cont-main',               //deafult class
    linksContClass:'tab-cont-links',             //deafult class  
      tabClass:'tab-idle',                       //deafult class    
      activeTabClass:'tab-active',               //deafult class
      navButtonClass:'tab-nav',                  //deafult class
    moduleContClass:'tab-cont-module',           //deafult class
    tabs:[
      {value:'profile',module,profileComp,active:true},
      {value:'albums',module,albumsComp}
    ]
 })
 ```

 custom classes can be passed to style the tabs however you like.for ease of use please use default class to style the tabs in your stylesheet

-----
-----

# Vegana view Api
these apis hides and shows the div or any html dom element or the custom elements.

## Show Element Api
this api sets the display style property of any html dom element to block to make the element visible.

```sh
engine.view.show(id);
```

## Hide Element Api
this api sets the display style property of any html dom element to none to make the element hidden.
now here is a bug in here if you hide a element you cannot get the elements height and width so keep that in mind while playing around.

```sh
engine.view.hide(id);
```
-----
-----

# Vegana Session Api
this api handles a user session.

## Start a Session
this api start a session with the folowing arguments

```sh
engine.session.start(token,user,uid);
```

here token have to be a string user can be a json or a string and uid can be passed if you want it.only token is required to start a session through.

## Check a Session
this api checks if a session is started.

```sh
engine.session.check();
```

this function returns a boolean.

## End a Session
this api checks if a session is started.

```sh
engine.session.end();
```

this function returns a boolean.

## Get Session Params
this api checks if a session is started.

```sh
engine.session.get.token();
engine.session.get.user();
engine.session.get.uid();
```

token is returned as a string or a null object user gets returnd as a string json or null object and uid is a string or a null object too.

-----
-----

# Vegana Validate Api
this api validates json and email id if you need to do it.

## Validate Json
this api validates if a varibale is a json object and checks its keys and the data type that the key holds if you need to verify a json object.and takes the following params.

```sh
//check if a user object is valid
let user = {
    name:'akku',
    mobile:6665556665
};

let schema = {
    name:{type:"string",min:5,max:255},
    mobile:{type:"number",min:6500100100,max:9999899899}
};

engine.validate.json(schema,user,'dynamic',2048);
//engine.validate.json(schema,data,json_type,max_keys);
//returns a bool and console logs an error

```

api takes the following arguments schema, data, json type and max keys.

### Schema
this is the validation scheme for the data its an object of objects with the key to be matched with the key in data. the value of the key are the validation parameters to be checked which are data type,min and max length and elective.data type can be string,number,object,boolean and email.

min&max properties on string is chekced on the length of the string.
min&max properties on number will be checked by '>' & '<' operator.
min&max properties on object will be checked on the number of keys in a object.
min&max properties on array will be check on the length of the array.

the elective tag makes a key elective meaning if the key doesnt exists on the data the validation will not fail.this param hold a boolean as a value

```sh
{type:"string",min:3,max:3000,elective:true},
{type:'boolean'},
{type:"string"},
```

all of these are valid.if no min and max properties are passed no checks will be performend on min and max property.boolean does support the elective property.

### Data
this is the json object which will be validated with the scheme.

### Validation Type
data can be hard checked meaning if any of the key is missing from the data the validation will be failed.but if your data is a little bit dynamic then you can check for the available keys or the nessesery keys by passing a elective param with a boolean in the schema object of the key,this will allow the json to be validated if the key dosent exists.validation types are static and dynamic.

### Max Data Keys
this property checks the number of keys if the validation type is dynamic.please check the number of keys to be protective.

---------

## Validate a Email
this api validates if a stirng is a valid email or not.

```sh
engine.validate.email("akku@world.earth");
//this returns a bool
```


-----
-----

# Vegana Http Request Api
this api makes http requests via the fetch web standard api and takes the following arguments.

```sh
engine.request.send({
    method:'post',
    url:'https://vegana.github.io',
    body:{
        user:'sa8d7as89d7as89d7as8',
        name:'akku'
    },
    headers:[{country:india}],
});
```

methods are standard http methods get post etc,url is a valid http url,body can be a empty json obejct and headers should be a array of objects with he key as header tag and value as the value of the header tag.

-----
-----

# Wet Vegana Api
this a the offical plugin for the wet api framework and is compatible with wet sessions and secure http requests.

## Set Base Wet Url
this api sets the base wet url address and return a boolean.

```sh
engine.wet.api.set('https://vegana.github.io');
```

## Get Base Wet Url
this api returns the base wet url if already set else returns a null object.

```sh
engine.wet.api.get();
```

## Make a Query
this api makes a authenticated query with the session token as the 'tb-wet-token' with the following arguments.

```sh
engine.wet.api.query({
    url:'/albums',
    body:{
        date:328497897328947324
    },
    headers:[{
        date_type:'since'
    }]
});
```

only url and body are necessary.

-----
-----

# License - MIT

##### Vegana By Akku
