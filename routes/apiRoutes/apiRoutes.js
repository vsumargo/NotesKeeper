const express = require('express');
const router = express.Router();
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
// run validation functions for database file db.json
fileExists(dbPath)
.then((resp) => db = resp)
.catch(() => db = []);

//define routes for API request
router.get('/api/notes', (req,res) => {
    res.json(db);
});

router.post('/api/notes', (req,res) => {
    req.body['id'] = nanoid();
    // console.log(req.body);
    // console.log(db);
    db.push(req.body);
    // console.log(db);
    fs.writeFile(dbPath, JSON.stringify(db), 'utf-8', (err) => {
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
    db = db.filter(data => data.id !== deleteId);
    fs.writeFile(dbPath, JSON.stringify(db), 'utf-8', (err) => {
        if (err){
           throw console.log(`${err}: CANNOT saved to database`)
        }else{
            console.log(`Successfully delete ID:${deleteId} from database!`);
            res.json({success:true});
        }
    });
})

module.exports = router