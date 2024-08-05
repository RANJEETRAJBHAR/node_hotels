const mongoose = require('mongoose');
const bycrpt =require('bcrypt');
//define the person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    age:{
        type: Number,
        require:true
    },
    work:{
        type: String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username : { 
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    }
});

personSchema.pre('save',async function(next){
    const person=this;

    if(!person.isModified('password')) return next();
    try{
        const salt =await bycrpt.genSalt(10);

        const hashedPassword = await bycrpt.hash(person.password,salt);

        person.password = hashedPassword;
        next();
    }catch{

    }
})

personSchema.methods.comparePassword =async function(candidatePassword){
    try{

        const isMatch =await bycrpt.compare(candidatePassword,this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}

// const person =mongoose.model('Person', personSchema);
// module.exports=person;
module.exports = mongoose.model('Person', personSchema);