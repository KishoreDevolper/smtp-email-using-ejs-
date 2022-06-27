const express = require('express');

const app = express();

const expressEjsLayout = require('express-ejs-layouts')

const session = require('express-session');

const dbsetup = require('./db/seeds/db-setup');

dbsetup();   
   
app.set('view engine','ejs');

app.use(expressEjsLayout); 

app.use(express.urlencoded({extended : false}));

app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true 
}));   
           
//Routes   
app.use('/hello',require('./routes/index'));

app.use('/',require('./routes/mail'));
  
app.listen(3001,console.log("connected"))