const express = require('express');
const app = express();

const router = require('./routes/routes.js');

const PORT = 8000;

app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(PORT,() => console.log(`Server is running on PORT:${PORT}`));
