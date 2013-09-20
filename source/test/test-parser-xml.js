/**
 * @author: A. Siebert, ask@touchableheroes.com
 */

var assert = require( "assert" );
var service = require( "../impl/service/response/parser-xml.js" );

describe( 'test parser-xml', function() {

    describe( 'parse input', function() {
        var transformer;

        before( function( done ) {
            transformer = require( "../impl/service/response/parser-xml.js" );
            done();
        });

        it( 'useTransformer( noop )', function(done) {

            transformer.transform( "<hello><firstname>Andreas</firstname><lastname>Siebert</lastname></hello>", function( json ) {
                console.log( "-- transformed::: %j ", json );

                assert.ok( (json.hello) );
                assert.ok( (json.hello.firstname) );
                assert.ok( (json.hello.lastname.length == 1) );
                assert.ok( (json.hello.firstname[0] == "Andreas") );

                assert.ok( (json.hello.lastname) );
                assert.ok( (json.hello.lastname.length = 1) );
                assert.ok( (json.hello.lastname[0] == "Siebert") );

                done();
            });

        });
    });

});