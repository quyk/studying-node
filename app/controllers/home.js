module.exports = function () {
    var controller = {
        index: function(req, res){
            console.log('INDEX');
            console.log(req.user.login);
            if(req.user){
                console.log(req.user.login);
            }

            //res.render('index', {nome: 'Teste Aqui'})
        }
    };
    return controller;
}