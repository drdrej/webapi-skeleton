/**
 * Basic-Test f. Mongo-DB.
 * Tests the connection to DB.
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */

var assert = require( "assert" );

var api = require( "../index.js" );

api.setup( {
     "config"   : __dirname + "/../config",
     "controls" : __dirname + "/../impl/controls",
     "mongodb"  :  "mongodb://localhost/restAPP",
     "schema"   : __dirname + "/../config/database"
} );


describe( 'database-check', function() {

    var dbFacade = api.db();

    before(function(done) {
        dbFacade.connect( function(connection) {
             done();
        } );
    });

    describe('Hello.Schema exists', function() {
       console.log( "-- test ready" );


       it('should get a 200 response', function(done) {
           console.log( "-- connect database" );

           var Hello = dbFacade.schema( "hello" );
           var Hello2 = dbFacade.schema( "hello" );

           assert.equal( Hello, Hello2, "-- Second call should return the same model-object." );

           done();
        });
    });

});