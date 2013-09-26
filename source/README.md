node-restserver-skeleton
========================

        State:   in development
        Version: 0.0.25
        Author:  Andreas Siebert / touchableheroes.com


This skeleton is a small framework to build rest-apps with nodejs/javascript.
You start with an app-skeleton and extends later it with your code.

## Usage

### Before you start

This framework is packaged as an npm-package.
So thanks npm it's realy easy to install:

       >npm install node-restserver-skeleton

Is the package installed you can create your app-directory structure.
You are free to build your own structure.
I've used in my project this directory-structure:

- app
--- config/
------ database/
---------- table.schema.json

------ routes.json

--- impl/
------ controls/
----------- endpoint.js

--- test/
--- index.js

#### Directory-Structure - explanation

1. config/ - containts config files.
2. config/routes.json - describes used routes for the rest-frontend.





### Bootstrap

Load the module.

```java
   var APP = require( "node-restserver-skeleton" );
```

Configure and startup your backend.

```javascript

    var bootApp = APP.bootApp( {
        "config"   : __dirname + "/../config",
        "controls" : __dirname + "/../impl/controls",
        "mongodb"  : "mongodb://localhost/restAPP",
        "schema"   : __dirname + "/../config/database"
       }, [ "hello" ]
    );

    bootApp.run( function(app) {
       ...
    });
```


### Restful with routes

Configure the rest-api in a json-file.

**Important:** Use "routes.json" as a name.

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


### Database

In the current version I use mongodb as a backend-storage.


## Dependencies

I've packaged some awesome libraries: restify, mongoose, mocha and others.
Thank you to the open-source-world!



### Third-Party-Connectors

-- db
-- http/rest



## You are involved

There are many ways to help:

1.  use it
2.  share it
3.  identify bugs
4.  fix bugs
5.  discuss and optimize
6.  write documentation
7.  translate
8.  pay for usage
10. spent for future development


