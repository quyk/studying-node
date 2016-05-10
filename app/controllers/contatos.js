module.exports = function (app) {

    var Contato = app.models.contato;

    var controller = {}

    controller.findAll = function (req, res) {

        Contato.find().exec().then(
            function(response){
                res.json(response);
            },
            function (error) {
                console.log(error);
                res.status(500).json(error);
            }
        );

    };

    controller.findOne = function (req, res) {
        var id = req.params.id;

        Contato.findById(id).exec().then(
            function(response){
                if(!response) throw new Error("Contato não foi localizado!");
                res.json(response);
            },
            function(error){
                console.log(error);
                res.status(404).json(error);
            }
        );
    };


    controller.delete = function (req, res) {
        var id = req.params.id;

        Contato.remove({"_id": id}).exec().then(
            function(){
                // 204 means no content
                res.status(204).end();
            },
            function(error){
                console.log(error);
            }
        );

    };

    controller.create = function(req, res){
        Contato.create(req.body).then(
            function(response) {
                // 201 means that post was created
                res.status(201).json(response);
            },
            function(error) {
                console.log(error);
                res.status(500).json(error);
            }
        );
    };

    controller.update = function(req, res){
        var id = req.params.id;

        Contato.findByIdAndUpdate(id, req.body).exec().then(
            function(response) {
                res.json(response);
            },
            function(error) {
                console.error(error)
                res.status(500).json(error);
            }
        );
    };
    return controller;

}