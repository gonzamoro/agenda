'use strict'

var
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    saltRounds = 10,

    User = require('./models/user-model')

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
    
    function encryptPassword (password, newUser){

		    bcrypt.genSalt(saltRounds, (err,salt)=>{
			if (err ) throw err
			bcrypt.hash(password, salt, (err,hash)=>{
				if (err ) throw err
                //console.log(hash)  
                newUser.password = hash 
                newUser.save()                             
                return hash
              })
            })
    }

    function comparePassword (req,password, email, done){
            //console.log(email, password)
            User.findOne({email: email}, function(err,user){
                if(err) throw err
                //console.log(user.password)
                bcrypt.compare(password, user.password, function(err,res) {
                  //console.log(user.password)
                 if(err) throw err
                 //console.log(res)
                 if(!res){
                  return done(null, false, req.flash('signinMessage', 'contraseña incorrecta.'));
                 }
                 return done(null, user);
                    //return res
             } )
            })
}





    //////////////////SIGNUP/////////////////////////////
    
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email,password, done){
        User.findOne({email: email}, function(err,user){
            if(err)return done(err)
            if(user){
                return done(null, false, req.flash('signupMessage', 'El email ya existe.'))
            }else{
                const newUser = new User()
                newUser.email = email
                encryptPassword(password, newUser)                
                newUser.save()
                console.log(newUser.password)
                done(null, newUser)
              }
            }

    )}))
 
 
    /////////////////LOGIN/////////////////////


 passport.use('local-signin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) return done(err)
        if (!user) {
          return done(null, false, req.flash('signinMessage', 'email incorrecto.'));
        }
        comparePassword(req,password, email,done)
      });
    }
  ));

