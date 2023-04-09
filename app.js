// const path=require('path');
const express= require('express');
const Register=require('./src/models/registers');
const cors = require("cors")
//const { json } = require('stream/consumers');
const app= express();
const bodyparser = require('body-parser')


require('./src/db/conn');
const port = process.env.PORT || 3030;   // either 4000 or port number
//it automatically provide port number or 4000

//const static_path=path.join(__dirname,"../public");
//const view_path=path.join(__dirname,"../views")
//console.log(path.join(__dirname,"../public")) ;                                     
//app.use(express.static(static_path)) ;  //we are going to use static html file                                        
//instead of this we use 
app.use(cors())
app.use(express.json());

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.set("view engine" , "ejs");
//app.set("view" , view_path);
app.get('/' , (req,resp)=>{
    resp.render("index");
});


app.get('/register' , (req,resp)=>{
    resp.render("register");
});

// app.post('/register',async(req,res) =>{
//   const fname = req.body.firstname
//   const lname = req.body.lastname
//   let result = new Register({
//     firstname:fname,
//     lastname:lname
//   })
//   result = await result.save()
//   console.log(result)
//   res.status(200).json({result})


// })
app.post("/register" , async (req,resp)=>{
  // resp.setHeader('Content-Type', 'text/html');
  // console.log(req.body)
   try{
      const password=req.body.password;
      const cpassword=req.body.cpassword;

      if(password===cpassword){
           const registerStudents=new Register({
             firstname:req.body.firstname,
             lastname:req.body.lastname,
             email:req.body.email,
             gender:req.body.gender,
             phone:req.body.phone,
             age:req.body.dob,
             password:req.body.password,
             confirmpassword:req.body.cpassword
           });
           
           const registered=await registerStudents.save();
           console.log(registered)
          //  resp.status(200).json(registered)
           resp.status(201).render("index");
      } 
      else{
        resp.send("Password is not matching");
      }

    //console.log(req.body.firstname);
     
   } catch(error){
    console.log(error)
    resp.status(400).send(error);
   }
    // let data=await req.body.firstname;
    // console.log(data);
    // resp.send(data);
});

app.listen(port , ()=>{
    console.log(`server is running at port no. ${port}`);
})
