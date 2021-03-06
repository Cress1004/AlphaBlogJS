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

router.get('/:id/show', async(req, res) => {
    try {
        const current_article = await article.find(req.params.id);
        res.render('articles/show', {current_article: current_article});
    } catch(err) {
        res.json({message: err});
    }
    // id o day co the nhan bat ki gia tri nao
});


router.get('/new', async(req, res) => {
    try {
        res.render('articles/new', {});
    } catch(err){
        res.json({message: err});
    }
});

router.post('/create', async(req, res) => {
    try{
        const newArticleId = await article.create(req.body.title, req.body.description, req.body.user_id);
        res.redirect('/articles/' + newArticleId + '/show');
    } catch(err){
        res.json({message: err});
    }
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

