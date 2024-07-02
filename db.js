const mongoose=require('mongoose');

// const mongoUrl='mongodb://localhost:27017//Hotel';

// mongoose.connect(mongoUrl,{
//     //  useNewUrlParser : true,
//     //  useUnifiedTopology: true,
// });
mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const db=mongoose.connection;

db.on('connected',()=>{
    console.log("mongodb is connected")
});

db.on('error',(err)=>{
    console.error("mongodb is error", err)
});
db.on('disconnected',()=>{
    console.log("mongodb is disconnected")
});



module.exports=db;