/**
 * Install Schema.
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */
var _ = require( "underscore" );
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Install Schema for a passed Schema-Namen.
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
        var json = require( path );

        var schemaDef = new Schema( json );

        var schemaType = mongoose.model( name, schemaDef);

        return schemaType;
    };
};

