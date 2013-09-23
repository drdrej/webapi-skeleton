/**
 * Hello-World control.
 *
 * @param req - request, never NULL.
 * @param res - response, never NULL.
 * @param next - never NULL.
 *
 * @author: A. Siebert, ask@touchableheroes.com
 */
exports.exec = function(req, res, next) {
    // res.contentType = 'application/json';
    //
    // res.send({ code: 200, message: 'hello ' + req.params.name });
    // res.end();

    APP.response().send( { code: 200,
                           message: 'hello ' + req.params.name },
        res );
};

