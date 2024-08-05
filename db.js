const mongoose=require('mongoose');
require('dotenv').config();
//const mongoUrl=process.env.MONGODB_URL;

// mongoose.connect(mongoUrl,{
//     //  useNewUrlParser : true,
//     //  useUnifiedTopology: true,
// });
 mongoose.connect('mongodb://localhost:27017/mydatabase')
 .then(() => console.log('MongoDB is connected '))
 .catch(err => console.error('MongoDB connection error:', err));

   // const mongoUrl =process.env.MONGODB_URL;

//const mongoUrl = //'mongodb+srv://ranjeetrajbhar:Ranjeet2001@cluster0.ohzsacz.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0';
//const mongoUrl = "mongodb+srv://ranjeetrajbhar:Ranjeet2001@cluster0.ohzsacz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB using Mongoose
//mongoose.connect(mongoUrl);
const db=mongoose.connection;

db.on('connected',()=>{
    console.log("mongodb is connected server")
});

db.on('error',(err)=>{
    console.error("mongodb is error", err)
});
db.on('disconnected',()=>{
    console.log("mongodb is disconnected")
});



module.exports=db;