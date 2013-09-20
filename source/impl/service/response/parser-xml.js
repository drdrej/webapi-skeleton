
var xml = require( "xml2js" );
var _ = require( "underscore" );
var useCallback = require( "../../util/use-callback.js").useCallback;


/**
 * returns the content of a response as a simple json
 *
 * @param input is a string
 * @param callback - for asynchronous moments.
 *
 * @returns {{input: *}}
 */
exports.transform = function( input, callback ) {
    console.log( "skip response-parser." );

    try {
        xml.parseString( input,
            { trim :true, async : false},
            function (err, result) {
                 if( err )
                     throw err;
;
                 useCallback( result, callback );
            });
    } catch( error ) {
        console.log( "couldn't parse xml: %j ", error );
        useCallback( {}, callback );
    };
};