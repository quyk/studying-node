module.exports = function(app){
    
    var controller = app.controllers.type;

    app.route('/tipo')
        .get(controller.findAll)
        .post(controller.create)
        .put(controller.update);

    app.route('/tipo/:id')
        .get(controller.findOne)
        .delete(controller.delete);
}
