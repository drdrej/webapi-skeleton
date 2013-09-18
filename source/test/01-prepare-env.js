/**
 * Kein Test.
 *
 * Startet den server, bevor andere mocha-tests ausgeführt werden können.
 * Wird für die Tests der Schnittstellen benötigt.
 *
 * @type {*}
 */

restify = require( 'restify' );
assert = require( 'assert' );

before( function(done) {
    console.log( "-- prepare environment." );

    var rest = require('../impl/server.js');
    rest.start();

    done();
});

