/**
 * API
 */


var CONFIG_PATH = "./config";

/**
 * to setup config-directory for the app/server.
 */
exports.useConfig = function( path ) {
    // TODO: validate!!!

    CONFIG_PATH = path;
};

exports.server = require( "./impl/server.js" );

/**
 * DB-API
 *
 * @returns DB-definition.
 */
exports.db = function ( uri ) {

    this.connect = function( callback ) {
        var connect = require("./impl/db/connect.js").connect;
        connect(uri, callback);
    };

    this.schema = require( "./impl/db/schema.js" );

    return this;
};