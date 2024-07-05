 const express = require('express');
const router = express.Router();
const MenuItem=require('./../models/MenuItem');
 
router.post('/',async(req,res)=>{
    try{
        const Data = req.body;

        const newMenu = new MenuItem(Data);

        const menu_data=await newMenu.save();
        console.log('Menu  items saved ');
        res.status(201).json(menu_data);

    }catch(error){
        console.error('Error creating menu Item:',error);
        res.status(500).json({error: 'internal server error'});


    }
});
router.get('/', async (req, res) => {
    try {
        const data1 = await MenuItem.find();
        console.log("data fetch menu");
        res.status(200).json(data1);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/:taste', async(req,res)=>{
    try{
        const taste=req.params.taste;
        if(taste =='sweet'|| taste == 'sour' || taste == 'spicy'){
        const response =await menuItem.find({taste:taste});
    
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
//comment added for testing
module.exports = router;