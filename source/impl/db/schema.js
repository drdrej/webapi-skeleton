/**
 * Install Schema.
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */
var _ = require( "underscore" );
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Install Schema for a passed Mongo-Schema-Name.
 *
 * @param name, never NULL.
 * @returns {*} die Model-Instance, never NULL.
 */
exports.install = function ( pathPrefix, name ) {
    var SchemaType = resolveSchemaType( pathPrefix, name );
    console.log( "-- schema {name : " + name + "} installed ");

    return SchemaType;


    // -------------------------------------------
    // private methods:
    // -------------------------------------------
    function resolveSchemaType( pathPrefix, name ) {
        if( pathPrefix == null || !_.isString(pathPrefix) ) {
            pathPrefix = "../../config/database";
        }

        var path = pathPrefix + "/" + name + ".schema.json";

        var json = loadSchemaDef( name, path );
        var schemaDef = new Schema( json );

        var schemaType = mongoose.model( name, schemaDef);

        return schemaType;
    };


    function loadSchemaDef( name, path ) {
        try {
            var json = require( path );

            if( json )
                return json;

            var msg = "-- couldn't load schema. schema is empty. { path : %s , name : %s }";
            console.error( msg, path, name);

            throw new Error( msg );
        } catch ( err ) {
            console.error( "couldn't load mongo.schema.json { name : %s, path : %j }",
                name, path );
            console.error( err );

            throw err;
        }
    };

};

