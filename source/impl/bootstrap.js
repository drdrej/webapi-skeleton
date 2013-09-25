/**
 * Basic initialisation of your server
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */

var _ = require( "underscore" );

exports.setup = function( APP, basicConfig, tables, afterSetup ) {

    // config app
    APP.setup( basicConfig );

    // init rest-interface :::
    APP.server().start();


    // init database (mongoDB) :::
    var dbFacade = APP.db();
    dbFacade.connect( function() {
        bindSchemas(tables);

        if( _.isFunction(afterSetup) ) {
            afterSetup(APP);
        } else if( _.isString(afterSetup) ) {
            console.log( "-- setup executed." );
        } else {
            console.error( "after-call ::: %j ", afterCall );
            throw new Error( "!! couldn't execute afterCall() - it's not a function." );
        }
    });


    // ########################################################
    // ##              private functions/helper
    // ########################################################

    function bindSchemas( tables ) {
        if( _.isArray(tables)  ) {
            _.each( tables, function( table ) {
                bindSchema(table);
            });
        } else if( _.isString(tables) ) {
            bindSchema( tables )
        } else {
            var msg = "!! couldn't bind schema: %j";
            console.error( msg, tables );

            throw new Error( msg );
        }
    }

    function bindSchema( table ) {
        if( !_.isString(table)) {
            var msg = "!! couldn't bind schema. passed table must be a string. you can pass an array of strings to bind many tables. { table : %j }";
            console.error( msg, table );
            throw new Error( msg );
        }

        dbFacade.schema( table );
    }

    return APP;
};