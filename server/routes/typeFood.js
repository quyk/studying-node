module.exports = function(app){
    
    var controller = app.controllers.type;

    app.route('/tipoComida')
        .get(controller.findAll)
        .post(controller.create)
        .put(controller.update);

    app.route('/tipoComida/:id')
        .get(controller.findOne)
        .delete(controller.delete);
}
