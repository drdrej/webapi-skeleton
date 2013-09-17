/**
 * @author: A. Siebert, ask@touchableheroes.com
 */

var mongoose = require('mongoose');
var _ = require( "underscore" );

exports.connect = function ( url, isReady ) {
    if( url == null || !_.isString(url) ) {
        throw new Error( "passed {url : " + url + "} is not a string" );
    }

    mongoose.connect( url );

    var db = mongoose.connection;
    db.on(' error',
        console.error.bind(console,
            'connection error:'));

    db.once('open', function () {
        console.log( "-- DB connected." );

        if( isReady && _.isFunction(isReady) )
            isReady();
    });
}