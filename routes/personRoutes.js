const express = require('express');
const router = express.Router();
const person=require('./../models/person');

const {jwtAuthMiddleware, generateToken}= require('./../jwt');


router.post('/signup',async(req, res)=>{
    try{
        const data = req.body 

        const newPerson = new person(data);
    
       const response= await newPerson.save();
       console.log('data saved');

       const payload = {
        id: response.id,
        username: response.username
    }
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is : ", token);

    res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
})

//login Route
router.post('/login',async(req,res)=>
{
    try{
        //extract username and password from request body
    const{username,password}=req.body;
        //find the user by username
    const user = await person.findOne({username:username});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username and password'});

        }

       // generate token
        const payload ={
            id: user.id,
            username: user.username
        }
        //payload token
        
        const token =generateToken(payload);
       

        res.json({token})


    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Internel server Error T'})
    }
})
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/',jwtAuthMiddleware ,async(req,res)=>
{
    try{
        const data = await person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal Server Error'})
    }
});
router.get('/:workType', async(req,res)=>{
    try{
     const workType=req.params.workType;
     if(workType =='chef'|| workType=='waiter'|| workType=='manager'){

     const response = await person.find({work: workType});
     console.log('response fetch');
     res.status(200).json(response);
     }else{
         res.status(404).json({error: 'internal servers error' })
     }

    }catch(err){
     console.log(err);
     res.status(500).json({error: 'internal server error'});
    }
 });

 router.put('/:id', async (req , res )=>{
    try{
        const personId =req.params.id;
        const updatePersonData =req.body;

        const response = await person.findByIdAndUpdate(personId,updatePersonData ,{
            new: true,
            runValidators:true,
        })
        if(!response){
            return res.status(404).json({error: ' person not found'})
        }
        console.log('data update');
        res.status(200).json(response);

    }catch(err){

        console.log(err);
     res.status(500).json({error: 'internal server error'});
    }
 });
 router.delete('/:id',async(req,res)=>{

    try{
        const personId =req.params.id;
        const response = await person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: ' person not found'})
        }
        console.log('data delete');
        res.status(200).json({Message:'person Deleted Succesfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server Error'})
    }
 })
 


 module.exports= router;