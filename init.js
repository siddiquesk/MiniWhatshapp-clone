const mongoose = require('mongoose');
const Chat =require("./models/chat.js");

main().then(()=>{
  console.log("connection sucesss");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatshapp');
}


let allChats=[
  {
    from:"kareem",
    to:"talib",
    msg:"share your instagram id",
    created_at:new Date(),
    },
    {
      from:"sufiyan",
      to:"mirza motu",
      msg:"send me your result",
      created_at:new Date(),
      },
      {
        from:"kumar",
        to:"yogender",
        msg:"tell me holiday of college",
        created_at:new Date(),
        },
    {
          from:"laila",
          to:"majnu",
          msg:"I hate you",
          created_at:new Date(),
   },
]

Chat.insertMany(allChats);