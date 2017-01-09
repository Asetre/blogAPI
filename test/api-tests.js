const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const {BlogPosts} = require('../model');
const {runServer, app, closeServer} = require('../server');

chai.use(chaiHttp);

function seedDatabase() {
    BlogPosts.create('First Post', 'Hello world', 'Test Person');
    BlogPosts.create('Second Post', 'Hello Again', 'Test Person');
    BlogPosts.create('Whats the weather like?', 'just curious', 'Another Person');
}

describe('API requests', function(){

    before(function() {
        runServer();
        seedDatabase();
    });        

    after(function() {
        closeServer();
    });

    describe('GET endpoint', function() {

        it('Should get all posts', function(){
            return chai.request(app)
                .get('/blog-posts')
                .then(function(res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    res.body.length.should.be.above(0);
                    res.body.forEach(function(item) {
                        item.should.be.a('object');
                        item.should.have.all.keys('id', 'title', 'content', 'author', 'publishDate');
                    });
                });            
        });
    });

    describe('POST endpoint', function() {
        it('should create a new post', function() {
            const newPost = {
                title: 'newTitle',
                content: 'some content',
                author: 'BizzBang'
            }
            return chai.request(app)
                .post('/blog-posts')
                .send(newPost)
                .then(function(res) {
                    res.should.have.status(201);
                    res.body.title.should.equal(newPost.title);
                    res.body.title.should.be.a('string');
                    res.body.content.should.equal(newPost.content);
                    res.body.content.should.be.a('string');
                    res.body.author.should.equal(newPost.author);
                    res.body.author.should.be.a('string');
                });
        });
    });
});

