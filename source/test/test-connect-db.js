/**
 * Basic-Test f. Mongo-DB.
 * Tests the connection to DB.
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */

var assert = require( "assert" );

describe( 'database-check', function() {

    var dbFacade = APP.db();

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