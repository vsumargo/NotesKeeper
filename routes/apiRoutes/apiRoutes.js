const express = require('express');
const router = express.Router();
const db = require('../../db/db.json')


router.get('/api/notes', (req,res) => {
    res.json(...db);
});

router.post('/api/notes', (req,res) => {
    console.log(req.body);
    res.json({success:true})
})

module.exports = router