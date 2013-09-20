/**
 * @author: A. Siebert, ask@touchableheroes.com
 */
var _ = require( "underscore" );

exports.useCallback = function ( result, callback ) {
    var isFnc = callback && _.isFunction(callback);

    if( isFnc ) {
        callback( result );
    }
};