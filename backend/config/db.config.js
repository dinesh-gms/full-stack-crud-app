const mongoose = require('mongoose');
const uri = "mongodb://127.0.0.1:27017/studentdb";
// const uri = "mongodb+srv://dineshcena257:dineshcena412@cluster0.02p7s7a.mongodb.net/studentdb?retryWrites=true&w=majority&appName=Cluster0";

const handler = async () => {
  try {
    const con = await mongoose.connect(uri)
    if(con) console.log('mongoose connected successfully')
  }
  catch (err) {
    console.log(err);
    return;
  }
}

module.exports = handler;