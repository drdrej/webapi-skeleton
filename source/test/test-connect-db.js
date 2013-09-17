/**
 * Basic-Test f. Mongo-DB.
 * Tests the connection to DB.
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */

// var mongoose = require('mongoose');
// var connection = require( "../impl/db/connect.js" );

var dbURI    = 'mongodb://localhost/restAPP';

var api = require( "../index.js" );


describe( 'database-check', function() {

     before(function(done) {
        api.db(dbURI).connect( function(connection) {
             done();
        } );
    });

    describe('if db is running, mongoose should work', function() {
       it('should get a 200 response', function(done) {
            console.log( "-- connect database" );

           done();
        });
    });

});