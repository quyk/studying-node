module.exports = function () {
    var controller = {
        index: function(req, res){
            res.render('index', {nome: 'Teste Aqui'})
        }
    };
    return controller;
}