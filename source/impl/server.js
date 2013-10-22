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

    server.use( restify.CORS( {origins: ['*']}) );
    server.use( restify.fullResponse() );
    server.use( restify.bodyParser() );

    var routes = require("./routes.js");
    routes.init( server, path, controlsPrefix );

    gogogo(server, 8080);
};

function gogogo( server, port ) {
    server.listen(port, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
};