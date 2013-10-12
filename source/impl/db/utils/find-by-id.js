/**
 * @author: A. Siebert, ask@touchableheroes.com
 */

var _ = require( "underscore" );


var RSVP = require( "rsvp" );
var when = function( promised ) {
    return new RSVP.Promise( promised );
};



/**
 *
 * @param db - mongoose-db/-connection
 * @param schemaName - string, name of schema
 * @param id - string, id of an object (used as _id in mongodb)
 * @param isValidInput - function to
 * @param isValidResult - function to validate Result, returns Boolean
 * @param mapResult - function to map result, returns Object.
 *
 * @returns {promise}
 */
exports.exec = function( db, schemaName, id, isValidInput, isValidResult, mapResult ) {
    checkParams(db, schemaName, id, isValidInput, isValidResult, mapResult);

    return when(
        function (resolve, reject) {
            var Model = db.schema( schemaName );

            if( isValidId(id) ) {
                console.error( "!! id is invalid: " + id );
                return reject( "INVALID_ID" );
            }


            try {
                Model.findOne( {_id : id })
                    .exec(function (err, found) {
                        if (err) {
                            console.error("!! couldn't find "+ schemaName + "for { _id : %j }", found );
                            console.error("!! exception: %j", err);

                            return reject( ERR_NOT_FOUND );
                        }

                        if (isValidResult(found)) {
                            console.log("-- found " + schemaName + "for { _id : %j }", found );

                            var rval = found;
                            if( mapResult && _.isFunction(mapResult) ) {
                                rval = mapResult(found);
                            }

                            return resolve( rval );
                        } else {
                            console.error("!! couldn't find appoints for member { account: %j, member-refId : %j, }", login, memberRefId );

                            return reject( ERR_NOT_FOUND );
                        }
                    });
            } catch (error) {
                console.error("!! couldn't find member { login: %j, member-refId : %j, }", login, memberRefId);
                console.log("!! excpetion: %j ", exception);

                return reject( ERR_NOT_FOUND );
            }
        });
};


var checkParams = function( db, schemaName, id, isValidInput, isValidResult, mapResult ) {
    if( !_.isObject(db) ) {
        console.error( "!! param:db must be an object. but is : %j", db );
        throw new Error( "INVALID_PARAM: db" );
    }

    if( !_.isString( schemaName ) ) {
        console.error( "!! param:schemaName must be a string. but is : %j", schemaName );
        throw new Error( "INVALID_PARAM: schemaName" );
    }

    if( !_.isString( id ) ) {
        console.error( "!! param:id must be a string. but is : %j", schemaName );
        throw new Error( "INVALID_PARAM: id" );
    }

    if( !(_.isFunction( isValidInput ) || _.isNull(isValidInput)) ) {
        console.error( "!! param:isValidInput must be a string. but is : %j", isValidInput );
        throw new Error( "INVALID_PARAM: isValidInput" );
    }


    if( !(_.isFunction( isValidResult ) || _.isNull(isValidResult)) ) {
        console.error( "!! param:isValidResult must be a string. but is : %j", isValidResult );
        throw new Error( "INVALID_PARAM: isValidResult" );
    }

    if( !(_.isFunction(mapResult) || _.isNull(mapResult)) ) {
        console.error( "!! param:mapResult must be a string. but is : %j", mapResult );
        throw new Error( "INVALID_PARAM: mapResult" );
    }

};