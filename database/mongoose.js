const mongoose = require("mongoose");
const connectString = "mongodb://heroku_ffvktxhh:9asvo3fhlp9la4a6n9qomb0enr@ds155192.mlab.com:55192/heroku_ffvktxhh";
mongoose.connect(connectString, {useNewUrlParser:true},()=>{
    console.log(`Database connect to ${connectString}`);
})

require("./model");