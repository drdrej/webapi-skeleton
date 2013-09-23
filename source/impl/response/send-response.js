/**
 * Simple send-response.
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */

var _ = require( "underscore" );

/**
 * Default-search-result
 * @returns {{code: number, result: Array}}
 */
var defaultResult = function() {
    return {
        code: 200,
        result: []
    };
};

exports.send = function(msg, response) {
    if( !( msg && _.isObject(msg)) )
       msg = defaultResult();

    response.contentType = 'application/json';
    response.send(msg);

    response.end();
}
