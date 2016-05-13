describe('ContatoController', function(){

    var ctrl,
        $scope,
        ContatoService,
        server;

    var data = [
        {_id: 1, nome: 'fulano 1', email: 'email1@teste.com'},
        {_id: 2, nome: 'fulano 2', email: 'email2@teste.com', emergencia: 1},
        {_id: 3, nome: 'fulano 3', email: 'email3@teste.com'}
    ];

    beforeEach( function () {
        module('studying-node');
        server = sinon.fakeServer.create();
        inject(function ($controller, $injector, $q) {
            $scope = $injector.get('$rootScope').$new();

            $controller('ContatoListCtrl', {
                $scope: $scope,
                ContatoService:{
                    findAll: sinon.stub().returns( $q.when(data)),
                    findById: sinon.stub(),
                    save: sinon.stub(),
                    delete: sinon.stub()
                        .withArgs({_id: 3, nome: 'fulano 3', email: 'email3@teste.com'}).returns(
                            $q.when([
                                {_id: 1, nome: 'fulano 1', email: 'email1@teste.com'},
                                {_id: 2, nome: 'fulano 2', email: 'email2@teste.com', emergencia: 1}
                            ])
                        )
                }
            });
            $scope.$digest();

        });
    });

    afterEach(function () {
        server.restore();
    });

    it('ContatoService findAll', function () {

        server.respondWith("GET", "/contatos/list",
            [
                200,
                { "Content-Type": "application/json" },
                '{_id: 1, nome: "fulano 1", email: "email1@teste.com"}' +
                '{_id: 2, nome: "fulano 2", email: "email2@teste.com"}'
            ]);

        expect($scope.contatos.length).to.equal(3);
    });

    it('ContatoService delete', function () {



        var mockedContato = {_id: 33, nome: 'fulano 3', email: 'email3@teste.com'};
        $scope.removerContato(mockedContato);
        console.log($scope.contatos);
    });

});