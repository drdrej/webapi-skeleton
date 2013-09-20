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
        var transformer = api.load().transformer().xml;

        it( 'transformer().xml', function(done) {
            assert.ok( _.isObject(transformer) );

            done();
        });

    });

});