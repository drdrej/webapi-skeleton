webapi-skeleton
========================

        Version: 0.1.0
        Status:  dev


## Abstract

WebApi-skeleton is a stack based on nodejs, mongodb, restify, mongoose &amp; other open source technologies.
The main goal of this project is to help a developer to create a webapi. To build a REST-api you can start with this
skeleton and extend it later with your own code.


## How to use

First of all you need to install mongodb, nodejs and npm to use this module.

### Installation
This project is packaged als npm-package. so the installation is easy.

```
     npm webapi-skeleton --save
```

### Register REST-routes
Check file /config/routes.json in this module to understand how it works.

In webapi-skeleton you configure REST-routes in a JSON-File.
This Example shows how to bind a REST-Endpoint '/hello' with a parameter ':name' to a control ${controls}/'hello.js'.
Webapi-skeleton resolves the ${controls}-variable as a path to controls.

**Example:**
```javascript
{
    "routes" :  [
        {
            "entry" : "/hello/:name",
            "method" : "get",
            "control" : "/hello"
        }
    ]
}
```



### Register mongoose schema
Check file /config/database/*.schema.json in this module to understand how it works.


### Start server
```JavaScript
       // import
       var Skeleton = require( "webapi-skeleton" );

       // setup
       var app = Skeleton.bootApp( {
           "config"   : __dirname + "/../config",
           "controls" : __dirname + "/../impl/controls",
           "mongodb"  : "mongodb://localhost/restAPP",
           "schema"   :  __dirname + "/../config/database"
       }, tables );

       // start
       app.run( function(app) {
           // callback after initialization.
       });
```


## You are involved

There are many ways you can help:

1.  use it
2.  share it
3.  identify bugs
4.  fix bugs
5.  discuss and optimize
6.  write documentation
7.  translate
8.  spent for future development

This project is open-source and free, so if you use it or simply like it you are welcome to donate.
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=D7GL3MAY2KYLG)


## License
Copyright 2013 Andreas Siebert / ask@touchableheroes.com

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


*write code &amp; have fun!*
Andreas Siebert (aka drdrej) / ask@touchableheroes.com