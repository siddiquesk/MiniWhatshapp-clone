const express = require("express");
const app =express();
const mongoose = require('mongoose');
const Chat =require("./models/chat.js");
const path =require("path");
const methodOverride=require("method-override");
let port=3000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))

main().then(()=>{
  console.log("connection sucesss");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatshapp');
}
app.get("/",(req,res)=>{
  res.send("hello");
})
//index route
app.get("/chats",async (req,res)=>{
  let allchats= await Chat.find()
  console.log(allchats);
  res.render("index.ejs",{allchats});
})
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
})
app.post("/chats",(req,res)=>{
let {from,to,msg}=req.body;
let newchat=new Chat({
  from:from,
  to:to,
  msg:msg,
  created_at:new Date()
});
newchat.save().then((res)=>{

}).catch((err)=>{
  console.log(err);
})
res.redirect("/chats");
})

//edit route 
app.get("/chats/:id/edit", async (req,res)=>{
  let {id}=req.params;
 let chat= await  Chat.findById(id);

  res.render("edit.ejs",{chat});
})

app.put("/chats/:id",async (req,res)=>{
  let {id}=req.params;
  let {msg : newMsg} = req.body;
  console.log(newMsg);
  let updatechat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true, new:true});

  res.redirect("/chats");
})
app.delete("/chats/:id",async (req,res)=>{
  let {id} = req.params;
  let delchats = await Chat.findByIdAndDelete(id);

  res.redirect("/chats");
})
app.listen(port,()=>{
  console.log('server is working');
})