
var xml = require( "xml2js" );
var _ = require( "underscore" );

/*
var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>"
parseString(xml, function (err, result) {
    console.dir(result);
});
*/


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

                console.log( "found a result!!!!!" );
                 if( _.isFunction(callback) ) {

                    callback( result );
                 }

                 return;
            });

        return;
    } catch( error ) {
        console.log( "couldn't parse xml: %j ", error );

        if( _.isFunction(callback) )
            callback( {} );
    };
};