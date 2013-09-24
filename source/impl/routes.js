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
 * @param config - path to config-folder.
 * @param controls - path to controls-folder.
 *
 * @return void
 */
exports.init = function( server, routesPrefix, controlsPrefix ) {
    var path = "";

    if( routesPrefix == null || !_.isString(routesPrefix) ) {
        path = "../config/routes.json";
    } else {
        path = routesPrefix + "/routes.json";
    }

    console.log( "-- use { path : " + path + " } to config routes." );

    var config = require( path );

    var routes = config.routes;

    _.each( routes, function(route, index) {
        console.log( "-- init route [" + index + "]: " + route.entry );
        var control = load( route, index, controlsPrefix );
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
 * @param index
 * @param controls - path to controls-folder. never NULL
 *
 * @return implementation of the passed route. never NULL.
 */
function load( route, index, controls ) {
    // checks && asserts :::

    if( !_.isObject(route) ) {
        console.error( "!! skip object." );
        return null;
    }

    var pathPrefix;

    if( controls == null || !_.isString(controls) )
        pathPrefix =  "./controls";
    else
        pathPrefix = controls;

    var controlPath =  pathPrefix + route.control + ".js";
    console.log( "-- load control by { path : " + controlPath + "}." );

    return loadControl( controlPath );
}

function loadControl( path ) {
    try {
        var control = require( path );
        console.log( "-- control loaded: " + path);

        validateControl( control );

        return control;
    } catch( err ) {
        console.error( "!! couldn't load control { path : " + path + " }");
        throw err;
    }
};

function validateControl ( control ) {
    if( !_.isObject(control) ) {
        var msg = "!! couldn't load control. loaded control is not an object.";
        console.error( msg );

        throw new Error(msg);
    }

    if( !_.isFunction(control.exec) ) {
        var msg = "!! couldn't load control. control needs a function exec(request, response, callback).";
        console.error( msg );

        throw new Error(msg);
    }
};



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



