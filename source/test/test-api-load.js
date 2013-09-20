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

    describe( 'load()', function() {
        var transformer = require( "../impl/service/response/parser-xml.js" );

        it( 'transformer().xml', function(done) {
            var transformer = api.load().transformer().xml;
            assert.ok( _.isObject(transformer) );

            done();
        });

    });

});