const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function(passport,req,res){
 
        new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
            //match user
            User.query().findOne({email:email})
            .then((user)=>{
                if(!user){
                    return done(null,false,{message:'email not registered'});
                }
                //math passwords
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;
                    if(isMatch){
                        return done(null,user);
                    } else{
                        return done(null,false,{message: 'password incorrect'});
                    }
                })

            })
            .catch((err)=>{console.log(err)})
            res.redirect('/')
        })
     
    
    passport.serializeUser(function(user,done,res) {
       if(user)
      {  res.render('/users/dashboard');}
    })
    passport.deserializeUser(function(id,done){
        User.query().findById(id,function(err,user){
            done(err,user);
         
        })
    })
    
}