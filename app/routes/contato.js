function verificarAutenticacao(req, res, next){
    if(req.isAuthenticated()){
      return next();
  } else {
      res.status('401').json('Acesso não autorizado');
  }
};

module.exports = function (app) {
    var controller = app.controllers.contatos;

    app.route('/contatos')
        .get(verificarAutenticacao, controller.findAll)
        .post(verificarAutenticacao, controller.create)
        .put(verificarAutenticacao, controller.update);

    app.route('/contatos/:id')
        .get(verificarAutenticacao, controller.findOne)
        .delete(verificarAutenticacao, controller.delete);


}