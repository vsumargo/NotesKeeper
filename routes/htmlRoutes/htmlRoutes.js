const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/notes',(req,res) => {
    const resPath = path.join(__dirname,'..','..','public','notes.html');
    res.sendFile(resPath);
});

router.get('*',(req,res) => {
    const resPath = path.join(__dirname,'..','..','public','index.html');
    res.sendFile(resPath);
});

module.exports = router;