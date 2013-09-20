var useCallback = require( "../../util/use-callback").useCallback;


/**
 * returns the content of a response as a simple json
 *
 * @param input
 * @returns {{input: *}}
 */
exports.transform = function( input, callback ) {
    console.log( "skip response-parser." );

    useCallback( { input : input }, callback );
};
