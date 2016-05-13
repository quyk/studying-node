describe('ContatoController', function(){

    var ctrl,
        $scope,
        ContatoService;

    beforeEach( function () {
        module('studying-node');
        inject(function ($controller, $injector, $q) {
            $scope = $injector.get('$rootScope').$new();

            $controller('ContatoListCtrl', {
                $scope: $scope,
                ContatoService:{
                    findAll: sinon.stub().returns( $q.when([{_id: 1, nome: 'fulano 1', email: 'email1@teste.com'}])),
                    findById: sinon.stub(),
                    save: sinon.stub(),
                    delete: sinon.stub(),
                }
            });
            $scope.$digest();

        });
    });

    it('ContatoService findAll', function () {
        expect($scope.contatos.length).to.equal(1);
    });

});