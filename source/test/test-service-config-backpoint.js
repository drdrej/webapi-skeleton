/**
 * @author: A. Siebert, ask@touchableheroes.com
 */

var assert = require( "assert" );
var service = require( "../impl/service/service.js" );

describe( 'test backpoint/entry-point of another server', function() {

    before( function( done ){
         console.log( "-- start test!"  );
         done();
    });

    describe( 'config()', function() {
        it( 'config( --no-params )', function(done) {
            try {
                service.config();
                assert.ok( false, "PROBLEM!" );
                done();
            } catch( err ) {
                assert.ok( true, "waiting for exception" );
                done();
            };
        });

        it( 'config( {} )', function(done) {
            try {
                service.config( {} );
                assert.ok( false, "PROBLEM!" );
                done();
            } catch( err ) {
                assert.ok( true, "waiting for exception" );
                done();
            };
        });

        it( 'config( url : touchableheroes.com )', function(done) {
                service.config( {
                    "url" : "http://www.touchableheroes.com"
                });

                assert.ok( true, "got no exception" );
                done();
        });
    });

});