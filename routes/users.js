const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("We are on users page.");
})

module.exports = router;