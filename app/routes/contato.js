module.exports = function (app) {
    var controller = app.controllers.contatos;

    app.route('/contatos')
        .get(controller.findAll);

    app.route('/contatos/:id')
        .get(controller.findOne)
        .delete(controller.delete);


}