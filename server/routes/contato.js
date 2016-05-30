module.exports = function (app) {
    var controller = app.controllers.contatos;
    var authService = require('../services/authService');

    app.route('/contatos')
        .get(controller.findAll)
        .post( controller.create)
        .put(controller.update);

    app.route('/contatos/:id')
        .get( controller.findOne)
        .delete( controller.delete);


}