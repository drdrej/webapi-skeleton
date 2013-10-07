
var xml = require( "xml2js" );
var _ = require( "underscore" );
var useCallback = require( "../../util/use-callback.js").useCallback;

var iconv = require('iconv-lite');
// Check if encoding is supported
// iconv.encodingExists("us-ascii")







/**
 * returns the content of a response as a simple json
 *
 * @param input is a string
 * @param callback - for asynchronous moments.
 *
 * @returns {{input: *}}
 */
exports.transform = function( input, callback ) {
    try {
        var inputBuffer = new Buffer(input, 'win1251' /* binary */ );
        var decoded = iconv.decode(inputBuffer, 'utf8');

        // var encoded = inputBuffer.toString( "UTF-8" );
        xml.parseString( decoded,
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