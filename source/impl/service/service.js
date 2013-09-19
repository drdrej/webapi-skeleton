
var http = require( "http" );
var _ = require( "underscore" );

/**
 * to configure the endpoint/service-client and chaining.
 *
 * @param opts - never NULL.
 */
exports.config = function( opts ) {
    if( !_.isObject(opts) ) {
        throw new Error( "couldn't config backpoint-connector." );
    };

    var hasNoURL = !_.has(opts, "url" ) || !_.isString(opts.url);
    if( hasNoURL ) {
        throw new Error( "couldn't config. Has no URL." );
    }

    this.url = opts.url;
    // this.cachePath = opts.cache;

    return this;
};

/**
 * call the service-endpoint.
 *
 * basic-workflow :::
 * -- reads data.
 * -- parse data.
 * -- cache data.
 * -- convert to json.
 * -- read json.
 * -- filter json.
 *
 * @param callback
 */
exports.exec = function( params, callback ) {
    console.log( "-- call execute: " + this.url );

    var hasToExecCallback = (callback && _.isFunction(callback));
    if( hasToExecCallback ) {
        callback();
    }
};


/**
 * requests http and call a callback-method.
 *
 * @param body
 * @param callback
 */
var request = function( body, callback ) {
    var httpReq = http.request(options, callback);

    if( body && _.isString(body) ) {
        httpReq.write( body );
    } else {
        httpReq.write( "" );
    }

    httpReq.end();
};

/**
 * pipes a http-response to another stream
 * @param response
 */
var pipe = function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
        str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
        console.log(str);

        console.log( "-- apotheken/search is ready." );
    });
};

