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
 */
before( function(done) {
    console.log( "-- prepare environment." );

    var bootApp = APP.bootApp( {
        "config"   : __dirname + "/../config",
        "controls" : __dirname + "/../impl/controls",
        "mongodb"  : "mongodb://localhost/restAPP",
        "schema"   : __dirname + "/../config/database"
       }, [ "hello" ]
    );

    bootApp.run( function(app) {
       done();
    });

});

