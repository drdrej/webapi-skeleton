/**
 * @author: A. Siebert, ask@touchableheroes.com
 */

var assert = require( "assert" );
var service = require( "../impl/service/service.js" );

describe( 'test service.config()', function() {


    describe( 'config transformer', function() {


        var transformer;
        before( function( done ) {
            transformer = require( "../impl/service/response/parser-noop.js" );
            done();
        });

        it( 'useTransformer( noop )', function(done) {

            try {
                service.useTransformer( {
                    transformer : transformer
                } );
            } catch( error ) {
                console.log( "service.error ::: %j " + error );
            };

            done();
        });
    });

});