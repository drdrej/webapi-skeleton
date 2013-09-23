/**
 * @author: A. Siebert, ask@touchableheroes.com
 */
var http = require( "http" );
var _ = require( "underscore" );
var URL = require( "url" );
var useCallback = require( "../util/use-callback.js").useCallback;

/**
 * to configure the endpoint/service-client and chaining.
 *
 * @param opts - never NULL.
 */
exports.config = function( opts ) {
    if( !_.isObject(opts) ) {
        throw new Error( "couldn't config backpoint-connector." );
    };

    this.useURL( opts );
    this.useTransformer( opts );

    // this.cachePath = opts.cache;


    return this;
};

exports.useURL = function( opts ) {
    var hasNoURL = !_.has(opts, "url" ) || !_.isString(opts.url);
    if( hasNoURL ) {
        throw new Error( "couldn't config. Has no URL." );
    }

    this.url = URL.parse( opts.url );

    return this;
};

exports.useTransformer = function( opts ) {
    var hasTransf = validateTransformer(opts);

    if( hasTransf ) {
        this.transformer = opts.transformer;
        return this;
    }

    this.transformer = require( "./response/parser-noop.js" );
    return this;
};



var validateTransformer = function( opts ) {
    // TODO: Transformer-validation-messaging.
    return  (
        _.has(opts, "transformer" )
            && _.isObject(opts.transformer)
            && _.has( opts.transformer, "transform" )
            && _.isFunction( opts.transformer.transform ));
}



/**
 * call the service-endpoint.
 *
 * basic-workflow :::
 * -- reads data.
 * -- parse data.
 *
 * ? -- cache data.
 * -- convert to json.
 * ? -- cache json
 *
 * -- filter json.
 * --response json to client.
 *
 * @param callback
 */
exports.exec = function( params, callback ) {
    console.log( "-- call execute: %j ", this.url );

    if( !(params && _.isObject(params)) ) {
        this.request( false, false, callback );
    } else {
        this.request( params, false, callback );
    }
};



this.buildOptions = function() {
    if( !_.isObject(this.url) ) {
        throw new Error( "Couldn't parse url. Use service.config() to pass url");
    }

    var rval = {
        host   : this.url.hostname
    };

    var hasPath = (this.url.path && _.isString(this.url.path));
    if( hasPath ) {
        rval.path = this.url.path;
    } else {
        rval.path = "/";
    }

    var hasPort = (this.url.port && _.isNumber(this.url.port));
    if( hasPort ) {
        rval.port = this.url.port;
    } else {
        rval.port = 80;
    }

    rval.method = "GET";

    console.log( "-- build http.request-options" );

    return rval;
};

// -----------------------------------------------------------
// ## private methods
// -----------------------------------------------------------
this.request = function( params, body, callback ) {
    var httpOpt = this.buildOptions();
    fillParams(httpOpt, params);

    console.log( "-- use http.options: %j ", httpOpt );

    var transformer = this.transformer;

    var httpReq = http.request( httpOpt, function( httpResp ) {
         console.log( "http.request successful." );
         handleResponse( httpResp, callback, transformer);
    });

    httpReq.on('error', function( err ) {
         handleRequestError( err, callback );
    });

    if( body && _.isString(body) ) {
        httpReq.write( body );
    }

    httpReq.end();
};


var querystring = require('querystring');
var fillParams = function( httpOpt, params ) {
    console.log( "### http.opt before manipulation ::: %j ", httpOpt);
    var queryExt = querystring.stringify( params );

    var isPathExists = (httpOpt.path && (
        (_.isString(httpOpt.path)  )
      && httpOpt.path.indexOf( "?" ) > 0 ));

    if( isPathExists )
      httpOpt.path = httpOpt.path + "&" + queryExt;
    else
      httpOpt.path = queryExt;

    console.log( "###### query.params ::: %j ", httpOpt);
};



var handleRequestError = function( error, callback ) {
    switch( error.errno)  {
        case "EADDRNOTAVAIL" : {
            console.log( "couldn't connect to endpoint. ");
            throw error;
        }
    }

    useCallback({}, callback);
};



/**
 * pipes a http-response to another stream/ call transformer
 *
 * @param response
 */
var handleResponse = function(response, callback, transformer) {
    var str = '';

    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on( 'error', function( error ) {
         console.log( "couldn't read stream from endpoint." );
         useCallback( {}, callback );
    });

    response.on('end', function () {
        console.log( "-- content successful read from stream." );
        if(_.isObject(transformer) ) {
            transformer.transform( str, callback );
        }
    });
};