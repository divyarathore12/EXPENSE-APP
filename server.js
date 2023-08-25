const express = require("express");
const path=require('path')
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
// nconst colors = require("colors");
dotenv.config();
const app=express();
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());
connectDb();
app.use('/api/v1/users',require('./routes/userRoutes'))
app.use('/api/v1/transactions',require('./routes/transactionRoute'))
// static files
app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
});
const PORT=8080||process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
});
