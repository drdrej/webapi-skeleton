/**
 * Hello-World-Basis-Test.
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */

var assert = require("assert");
var restify = require( "restify" );

var client = restify.createJsonClient({
    version: '*',
    url: 'http://127.0.0.1:8080'
});

describe( 'service: hello', function() {

    describe('call hello world - ok - check', function() {
        it('should get a 200 response', function(done) {
            client.get('/hello/world', function(err, req, res, data) {
                if (err)
                    throw new Error(err);

                assert.equal( 200, data.code );
                assert.equal( "hello world", data.message );

                done();
            });
        });
    });

});