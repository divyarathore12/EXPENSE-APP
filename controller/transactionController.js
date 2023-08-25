const transactionModel = require("../models/transactionModel");
const moment=require('moment')

const getAllTransaction=async(req,res)=>{
try{
    const {frequency,selecteddate,type}=req.body
    const transaction=await transactionModel.find({
       ...(frequency!=='custom'?{
        date:
        {
 $gt:moment().subtract(Number(frequency),'d').toDate(),
        },
       }:{
        date:
        {
            $gte:selecteddate[0],
            $lte:selecteddate[1]
        }
       }),
        userid:req.body.userid,
        ...(type!=='all'&&{type}),
    });
    res.status(200).json(transaction);
}
catch(error)
{
    console.log(error);
    res.status(500).json(error);
}
}
const editTransaction=async(req,res)=>{
    try{
await transactionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload);
res.status(200).send('edit successfully')
    }
catch(error){
console.log(error);
res.status(500).json(error);
}
}

const deleteTransaction=async(req,res)=>{
    try{
         await transactionModel.findOneAndDelete({_id:req.body.transactionId})
         res.status(200).send("Transaction Deleted SuccessFully")
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }

}
const addTransaction=async(req,res)=>{
    try{
        const newTransaction=new transactionModel(req.body);
        await newTransaction.save();
  res.status(202).send('transection created')

    }
    catch(error){
        console.log(error);
        res.status(500).json(error);

    }

}
module.exports={getAllTransaction,editTransaction,deleteTransaction,addTransaction};