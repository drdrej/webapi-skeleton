/**
 * Basic-Test f. Mongo-DB.
 * Tests the connection to DB.
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */

var mongoose = require('mongoose');
var connection = require( "../impl/db/connect.js" );

var dbURI    = 'mongodb://localhost/restAPP';


describe( 'database-check', function() {

     before(function(done) {
        this.timeout(15000);

        if (mongoose.connection.db)
            return done();

        // asynchronous call:
        mongoose.connect(dbURI, done);
    });

    describe('if db is running, mongoose should work', function() {
       it('should get a 200 response', function(done) {
            // setTimeout(15000);
            //                   'mongodb://localhost/knappschaftDB'
            // mongoose.connect( 'mongodb://localhost/knappschaftDB' );

            /*
            connection.connect( 'mongodb://localhost/knappschaftDB' );
            */
            // mongoose.connect('mongodb://localhost/myapp');

            console.log( "-- connect database" );


            /* client.get('/hello/world', function(err, req, res, data) {
                if (err)
                    throw new Error(err);

                assert.equal( 200, data.code );
                assert.equal( "hello world", data.message );

                done();
            }); */

           done();
        });
    });

    // after( function())

});