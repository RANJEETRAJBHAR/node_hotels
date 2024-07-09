//console.log("its nodejs server is running");
//function add(a,b){
//    return a+b;
//}

// var add =(a,b)=> a+b;
// var result=add(2,9);
// console.log(result);

// console.log("Ranjeet");
// (function(){
//     console.log("Ranjeet is pract");
// }())

// function callback(){
//     console.log(" now adding callback");
// }

// const add =function(a ,b ,callback){
//     var result =a+b;
//     console.log('result:'+result);
//     callback();
// }
// add(3,9,callback);
//  var fs= require('fs');
//  var os= require('os');

//  var user = os.userInfo();
//  console.log(user);
//  console.log(user.username);

//  fs.appendFile('geeting.txt','hii' + user.username +'!\n ',()=>{
//     console.log('file is created');
//  })
// const notes = require('./notes.js');
// var age =notes.age;
// var result = notes.addNumber(age+18,10);
// console.log(age);
// console.log('result is now '+result);
const express = require("express");
const app=express();
const db =require('./db');
require('dotenv').config();



const bodyParser =require('body-parser');
app.use(bodyParser.json());
const PORT =process.env.PORT || 3001;

// const person=require('./models/person');

//const menuItems = require('./models/MenuItem');

// const Menu = require("./models/Menu");
// Example of requiring person module

//const person = require('./model/Person');



app.get('/',(req,res)=>{
    res.send('Welcome to Hotel this is Menu')
});

    
    

    // app.post('/menu',async(req,res)=>{
    //     try{
    //         const Data = req.body;

    //         const newMenu = new menuItems(Data);

    //         const menu_data=await newMenu.save();
    //         console.log('Menu  items saved ');
    //         res.status(201).json(menu_data);

    //     }catch(error){
    //         console.error('Error creating menu Item:',error);
    //         res.status(500).json({error: 'internal server error'});


    //     }
    // });
    // app.get('/menu',async (req, res) => {
    //     try {
    //     // Use the Mongoose model to find all menu items in the
    //     //database
    //     const  data1 = await MenuItem.find();
    //     console.log("data fetch menu");
    //     res.status(200).json(data1);
    // } catch (error) {
    // console.error('Error fetching menu items:', error);
    // res.status(500).json({ error: 'Internal server error' });
    // }
    // });
    // app.get('/menu', async (req, res) => {
    //     try {
    //         const data1 = await menuItems.find();
    //         console.log("data fetch menu");
    //         res.status(200).json(data1);
    //     } catch (error) {
    //         console.error('Error fetching menu items:', error);
    //         res.status(500).json({ error: 'Internal server error' });
    //     }
    // });

    // app.get('/person/:workType', async(req,res)=>{
    //    try{
    //     const workType=req.params.workType;
    //     if(workType =='chef'|| workType=='waiter'|| workType=='manager'){

    //     const response = await person.find({work: workType});
    //     console.log('response fetch');
    //     res.status(200).json(response);
    //     }else{
    //         res.status(404).json({error: 'internal servers error' })
    //     }

    //    }catch(err){
    //     console.log(err);
    //     res.status(500).json({error: 'internal server error'});
    //    }
    // })

// app.get('/chicken',(req,res)=>{
//     res.send(' I loved Chicken to serve me')
// })

// app.get('/idli',(req,res)=>{
//     var customized_idli ={
//         name:'rava idli',
//         size:'10cm',
//         is_shamber:true,
//         is_chutney:false,
//     }
//     res.send(customized_idli)
// })
// app.post('/person',(req,res)=>{
//     res.send("data is saved")
// })

const personRoutes =require('./routes/personRoutes');
const menuRoutes =require('./routes/menuRoutes')

app.use('/person',personRoutes);
app.use('/menu', menuRoutes);


//const PORT =process.env.PORT || 3001;

app.listen(PORT,()=>{
    console.log("server is on 3001 port");
})
