node-restserver-skeleton
========================

        Version: 0.1.0
        Status:  dev


## Abstract

WebApi-skeleton is a stack based on nodejs, mongodb, restify, mongoose &amp; other open source technologies.
The main goal of this project is to help a developer to create a webapi.


## Anwendung

First of all you need to install mongodb, nodejs and npm to use this module.

### Installation
This project is packaged als npm-package. so the installation is easy.

```
     npm webapi-skeleton --save
```

### REST-Routen registrieren
Check file /config/routes.json in this module to understand how it works.

### Schema registrieren
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


write code &amp; have fun!
Andreas Siebert (aka drdrej)