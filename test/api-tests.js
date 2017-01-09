const chai = require('chai');
const chai-http = require('chai-http');
const should = chai.should();

const {BlogPosts} = require('../model');
const {runServer, app, closeServer} = require('../server');

chai.use(chai-http);

describe('GET endpoint', function(){

    before(function() {
        runServer();
    });        

    after(function() {
        closeServer();
    });

    it('Should get all posts', function(){
        

    });

});

