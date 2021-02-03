const express = require('express');
const router = express.Router();
// const db = require('../../db/db.json') || [];
const {nanoid} = require('nanoid');
const fs = require('fs');
const path = require('path');

// validation to ensure if db.json file doesnt exist, the server will still works
let db;
const dbPath = path.join(__dirname,'..','..','db','db.json')
const fileExists = (file) => {
    return new Promise((resolve, reject) => {
        fs.access(file, fs.constants.F_OK, (err) => {
            if(err) {
                reject(db) ;
            }else{
                db = require(file);
                resolve(db);
                
            }
        });
    })
}
fileExists(dbPath)
.then((resp) => {
    db = resp;
    console.log(db);
})
.catch(() => db = []);



router.get('/api/notes', (req,res) => {
    res.json(db);
});

router.post('/api/notes', (req,res) => {
    req.body['id'] = nanoid();
    // console.log(req.body);
    // console.log(db);
    db.push(req.body);
    // console.log(db);
    const filePath = path.join(__dirname,'..','..','db','db.json')
    fs.writeFile(filePath, JSON.stringify(db), 'utf-8', (err) => {
        if (err){
           throw console.log(`${err}: CANNOT saved to database`)
        }else{
            console.log('Successfully saved to database!');
            res.json({success:true});
        }
    });
})

router.delete('/api/notes/:id', (req,res) => {
    const deleteId = req.params.id;
    
})

module.exports = router