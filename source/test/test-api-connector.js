/**
 *
 * @author: A. Siebert, ask@touchableheroes.com
 *
 * @type {*}
 */

var assert = require( "assert" );
var api = require( "../index.js" );
var _ = require( "underscore" );

describe( 'test index.js', function() {

    describe( 'connector()', function() {
        var transformer = require( "../impl/service/response/parser-xml.js" );

        it( 'exec( --no-params )', function(done) {
            api.connector({
                url         : "http://touchableheroes.com",
                transformer : transformer
            }).read( {}, function( result ) {
               //  console.log( "---- content :: %j ", result);


                // assert.ok( _.isObject( result ) );

                done();
            });
        });
    });

});