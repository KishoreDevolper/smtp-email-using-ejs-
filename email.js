var nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host:'smtp.outlook.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:'kishore.april28@outlook.com',
        pass:'@pri/28042000'
    } 
});
var mailoptions ={
    from:'kishore.april28@outlook.com',
    to:"kishore.april28@gmail.com",
    to:"rakshenkishore1430@gmail.com",
    subject:"testing" 
}
transport.sendMail(mailoptions,(error,info)=>{
if(error){ 
    console.log("hello",error) 
}
else{
    console.log("sucess",info.response)
}
}) 