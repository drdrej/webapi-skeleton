webapi-skeleton
========================

        Version: 0.1.0
        Status:  dev


## Einleitung

WebApi-skeleton ist ein stack zur Entwicklung von restbasierten WebApi. Der Stack basiert auf den open-source technologien
nodejs, mongo, restify, mongoose u.a. Das Ziel dieses Projekts ist die Vereinfachung der Entwicklung von WebApi-Basis-Konstrukten
(Boilerplate-Code).



## Anwendung

Vor der Verwendung von webapi-skeleton muss mongodb, nodejs  und npm installiert sein.

### Installation
Das Projekt webapi-skeleton is packetiert als npm-package. D.h. die Installation ist entsprechend einfach.

```
     npm webapi-skeleton --save
```

### REST-Routen registrieren
Beispiel siehe /config/routes.json

### Schema registrieren
Beispiel siehe /config/database/*.schema.json

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
