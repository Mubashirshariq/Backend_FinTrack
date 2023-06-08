const mongoose=require('mongoose')


//dbConnect

const dbConnect= async()=>{
    try {
        await mongoose.connect('mongodb+srv://mubashirsharik01:8491913249@income-expenses-app.hhumbm9.mongodb.net/?retryWrites=true&w=majority')
        console.log('db connected successfully');
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

dbConnect();