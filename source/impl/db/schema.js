/**
 * Installiert das Schema.
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * Installier das Schema zu einem vorgegebenem Schemanamen.
 *
 * @param name, der Name des Schema, nie NULL.
 * @returns {*} die Model-Instanz, nie NULL.
 */
exports.install = function ( name ) {
    var SchemaType = resolveSchemaType( name );
    console.log( "-- schema {name : " + name + "} installed ");

    return SchemaType;
};

function resolveSchemaType( name ) {
    var path = "../config/database/" + name + ".schema.json";
    var json = require( path );

    var schemaDef = new Schema( json );

    var schemaType = mongoose.model( name, schemaDef);

    return schemaType;
};