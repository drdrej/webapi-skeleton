/**
 * this method will be called after this control is executed.
 */
exports.result = function(res, req) {

    this.finish = function( msg ) {
        if (!msg)
            msg = defaultResult();

        res.contentType = 'application/json';
        res.send(msg);
        res.end();
    };

    this.success = function(msg) {
        var msg = {
            code : 200,
            result : []
        };

        this.finish( res, msg );
    };

    this.error = function (err, res) {
        this.finish(res, null);
    }

    return this;
};