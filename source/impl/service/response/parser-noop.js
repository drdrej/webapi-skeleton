/**
 * returns the content of a response as a simple json
 *
 * @param input
 * @returns {{input: *}}
 */
exports.transform = function( input, callback ) {
    console.log( "skip response-parser." );

    if(_.isFunction(callback) ) {
        callback({ input : input });
    }
};
