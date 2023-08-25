const express=require('express');
const { addTransaction, getAllTransaction,editTransaction,deleteTransaction } = require('../controller/transactionController');
const router=express.Router();
// add transaction
router.post('/add-tansaction',addTransaction)
router.post('/edit-tansaction',editTransaction)
router.post('/delete-tansaction',deleteTransaction)


// get all transaction
router.post('/get-transaction',getAllTransaction);

module.exports=router;