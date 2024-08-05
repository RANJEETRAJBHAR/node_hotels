
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');


passport.use(new LocalStrategy(async(Username ,password, done)=>{

    //authentication logic here 
    try{
        //console.log('Received data:' , Username,password);
        const user = await Person.findOne({username:Username});
        if(!user)
            return done(null , false,{message:'Incorrect username'});
        const isPasswordMatch= await user.comparePassword(password);
    if(isPasswordMatch){
        return done(null , user);
    }
    else{
        return done(null, false,{message:'Password Incorrect'});
    }

    }catch(err){
        return done(err);

    }
 }));

 module.exports=passport;