/**
 * This module initialise the routes.
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */
var restify = require('restify');
var _ = require( 'underscore' );

/**
 * main method
 *
 * @param server never NULL.
 * @return void
 */
exports.init = function( server, path ) {
    if( path == null || !_.isString(path) ) {
        path = "../config/routes.json";
        console.log( "-- use default { path : " + path + " } to config routes" );
    }

    var config = require( path );

    var routes = config.routes;

    _.each( routes, function(route, index) {
        console.log( "-- init route [" + index + "]: " + route.entry );
        var control = load( route );
        bind(server, route, control);
    });
};

// ------------------------------------------------------------
// -- private methods :::
// ------------------------------------------------------------

/**
 * loads the implementation (called control) of a route.
 *
 * @param route, never NULL
 * @return implementation of the passed route. never NULL.
 */
function load( route, index ) {
    // checks && asserts :::

    if( !_.isObject(route) ) {
        console.error( "!! skip object." );
        return null;
    }

    var controlPath =  "./controls" + route.control + ".js";
    console.log( "-- load control by { path : " + controlPath + "}." );
    var control = require( controlPath );
    console.log( "-- control loaded");

    return control;
}


function bind( server, route, control ) {
    var entryPoint = route.entry;

    if( !_.isObject(server) ) {
        logSkip( entryPoint );
        throw new Error( "passed parameter:server is not an object." );
    }

    var method = useMethod( server, route, entryPoint, control );
    console.log( "-- bound control to { entry-point : " + entryPoint + "}" );
};



function logSkip( entryPoint ) {
    console.log(  "skip route-binding for route: " + entryPoint );
};


function useMethod( server, route, entryPoint, control ) {
    if( !_.has(route, "method" ) ) {
        console.log( "-- route { entry-point : " + entryPoint + "}" );
        return server.get( entryPoint, control.exec );
    }

    var methodName = route.method;

    if( methodName == "get" )
        return server.get( entryPoint, control.exec );

    if( methodName == "put" )
        return server.put( entryPoint, control.exec );

    if( methodName == "post" )
        return server.post( entryPoint, control.exec );

    if( methodName == "head" )
        return server.head( entryPoint, control.exec );

    if( methodName == "del" )
        return server.del( entryPoint, control.exec );

    throw new Error( "Couldn't use { method : " + methodName + " }, because it's not supported." );
};



