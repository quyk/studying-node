'use strict'

var assert = require('assert');
var should = require('chai').should();
var expect = require('chai').expect();
var mongoose = require('mongoose');

var Type = require('../../server/models/type')();

describe('Type Model', function() {
    before(function(done){
        mongoose.connect('mongodb://localhost/numap-dev');
        Type.remove().exec();
        done();
    });

    it("should be empty", function(done){
        Type.count({}, function(err, response){
            should.not.exist(err);
            response.should.equal(0);
            done();
        });
    });

    describe('Create()', function() {
        it("should create when valid", function(done) {
            var type = {nome : "Restaurante", icon: "/lib/image/restaurante.png"};
            Type.create(type, function(err, response) {
                should.not.exist(err);
                response.nome.should.equal("Restaurante");
                done();
            });
        });

        it("should create when invalid", function(){
            var type = {};
            Type.create(type, function(err, response) {
                should.exec(err);
                done();
            })
        });

        it("should have just on register", function(done){
            Type.count({}, function(err, response) {
                should.not.exist(err);
                response.should.equal(1);
                done();
            })
        });
    });
});
