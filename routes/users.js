const express = require('express');
const User = require('../models/user');

const user = new User();
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const users = await user.getAll();
        res.render('users/index', {users:users});
    } catch(err) {
        res.json({message: err});
    }
});

router.get('/:id/show', async(req, res) => {
    try{
        const showUser = await user.find(req.params.id);
        res.render('users/show', {showUser:showUser});
    } catch(err) {
        res.json({message: err});
    }
});

router.get('/new', async(req, res) => {
    try{
        res.render('users/new', {});
    } catch(err) {
        res.json({message, err});
    }
});

router.post('/create', async(req, res) =>{
    try{
        const newUserId = await user.create(req.body.username, req.body.email, req.body.password);
        res.redirect('/users/' + newUserId + '/show');
    } catch(err) {
        res.json({message: err});
    }
});

router.get('/:id/delete', async(req, res) =>{
        const currentUser = await user.find(req.params.id);
        if(!currentUser){
            console.log("error");
        } else{
            const deleteUser = await user.delete(currentUser[0].id);
            res.send("Delete success" + deleteUser.affectedRows);
        }
});

module.exports = router;

