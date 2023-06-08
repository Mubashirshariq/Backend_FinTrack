const Account = require("../../model/Account");
const Transaction = require("../../model/Transaction");
const User = require("../../model/User");
const { AppErr } = require("../../utils/appErr");




//create
const createTransactionCtrl = async (req, res,next) => {
  const  {name,amount,notes,transactionType,account,category}=req.body;
  try {
    //Find User
    const userFound=await User.findById(req.user);
    if(!userFound)  return next(new AppErr("User not found",404))
    //Find the Account
    const accountFound=await Account.findById(account);
    if(!accountFound)  return next(new AppErr("Account not found",404))
    //Create a transaction
    const transaction=await Transaction.create({
      amount,
      notes,
      account,
      transactionType,
      category,
      name,
      createdBy:req.user,
     });
   //push the  transaction into the account
   accountFound.transactions.push(transaction._id);
   //resave the Account
   await accountFound.save()
    res.json({ status:'success',data:transaction });
  } catch (error) {
    res.json(error);
  }
};

//all
const getTransactionsCtrl = async (req, res,next) => {
  try {
    const trans=await Transaction.find();
    res.status(200).json({
      status:"success",
      data:trans,
    })
  } catch (error) {
    next(new AppErr(error.message,500));
  }
};

//single
const getTransactionCtrl = async (req, res,next) => {
  try {
    const {id}=req.params;
    const tran=await Transaction.findById(id);
    res.json({ status:"success",
  data:tran });
  } catch (error) {
    next(new AppErr(error.message,500));
  }
};

//delete
const deleteTransactionCtrl = async (req, res,next) => {
  try {
    const {id}=req.params;
    await Transaction.findByIdAndDelete(id);
    res.json({ status:"success",
  data:null});
  } catch (error) {
    next(new AppErr(error.message,500));
  }
};

//update
const updateTransactionCtrl = async (req, res,next) => {
  try {
    const {id}=req.params;
    const tran=await Transaction.findByIdAndUpdate(id,req.body,{
      new: true,
      runValidators:true,
    });
    res.json({
      status:"sucess",
      data:tran,
    });
  } catch (error) {
    next(new AppErr(error.message,500));
  }
};

module.exports = {
  createTransactionCtrl,
  getTransactionsCtrl,
  getTransactionsCtrl,
  getTransactionCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
};
