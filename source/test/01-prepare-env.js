/**
 * It's not a test.
 * Start and configure the environment beofre tests can run.
 *
 * @type {*}
 */

assert = require( 'assert' );

APP = require( "../index.js" );

console.log( "-- load APP-skeleton" );


/**
 * Example: how to setup a server.
 *
APP.setup( {
    "config"   : __dirname + "/../config",
    "controls" : __dirname + "/../impl/controls",
    "mongodb"  : "mongodb://localhost/restAPP",
    "schema"   : __dirname + "/../config/database"
});

var db = APP.db();
db.connect();




APP.bootstrap.setup( [], function(APP) {
    done();
});

 */

before( function(done) {
    console.log( "-- prepare environment." );

    var bootIt = APP.bootApp( {
        "config"   : __dirname + "/../config",
        "controls" : __dirname + "/../impl/controls",
        "mongodb"  : "mongodb://localhost/restAPP",
        "schema"   : __dirname + "/../config/database"
       }, [ ]
    );

    bootIt.run( function(app) {
       done();
    });


    // APP.server()
    //    .start();

    // done();
});

