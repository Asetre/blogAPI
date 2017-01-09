const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const {BlogPosts} = require('./model')


//Create Data
BlogPosts.create('First Post', 'Hello world', 'Test Person');
BlogPosts.create('Second Post', 'Hello Again', 'Test Person');
BlogPosts.create('Whats the weather like?', 'just curious', 'Another Person');


app.use(jsonParser);

app.get('/blog-posts', function(req, res) {
    res.status(200);
    let posts = BlogPosts.get();
    res.send(posts);
});

app.post('/blog-posts', function(req, res) {
    let requiredFields = ['title', 'content', 'author'];
    for(var i = 0; i<requiredFields.length; i++){
        var field = requiredFields[i];
        if(!(field in req.body)) {
            return res.status(400).send(`Missing ${field}`);
        }
    }

    const post = BlogPosts.create(
            req.body.title, req.body.content, req.body.author);
    res.status(201).json(post);
});

app.put('/blog-posts/:id', function(req, res) {
    let requiredFields = ['id', 'title', 'content', 'author'];

    for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if(!(field in req.body)) {
            return res.status(400).send(`Missing ${field}`);
        }
    }   

    if(req.params.id != req.body.id) {
        return res.status(400).send('request path id and request body id must match');
    }

    const updatedPost = BlogPosts.update({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
    });
    res.status(204).json(updatedPost);
});

app.delete('/blog-posts/:id', (req, res) => {
    BlogPosts.delete(req.params.id)
    res.status(204).send('Deleted post');
});

let server;

function runServer() {
    server = app.listen(process.env.PORT || 8080, function() {
        console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
    });

};

function closeServer() {
    server.close();
}

if (require.main === module) {
    runServer();
}

module.exports = {runServer, app, closeServer};
