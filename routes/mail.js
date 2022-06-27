const User = require('../models/user')

const category = require('../models/category');

const biling = require("../models/billing");

const topup = require("../models/topup");

const network = require('../models/network');

const express = require("express");

const nodemailer = require('nodemailer');

const router = express.Router();

const fs = require('fs') 

const ejs = require("ejs") 

//category
router.get('/' ,async(req,res)=>{
    
    await category.query().column('category_name').from('category').then(user=>{
     res.render('category',{data:user})  
     })
})
router.post('/category',async(req,res)=>{
    const {category} = req.body
    
    console.log(category)

  if(category == "Network"){
    await network.query().column('name').from('network').then(net=>{
        res.render('networksub',{result:net})
    })
  }

  else if(category == "Topup"){
    await topup.query().column('name').from('topup').then(top=>{
        res.render('topupeub',{result:top})
    })
        res.render('topupeub')
  }

  else if(category == 'Billing'){
    await biling.query().column('name').from('billing').then(bill=>{
        res.render('billingsub',{result:bill})     
    })
    
  }
 else{
         res.render('error')
  }
   
})
//billing
router.post('/Billing' ,async(req,res)=>{
  
  const {subcategory_name,name,email,password} = req.body

  console.log("testing =>",name,subcategory_name,email)

  if(!subcategory_name || !name || !email || !password){
  
    res.render('inputvalidation')
 }
    
    //Did not receive physical bill

   if(subcategory_name == 'Did not receive physical bill'){

    var transport = nodemailer.createTransport({
      host:'smtp.outlook.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
          user:email,
          pass:password
      } 
  
    });

    const data = await ejs.renderFile(__dirname + "/sucess.ejs",{name:name,contact_details:email,issue:"Biling",specified:subcategory_name})
    
    const mailoptions ={
      from:email,
      to:"kishore.april28@gmail.com",
      to:"rakshenkishore1430@gmail.com",
      subject:subcategory_name,
      html:data
  }

  transport.sendMail(mailoptions,(error,info)=>{
  
    if(error){

      console.log("Mail error =>",error)
    }
   else
   {
      console.log("mail sucess",info.response)
   }
  })
  
  const acknowledge = {
      from:email,
       to:email,
      subject:"application submitted sucessfully",
      text:"your application submitted sucessfully"
  }

  transport.sendMail(acknowledge,(error,info)=>{
    
    if(error){
    
      console.log(error)
    
    }
    else{

    console.log("acknowledgment=>",info.response)
    
  }
  
})  
    res.render("sucess") 
   }

   //Did not receive e-bill

   else if(subcategory_name == "Did not receive e-bill"){
    var transport = nodemailer.createTransport({
      host:'smtp.outlook.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
          user:email,
          pass:password
      } 
  });
  const data = await ejs.renderFile(__dirname + "/sucess.ejs",{name:name,contact_details:email,issue:"Billing",specified:subcategory_name})
  const mailoptions ={
    from:email,
    to:"kishore.april28@gmail.com",
    to:"rakshenkishore1430@gmail.com",
    subject:subcategory_name,
    html:data
    
}
    transport.sendMail(mailoptions,(error,info)=>{
     if(error){ 
      console.log("Mail error =>",error)
    }
     else{
     console.log("mail sucess",info.response)
 }
})
  const acknowledge = {
    from:email,
    to:email,
    subject:"application submitted sucessfully",
    text:"your application submitted sucessfully"
  }
  transport.sendMail(acknowledge,(error,info)=>{
    if(error){
    console.log(error)
    }
    else{
    console.log("acknowledgment=>",info.response)
    }
     }) 
     res.render("sucess.ejs") 
     
   }
   //Incorrect charges

   else if(subcategory_name == "Incorrect charges"){

    var transport = nodemailer.createTransport({
      host:'smtp.outlook.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
          user:email,
          pass:password
      } 
  });
  const data = await ejs.renderFile(__dirname + "/sucess.ejs" ,{name:name,contact_details:email,issue:"Billing",specified:subcategory_name})
  const mailoptions ={
    from:email,
    to:"kishore.april28@gmail.com",
    to:"rakshenkishore1430@gmail.com",
    subject:subcategory_name,
    html:data
         
}
transport.sendMail(mailoptions,(error,info)=>{
if(error){ 
    console.log("Mail error =>",error)
}
else{
    console.log("mail sucess",info.response)
}
})
  const acknowledge = {
    from:email,
    to:email,
    subject:"application submitted sucessfully",
    text:"your application submitted sucessfully"
  }
  transport.sendMail(acknowledge,(error,info)=>{
    if(error){
    console.log(error)
    }
    else{
    console.log("acknowledgment=>",info.response)
    }
     })  
     res.render('sucess.ejs')
   }
      res.render('error.ejs')
  })

  //topup

router.post('/Topup' ,async(req,res)=>{
    
  const {subcategory_name,name,email,password} = req.body

   console.log("testing =>" , subcategory_name,name,email,password)
  
   if(subcategory_name =="Top Up value not reflected"){
  
    var transport = nodemailer.createTransport({
      host:'smtp.outlook.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
          user:email,
          pass:password
      } 
  });
    const data = await ejs.renderFile(__dirname + "/sucess.ejs", {name:name,contact_details:email,issue:"Topup",specified:subcategory_name})
  
    const mailoptions ={
      from:email,
      to:"kishore.april28@gmail.com",
      subject:subcategory_name,
      html:data
        
}

    transport.sendMail(mailoptions,(error,info)=>{
     if(error){ 
     console.log("Mail error =>",error)
   }
    else{
      console.log("mail sucess",info.response)
    }
})   

  const acknowledge = {
    from:email,
    to:email,
    subject:"application submitted sucessfully",
    text:"your application submitted sucessfully"
  }
  transport.sendMail(acknowledge,(error,info)=>{
    if(error){
    console.log(error)
    }
    else{
    console.log("acknowledgment=>",info.response)
    }
     })  
     res.render("sucess.ejs")
   }
   //Unable to Top Up

   else if(subcategory_name == "Unable to Top Up"){
   
    var transport = nodemailer.createTransport({
      host:'smtp.outlook.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
          user:email,
          pass:password
      } 
  });
  
  const data  = await ejs.renderFile(__dirname + "/sucess.ejs",{name:name,contact_details:email,issue:"Topup",specified:subcategory_name})
  
  const mailoptions ={
    from:email,
    to:"kishore.april28@gmail.com",
    to:"rakshenkishore1430@gmail.com",
    subject:subcategory_name,
    html : data    
}

transport.sendMail(mailoptions,(error,info)=>{
   if(error){ 
     console.log("Mail error =>",error)
  }
  else{
    console.log("mail sucess",info.response)
}
})   

  const acknowledge = {
    from:email,
    to:email,
    subject:"application submitted sucessfully",
    text:"your application submitted sucessfully"
  }
  transport.sendMail(acknowledge,(error,info)=>{
    if(error){
    console.log(error)
    }
    else{
    console.log("acknowledgmwnt=>",info.response)
    }
     })  
     res.render("sucess.ejs")
   }

   //Top Up voucher locked
   else if(subcategory_name =="Top Up voucher locked"){
    var transport = nodemailer.createTransport({
      host:'smtp.outlook.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
          user:email,
          pass:password
      } 
  });
  
  const data = await ejs.renderFile(__dirname + "/sucess.ejs",{name:name,contact_details:email,issue:"Topup",specified:subcategory_name})
  
  const mailoptions ={
    from:email,
    to:"kishore.april28@gmail.com",
    to:"rakshenkishore1430@gmail.com",
    subject:subcategory_name,
    html:data    
}
    transport.sendMail(mailoptions,(error,info)=>{
    if(error){ 
     console.log("Mail error =>",error)
   }
   else{
    console.log("mail sucess",info.response)
  }
})

   const acknowledge = {
    from:email,
    to:email,
    subject:"application submitted sucessfully",
    text:"your application submitted sucessfully"
  }
  transport.sendMail(acknowledge,(error,info)=>{
    if(error){
    console.log(error)
    }
    else{
    console.log("acknowledgemnt=>",info.response)
    }
     })  
     res.render('sucess.ejs')
   }
   else
   {res.render("error.ejs")}
  })

//networks

router.post('/networks' ,async(req,res)=>{
  
  const {name,subcategory_name,email,password} = req.body
  
   console.log("testing =>" ,name,subcategory_name,email)

   //no service

   if(subcategory_name == "No service"){

    var transport = nodemailer.createTransport({
      host:'smtp.outlook.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
          user:email,
          pass:password
      } 
  });
  
  const data =await ejs.renderFile(__dirname + "/sucess.ejs", {name:name,contact_details:email,issue:"Network",specified:subcategory_name})  
    
  const mailoptions = {
      from:email,
      to:"kishore.april28@gmail.com",
      to:"rakshenkishore1430@gmail.com",
      subject:subcategory_name,
      html:data 
              
  }

  transport.sendMail(mailoptions,(error,info)=>{
  
    if(error){ 
      console.log("Mail error =>",error)
  }

  else{
      console.log(" mail sucess",info.response)
  }
  })
  const acknowledge = {
    from:email,
    to:email,
    subject:"application submitted sucessfully",
    text:"your application submitted sucessfully"
  }
  transport.sendMail(acknowledge,(error,info)=>{
    if(error){
    console.log(error)
    }
    else{
    console.log("acknowledgement=>",info.response)
    }
     })
     
  res.render('sucess')
   }
   //Unable to call
   else if(subcategory_name == "Unable to call"){
    var transport = nodemailer.createTransport({
      host:'smtp.outlook.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
          user:email,
          pass:password
      } 
  });
  const data = await ejs.renderFile(__dirname + "/sucess.ejs" ,{name:name,contact_details:email,issue:"Network",specified:subcategory_name})
  const mailoptions ={
      from:email,
      to:"rakshenkishore1430@gmail.com",
      subject:subcategory_name,
      html:data   
  }
  transport.sendMail(mailoptions,(error,info)=>{
  if(error){ 
      console.log("Mail error =>",error)
  }
  else{
      console.log("mail sucess",info.response)
  }
  })   
  const acknowledgement = {
    from:email,
    to:email,
    subject:"application submitted sucessfully",
    text:"your application submitted sucessfully",
  }
  transport.sendMail(acknowledgement,(err,info)=>{
    if(err){
      console.log(err)
    }
    else{
      console.log("acknowledgemnt =>",info.response)
    }
  })
  res.render('sucess.ejs')
  }
//Slow connection

  else if(subcategory_name == "Slow connection"){
    var transport = nodemailer.createTransport({
      host:'smtp.outlook.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
          user:email,
          pass:password
      } 
  });
  const data = await ejs.renderFile(__dirname + "/sucess.ejs",{name:name,contact_details:email,issue:"Network",specified:subcategory_name})

  let mailoptions ={
    from:email,
    to:"rakshenkishore1430@gmail.com",
    subject:subcategory_name,
    html:data
}
transport.sendMail(mailoptions,(error,info)=>{
if(error){ 
    console.log("Mail error =>",error)
}
else{
    console.log("mail sucess",info.response)
}
})   
  let acknowledge = {
    from:email,
    to:email,
    subject:"application submitted sucessfully",
    text:"your application submitted sucessfully"
  }
  transport.sendMail(acknowledge,(error,info)=>{
    if(error){
    console.log(error)
    }
    else{
    console.log("acknowledgement=>",info.response)
    }
     }) 
     res.render("sucess.ejs")
  }
  //Unable to receive call

  else if(subcategory_name == "Unable to receive call"){
    var transport = nodemailer.createTransport({
      host:'smtp.outlook.com',
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
          user:email,
          pass:password
      } 
  });
  const data = await ejs.renderFile(__dirname + "/sucess.ejs" ,{name:name,contact_details:email,issue:"Network",specified:subcategory_name})
  const mailoptions ={
      from:email,
      to:"kishore.april28@gmail.com",
      to:"rakshenkishore1430@gmail.com",
      subject:subcategory_name,
      html:data
    }
    transport.sendMail(mailoptions,(error,info)=>{
      if(error){ 
          console.log("Mail error =>",error)
      }
      else{
          console.log("mail sucess",info.response)
      }
      })
  const acknowledge = {
    from:email,
    to:email,
    subject:"application submitted sucessfully",
    text:"your application submitted sucessfully"
  }
  transport.sendMail(acknowledge,(error,info)=>{
    if(error){
    console.log(error)
    }
    else{
    console.log("acknowledgement=>",info.response)
    }
     })  
    res.render('sucess.ejs')
  }

  //Unable to connect
  else if(subcategory_name == "Unable to connect")  {
     var transport = nodemailer.createTransport({
      host:"smtp.outlook.com",
      port:587,
      secure:false,
      requireTLS:true,
      auth:{
        user:email,
        pass:password
      }
     });
     const data = await ejs.renderFile(__dirname+"/sucess.ejs",{name:name,contact_details:email,issue:"Network",specified:subcategory_name})
     const mailoptions = {
      from:email,
      to:"rakshekishore1430@gmail.com",
      subject:subcategory_name,
      html:data
     }
     transport.sendMail(mailoptions,(err,infor)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log("mail sucess",infor.response)
      }
      
     })
     const acknowledgement = {
      from:email,
      to:email,
      subject:"application submitted sucessfully",
      text:"your application submitted sucessfully"
    }
    transport.sendMail(acknowledgement,(err,info)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log("acknowledgement",info.response)
      }
    })
     res.render("sucess.ejs")
  }
  else { 
    res.render('error')
  }

})

module.exports = router