const express = require('express');
const mysql = require('mysql'); 
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes: 
const usersRoute = require('./routes/users');
const articlesRoute = require('./routes/articles');

// Middlewares: 
app.use(cors());
app.use(bodyParser.json());

// Use route
app.use('/users', usersRoute);
app.use('/articles', articlesRoute);

// set path to views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render('home', {});
});
 
app.listen(3000);