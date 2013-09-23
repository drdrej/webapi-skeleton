/*
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */

var _ = require("underscore");


/**
 * Basic-REST-Endpoint-Wrapper.
 *
 * @param req never NULL.
 * @param res never NULL.
 */
exports.wrap = function ( impl ) {

    // this.impl = impl;

    // -------------------------------------------
    // ## instance-methods.
    // -------------------------------------------
    this.exec = function( req, res ) {
        console.log( "call exec" );

        this.impl(req, res);
    };

    // impl neu zuweisen :::
    this.impl = function( params ) {
        this.result(req, res).success( {} );
    };


    /**
     * overwrite to build params.
     *
     * @param req
     * @returns {*}
     */
    this.catchParams =  function( req ) {
        return req.params;
    };

    function defaultResult() {
        return {
            code: 200,
            result: []
        };
    };

    /**
     * this method will be called after this control is executed.
     */
    this.lifecycle = require( "wrapper-lifecycle.js" );

    return this;
};






