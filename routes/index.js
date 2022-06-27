const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth') 
//login page

router.get('/', (req,res)=>{
    res.render('category');
})

module.exports = router;   