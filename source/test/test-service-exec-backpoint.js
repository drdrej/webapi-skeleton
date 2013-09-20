/**
 * @author: A. Siebert, ask@touchableheroes.com
 */

var assert = require( "assert" );
var service = require( "../impl/service/service.js" );

describe( 'test backpoint/entry-point of another server', function() {

    before( function( done ){
        service.config( {
            "url" : "http//www.touchableheroes.com"
        });

        done();
    });

    describe( 'exec()', function() {
        it( 'exec( --no-params )', function(done) {
            service.exec( null, function( ) {
                done();
            });

        });
    });

});