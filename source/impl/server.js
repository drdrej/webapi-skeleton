/**
 * Startet den restify-Server.
 * Initialisiert die routes.
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */
var restify = require('restify');

/**
 * starts the server.
 *
 * @param path - path to routes.json
 */
exports.start = function( path, controlsPrefix ) {
    var server = restify.createServer();

    var config = load( path, './webapi-skeleton.json' );

    if( config && config.server ) {
        if( config.server.CORS )
            server.use(restify.CORS({origins: ['*']}));

        if( config.server.fullResponse)
            server.use(restify.fullResponse());

        if( config.server.bodyParser )
            server.use(restify.bodyParser());
    }
/*
    server.use(function(req, res, next) {
        if (req.query.key == null) {
            console.log("No API key supplied");
            return next(new restify.NotAuthorizedError("No API key supplied"));
        } else return next();
    });
*/

    var routes = require("./routes.js");
    routes.init( server, path, controlsPrefix );

    run(server, 8080);
};

var run = function ( server, port ) {
    server.listen(port, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
};

var load = function( path, file ) {
   return require( path + '/' + file );
};