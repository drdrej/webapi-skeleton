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

exports.db = function () {
    this.connection = require("./impl/db/connect.js" );
    this.schema = require( "./impl/db/schema.js" );
};
