const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/bankAppDB', {
    useNewUrlParser: true
})

const User = mongoose.model('User',{
    acno:Number,
    name:String,
    password:String,
    balance:Number,
    transactions:[]
})

module.exports={
    User
}