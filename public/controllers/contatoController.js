angular.module('studying-node')

    .config(function($stateProvider) {
        $stateProvider
            .state('index.contatos.list', {
                url: '/list'
            })
            .state('index.contatos',{
                url: 'contatos',
                views: {
                    'content@':{
                        templateUrl: 'views/contato/contato-list-tpl.html',
                        controller: 'ContatoListCtrl'
                    }
                }
            })
            .state('index.contatos.view', {
                url: '/view/:id',
                views: {
                    'content@':{
                        templateUrl: 'views/contato/contato-view-tpl.html',
                        controller: 'ContatoViewCtrl'
                    }
                }
            });

    })

    .controller('ContatoListCtrl',function ($scope, $state, ContatoService) {

        $scope.contatos = [];
        $scope.filtro = '';

        var findAll = function () {
            ContatoService.findAll().then(
                function (response) {
                    $scope.contatos = response.data;
                },
                function (error) {
                    $scope.mensagem = {erro: error};
                }
            );

        }
        findAll();

        $scope.removerContato = function (contato) {
            ContatoService.delete(contato._id).then(
                function (response) {
                    findAll();
                },
                function (error) {
                    $scope.mensagem = {texto: 'ERRO: Não foi possível deletar o contato', erro: error};
                }
            );
        };

    })
    .controller('ContatoViewCtrl',function ($scope, $stateParams, ContatoService) {
        var _id = $stateParams.id ? $stateParams.id : null ;

        if(_id) {
            ContatoService.findById(_id).then(
                function (response) {
                    $scope.contato = response;
                },
                function (error) {
                    $scope.mensagem = {erro: error};
                }
            );
        }


        $scope.salvar = function(isValid){
            if(isValid){
                ContatoService.save($scope.contato).then(
                    function (response) {
                        $scope.mensagem = {texto: "Salvo com sucesso!"};
                        $scope.contato = {};
                    },
                    function (error) {
                        $scope.mensagem = {texto: "ERRO: Não foi possível salvar o contato", erro: error};
                    }
                );
            }
        };

        ContatoService.findAll().then(
            function (response) {
                $scope.contatos = response;
            },
            function (error) {
                $scope.mensagem = {erro: error};
            }
        );


    })

    .factory('ContatoService', function ($q, Restangular, Contato) {

        var deferred = $q.defer();

        return{
            findAll: function () {
                return Contato.getList().then(
                    function (response) {
                        //callback(null, response);
                        //return $q.when(response);
                        deferred.resolve(response);
                        return deferred.promise;
                    },
                    function (error) {
                        //callback(error, null);
                        deferred.reject(error);
                        return deferred.promise;
                    }
                );
            },
            findById: function (_id) {
                return Contato.one(_id).get().then(
                    function (response) {
                        return $q.when(response);
                    },
                    function (error) {
                        deferred.reject(error);
                        return deferred.promise;
                    }
                );
            },
            save: function (contato) {
                var contato = contato._id
                    ? contato
                    : Restangular.restangularizeElement(null, contato,'contatos');

                return contato.save().then(
                    function(response){
                        deferred.resolve(response);
                        return deferred.promise;
                    },
                    function(error){
                        deferred.reject(error);
                        return deferred.promise;
                    }
                );
            },
            delete: function (_id) {
                return Contato.one(_id).remove().then(
                    function (response) {
                        return $q.when(response);
                    },
                    function (error) {
                        deferred.reject(error);
                        return deferred.promise;
                    }
                );
            }
        }
    })

    .factory('Contato', function(Restangular) {
        return Restangular.service('contatos');
    })


;
