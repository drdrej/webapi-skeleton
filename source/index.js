/**
 * API
 */

exports.server = require( "./impl/server.js" );

exports.db = function () {
    this.connection = require("./impl/db/connect.js" );
    this.schema = require( "./impl/db/schema.js" );
};
