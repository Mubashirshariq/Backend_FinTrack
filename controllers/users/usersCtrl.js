const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const { AppErr, appErr } = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");



//Register
const registerUserCtrl = async (req, res,next) => {
  const { fullname, password, email } = req.body;
  try {
    //check if email exist
    const userFound = await User.findOne({ email });
    if (userFound) 
    return next(new AppErr("User Already Exist",400));

   
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "success",
      fullname: user.fullname,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    next(new AppErr(error.message,500));
  }
};

//login
const userLoginCtrl = async (req, res,next) => {
  const{email,password}=req.body;
  try {
    //check if email exists
    const userFound= await User.findOne({email});
    if(!userFound) return next(new AppErr("Invalid login credentials"));


    //check if password is correct
    const isPassword=await bcrypt.compare(password,userFound.password);
    if(!isPassword)  return next(new AppErr("Invalid login credentials"));


    res.json({ 
      status:"success",
      fullname: userFound.fullname,
      id:userFound._id,
      token:generateToken(userFound._id),
    });
  } catch (error) {
    next(new AppErr(error.message,500));
  }
};

//profile
const userProfileCtrl = async (req, res,next) => {
  // To get token from the header
    
    console.log(req.user);


  try {
    const user= await User.findById(req.user).populate({
      path:"accounts",
      populate:{
        path:"transactions",
        model:"Transaction"
      },
    });
    res.json( user);
  } catch (error) {
    next(new AppErr(error.message,500));
  }
};

//delete
const deleteUserCtrl = async (req, res,next) => {
  try {
    await User.findByIdAndDelete(req.user);
    return res.status(200).json({
      status:"success",
      data:null, 
    })
    res.json({ msg: "delete route" });
  } catch (error) {
    next(new AppErr(error.message,500));
  }
};

//update
const updateUserCtrl = async (req, res,next) => {
  try {
    //check if user exists
    if(req.body.email){
    const userFound= User.findOne({email:req.body.email});
    if(userFound)  return next(new AppErr("Email is taken or you already have this email ",400));
    }
    //check if user is updating the password
    if(req.body.password){
      const salt= await bcrypt.genSalt(10)
      const hashedPassword=await bcrypt.hash(req.body.password,salt)
    
    //update the user
    const user=await User.findByIdAndUpdate(req.user,{
      password:hashedPassword,
    },{
      new:true,
      runValidators:true,
    }
    );
    //send the response
    return res.status(200).json({
      status:"success",
      data: user
    });
  }

  const user=await User.findByIdAndUpdate(req.user,req.body,{
    new:true,
    runValidators:true
  });
  //send the response
  res.status(200).json({
    status:"success",
    data: user
  });
  } catch (error) {
    next(new AppErr(error.message,500));
  }
};

module.exports = {
  registerUserCtrl,
  userLoginCtrl,
  userLoginCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
};
