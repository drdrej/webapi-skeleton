
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
    // console.log( "skip response-parser. input : " + input );

    try {
        xml.parseString( input,
            { trim :true, async : false},
            function (err, result) {
                 if( err ) {
                     console.error( "Couldn't parse xml. Return empty result.");
                     useCallback( null, callback );
                     return;
                 }

                useCallback( result, callback );
                return;
            });
    } catch( error ) {
        console.log( "couldn't parse xml: %j ", error );
        useCallback( null, callback );
        return;
    };
};