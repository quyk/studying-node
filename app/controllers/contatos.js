var contatos = [
    {_id: 1, nome: 'Contato 1', email: 'contato1@exemplo.com' },
    {_id: 2, nome: 'Contato 2', email: 'contato2@exemplo.com' },
    {_id: 3, nome: 'Contato 3', email: 'contato3@exemplo.com' },
    {_id: 4, nome: 'Contato 4', email: 'contato4@exemplo.com' },
    {_id: 5, nome: 'Contato 5', email: 'contato5@exemplo.com' },
]

module.exports = function () {

    var controller = {
        findAll: function (req, res) {
            res.json(contatos);
        },
        findOne: function (req, res) {
            var id = req.params.id;
            var contato = contatos.filter(function (contato) {
                return contato._id == id;
            })[0];

            contato ? res.json(contato) : res.status(404).send('Contato não encontrado') ;
        },
        delete: function (req, res) {
            var id = req.params.id;
            contatos = contatos.filter(function (contato) {
                return contato._id != id;
            });

            // 204 means no content
            res.status(204).end();
        }
    }

    return controller;

}