describe('ContatoController', function(){

    var ctrl,
        $scope,
        ContatoService,
        defer;

    var data = [
        {_id: 1, nome: 'fulano 1', email: 'email1@teste.com'},
        {_id: 2, nome: 'fulano 2', email: 'email2@teste.com', emergencia: 1},
        {_id: 3, nome: 'fulano 3', email: 'email3@teste.com'}
    ];

    // inject module
    beforeEach(function () {
        module('studying-node');
    });

    //inject $scope
    beforeEach(function () {
        inject(function ($controller, $injector, $q) {
            $scope = $injector.get('$rootScope').$new();

            defer = $q.defer;

            var service = {
                findAll: sinon.stub().returns( $q.when(data)),
                findById: sinon.stub(),
                save: sinon.stub(),
                delete: sinon.stub().returns($q.resolve())
            }

            $controller('ContatoListCtrl', {$scope: $scope, ContatoService: service});


        });
    });



    it('ContatoListCtrl', function () {

        expect($scope.contatos).to.be.empty;
        expect($scope.filtro).to.be.empty;

        $scope.$digest();

        expect($scope.contatos).to.have.lengthOf(3);
        expect($scope.mensagem).to.be.undefined;

        $scope.removerContato({}).then(function () {
            
        });

    });



});