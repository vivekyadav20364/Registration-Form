const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
 mongoose.connect('mongodb://127.0.0.1:27017/StudentRegistration').then(()=>{
    console.log(`connection sucessfull`);
 }).catch((e)=>{
    console.log(`no connection`);
 })