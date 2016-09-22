module.exports = function(app) {

    var Type = app.models.type;

    var controller = {}

    controller.findAll = function (req, res) {
        
        Type.find().exec().then(
            function(response){
                res.json(response);
            },

            function(error){
                res.status(500).json(error);
            }
        );

    };

    controller.findOne = function (req, res) {
        var id = req.params.id;

        Type.findById(id).exec().then(
            function(response){
                if(!response){
                    res.status(404).json("Tipo não foi localizada!");
                }
                res.json(response);
            },
            function(error){
                res.status(500).json(error);
            }
        );
    };

    controller.delete = function (req, res) {
        var id = req.params.id;

        Type.remove({"_id": id}).exec().then(
            function(){
                // 204 means no content
                res.status(204).end();
            },
            function(error){
                res.status(500).json(error);
            }
        );

    };

    controller.update = function(req, res){
        var id = req.body.id;

        Type.findByIdAndUpdate(id, req.body).exec().then(
            function(response) {
                res.json(response);
            },
            function(error) {
                res.status(500).json(error);
            }
        );
    };

    controller.create = function(req, res){

        Type.create(req.body).then(
            function(response) {
                // 201 means that post was created
                res.status(201).json(response);
            },
            function(error) {
                res.status(500).json(error);
            }
        );
    };
    return controller;
}
