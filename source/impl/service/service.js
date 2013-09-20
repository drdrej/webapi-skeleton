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
    // console.log( "## " + _.has(opts, "transformer" ) );
    // console.log( "## " + _.isObject(opts.transformer) );
    // console.log( "## " + _.has( opts.transformer, "transform" ) );
    // console.log( "## " + _.isFunction( opts.transformer.transform ) );

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
    return
        _.has(opts, "transformer" )
            && _.isObject(opts.transformer)
            && _.has( opts.transformer, "transform" )
            && _.isFunction( opts.transformer.transform );
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
        rval.port = "/";
    }

    rval.method = "GET";
    rval.port = 80;
    rval.query = {
        'call' : 'true'
    }

    console.log( "-- build http.request-options" );

    return rval;
};

// -----------------------------------------------------------
// ## private methods
// -----------------------------------------------------------
this.request = function( params, body, callback ) {
    var httpOpt = this.buildOptions();

    var httpReq = http.request( httpOpt, function( httpResp ) {
         console.log( "http.request successful." );
         handleResponse( httpResp, callback, this.transformer);
    });

    httpReq.on('error', function( err ) {
         handleRequestError( err, callback );
    });

    if( body && _.isString(body) ) {
        httpReq.write( body );
    }

    httpReq.end();
};


var handleRequestError = function( error, callback ) {
    switch( error.errno)  {
        case "EADDRNOTAVAIL" : {
            console.log( "couldn't connect to endpoint. ");
            throw error;
        }
    }

    useCallback(callback);
};



/**
 * pipes a http-response to another stream/ call transformer
 *
 * @param response
 */
var handleResponse = function(response, callback, transformer) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on( 'error', function( error ) {
         console.log( "couldn't read stream from endpoint." );
         transformer.transform( str, callback );
        // useCallback( callback );
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
        useCallback( callback );
    });
};


//
