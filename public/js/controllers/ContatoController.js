angular.module('studying-node')

    .config(function($stateProvider) {
        $stateProvider
            .state('contatos', {
                url: '/contatos',
                templateUrl : 'partials/contato/contato-tpl.html',
                controller: function($state){
                    //$state.go('contatos.list');
                }
            })
            .state('contatos.list',{
                url: '/list',
                templateUrl : 'partials/contato/contato-list-tpl.html',
                controller : 'ContatoListCtrl'
            })
            .state('contatos.view', {
                url: '/view/:id',
                templateUrl : 'partials/contato/contato-view-tpl.html',
                controller : 'ContatoViewCtrl'
            });

    })

    .controller('ContatoListCtrl',function ($scope, Contato) {
        $scope.contatos = [];
        $scope.filtro = '';

        function buscarContatos() {
            Contato.getList().then(
                function (response) {
                    $scope.contatos = response;
                },
                function (error) {
                    console.log("ERRO: Não foi possível obter lista de contatos");
                    console.log(error);
                }
            );
        }
        buscarContatos();

        
        $scope.removerContato = function (contato) {
            Contato.one(contato._id).remove().then(
                function (response) {
                    buscarContatos();
                },
                function (error) {
                    console.log("ERRO: Não foi possível deletar o contato");
                    console.log(error);
                }
            );
        }

    })
    .controller('ContatoViewCtrl',function ($scope, $stateParams, Contato, ContatoUtils) {
        var id = $stateParams.id ? $stateParams.id : null ;

        if(id) {
            Contato.one(id).get().then(
                function (response) {
                    $scope.contato = response;
                    console.log($scope.contato);
                },
                function (error) {
                    console.log("ERRO: Contato não encontrado");
                    console.log(error);
                }
            );
        }


        $scope.salvar = function(isValid){
            if(isValid){

                var contato = id
                    ? $scope.contato
                    : ContatoUtils.getRestangularizeElement($scope.contato);

                console.log($scope.contato);

                contato.save().then(
                    function(response){
                        $scope.mensagem = {texto: "Salvo com sucesso!"};

                        // limpa o formulário
                        $scope.contato = {};
                    },
                    function(error){
                        console.log("ERRO: Não foi possível salvar o contato");
                        console.log(error);
                    }
                );

            }
        };

        Contato.getList().then(
            function(response){
                $scope.contatos = response;
                console.log(response);
            }
        );

    })
    .service('ContatoUtils', function(Restangular){
        this.getRestangularizeElement = function(contato){
            return Restangular.restangularizeElement(null, contato,'contatos');
        }
    })
    .factory('Contato', function(Restangular) {
        return Restangular.service('contatos');
    })


;
