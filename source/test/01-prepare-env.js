/**
 * It's not a test.
 * Start and configure the environment beofre tests can run.
 *
 * @type {*}
 */

assert = require( 'assert' );

APP = require( "../index.js" );


/**
 * Example: how to setup a server.
 */
APP.setup( {
    "config"   : __dirname + "/../config",
    "controls" : __dirname + "/../impl/controls",
    "mongodb"  : "mongodb://localhost/restAPP",
    "schema"   : __dirname + "/../config/database"
});

var db = APP.db();
db.connect();

before( function(done) {
    console.log( "-- prepare environment." );

    APP.server()
        .start();

    done();
});

