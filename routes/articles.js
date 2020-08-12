const express = require('express');
const Article = require('../models/articles');

const article = new Article();
const router = express.Router();

router.get('/', async (req, res) => {
    // res.send("We are on articles home.");
    try{
        const articles = await article.getAll();
        res.render('articles/index', {articles: articles});
    } catch(err){
        res.json({message: err});
    }
});

router.get('/:id', async(req, res) => {
    try {
        const current_article = await article.find(req.params.id);
        if(current_article == null) res.send("Error");
        res.render('articles/show', {current_article: current_article});
    } catch(err) {
        res.json({message: err});
    }
});

router.get('/new', async(req, res) => {
    try {
        res.send("creat new article");
    } catch(err){
        res.json({message: err});
    }
});

router.post('/create', async(req, res) => {
    res.send("create new article");
});

router.get('/:id/delete', async(req, res) => {
    const current_article= await article.find(req.params.id);
    if(!current_article){
        console.log("Error!");
    } else {
        const delete_article = await article.delete(current_article[0].id);
        res.send("Delete success " + delete_article.affectedRows);
    }
});

module.exports = router;

