'use strict'

var assert = require('assert');
var should = require('chai').should();
var expect = require('chai').expect();
var mongoose = require('mongoose');

var TypeFood = require('../../server/models/typeFood')();

describe('Type Model', function() {
    before(function(done){
        mongoose.connect('mongodb://localhost/numap-dev');
        TypeFood.remove().exec();
        done();
    });

    it("should be empty", function(done){
        TypeFood.count({}, function(err, response){
            should.not.exist(err);
            response.should.equal(0);
            done();
        });
    });

    describe('Create()', function() {
        it("should create when valid", function(done) {
            var type = {nome : "Mexicana"};
            TypeFood.create(type, function(err, response) {
                should.not.exist(err);
                response.nome.should.equal("Mexicana");
                done();
            });
        });

        it("should create when invalid", function(){
            var type = {};
            TypeFood.create(type, function(err, response) {
                should.exec(err);
                done();
            })
        });

        it("should have just on register", function(done){
            TypeFood.count({}, function(err, response) {
                should.not.exist(err);
                response.should.equal(1);
                done();
            })
        });
    });
});
