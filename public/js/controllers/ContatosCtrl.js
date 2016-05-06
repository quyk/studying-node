angular.module('studying-node')

    .config(function($stateProvider) {
        $stateProvider
            .state('contatos', {
                url: '/contatos',
                templateUrl : 'partials/contato/contatos.html',
                controller : 'ContatosCtrl'
            })
            .state('contatos.view', {
                url: '/:id',
                templateUrl : 'partials/contato/contato-view-tpl.html',
                controller : 'ViewCtrl'
            });

    })

    .controller('ContatosCtrl',function ($scope, Contato) {

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
    .controller('ViewCtrl',function ($scope, $stateParams, Contato) {

        var id = $stateParams.id ? $stateParams.id : null ;

        Contato.one(id).get().then(
            function (response) {
                $scope.contato = response;
            },
            function (error) {
                console.log("ERRO: Contato não encontrado");
                console.log(error);
            }
        );

    })

    .factory('Contato', function(Restangular) {
        return Restangular.service('contatos');
    })


;
