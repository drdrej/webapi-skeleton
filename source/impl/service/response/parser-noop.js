/**
 * returns the content of a response as a simple json
 *
 * @param input
 * @returns {{input: *}}
 */
exports.transform = function( input ) {
    console.log( "skip response-parser." );

    return {
        input : input
    };
};
