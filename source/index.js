/**
 * API
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */


// ---------------------------------------------------
// imports
// ---------------------------------------------------
var _ = require( "underscore" );


/**
 * Config of this APP before you use/start it.
 *
 *
 * @type {{}}
 */
var CONFIG = {};

/**
 * to setup config-directory for the app/server.
 *
 * @param path to config folder.
 */
exports.setup = function( options ) {
    if( !_.isObject(options) ) {
        throw new Error( "couldn't setup app. options must be an object." );
    }

    if( !_.isString(options.config) )
        throw new Error( "couldn't setup app. options should set a config-path. ");

    CONFIG.path  = options.config;
    console.log( "-- use { path: " + CONFIG.path + "} to config app.");

    if( !_.isString(options.controls) )
        throw new Error( "couldn't setup app. options should set a controls-path. ");

    CONFIG.controls = options.controls;
    console.log( "-- use { controls: " + CONFIG.controls + "} to config controls-path." );

    CONFIG.schema =  options.schema;
    CONFIG.mongodb = options.mongodb;
};

exports.server = function () {
    this.start = function() {
       var startServer = require( "./impl/server.js").start;
        path, controlsPrefix;
        startServer( CONFIG.path, CONFIG.controls );
    };
}

/**
 * DB-API
 *
 * @returns DB-definition.
 */
exports.db = function () {
    checkIsSetupReady();

    var uri = CONFIG.mongodb;
    var schemaConfigPathPrefix = CONFIG.schema;

    this.connect = function( callback ) {
        var connect = require("./impl/db/connect.js").connect;
        connect(uri, callback);
    };

    this.schema = function( name ) {
        var schemaImpl = require( "./impl/db/schema.js").install;


        console.log( "schema created :::: %j ", schemaImpl );
        return schemaImpl( schemaConfigPathPrefix, name );

        return null;
    }

    return this;
};


/**
 * Validate configuration before use it.
 */
function checkIsSetupReady( ) {
   // if(_.isObject(CONFIG) )
   // TODO: implement different checks to keep config consistent.
   // MOTIVATION: to know bugs before as early as possible.
};


