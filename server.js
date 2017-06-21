const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 5000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', hbs);
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrYear', () => {
	return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method}; ${req.url} \n`
	console.log(log);
	fs.appendFile('server.log', log, (err) => {
		if(err){
			console.log("Could not append to log file");
		}
	})
	next();
});

app.get('/index/html', (req,res) => {
	res.send("<h3>Hello Express </h3>:-)");
});

app.get('/about', (req,res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/projects', (req,res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects Page'
	});
});

app.get('', (req,res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		pageMessage: 'Welcome to my world of express and handlebars'
	});
});

app.get('/index/json', (req,res) => {
	res.send({
		name: 'Elango',
		age: 'still young'
		})
});

app.listen(port, () => {
	console.log(`server is up on ${port} and on dir: ${__dirname}`);
});