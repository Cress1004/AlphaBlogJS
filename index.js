const express = require('express');
const mysql = require('mysql'); 
const app = express();
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

app.get("/", function(req, res){
    res.send("Home page");
})
 
app.listen(3000);