const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const {BlogPosts} = require('./model')


//Create Data
BlogPosts.create('First Post', 'Hello world', 'Test Person');
BlogPosts.create('Second Post', 'Hello Again', 'Test Person');
BlogPosts.create('Whats the weather like?', 'just curious', 'Another Person')

app.get('/blog-posts', function(req, res) {
	res.send(BlogPosts.get());

});

app.post('/blog-posts', jsonParser, function(req, res) {
	// const requiredFields = ['title', 'content', 'author'];
	// for( let i=0; i<requiredFields.length; i++) {
	// 	const field = requiredFields[i];
	// 	if(!(field in req.body)) {
	// 		const message = 'Missing ' + field + ' in request body';
	// 		console.error(message);
	// 		return res.status(400).send(message);
	// 	}
	// }

	const post = BlogPosts.create(
		{title: req.body.name, content: req.body.content, author: req.body.author})
});

app.delete('/blog-posts/:id', (req, res) => {
	BlogPosts.delete(req.params.id)
})









app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
