/**
 * @author: A. Siebert, ask@touchableheroes.com
 */

var mongoose = require('mongoose');
var _ = require( "underscore" );

exports.connect = function ( url, callback ) {
    if( url == null || !_.isString(url) ) {
        throw new Error( "passed {url : " + url + "} is not a string" );
    }

    mongoose.connect( url );

    var db = mongoose.connection;
    db.on(' error',
        console.error.bind(console,
            'connection error:'));

    db.once('open', function callback () {
        console.log( "-- open connection successful." );

        if( callback && _.isFunction(callback) )
            callback( db );
    });
}