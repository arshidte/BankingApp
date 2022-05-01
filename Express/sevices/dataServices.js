const jwt = require('jsonwebtoken')
const db = require('./db')

database = {
    1000: { acno: 1000, name: "Arshid", password: 1000, balance: 5000, transactions: [] },
    1001: { acno: 1001, name: "Diyan", password: 1001, balance: 6000, transactions: [] },
    1002: { acno: 1002, name: "Asmin", password: 1002, balance: 9000, transactions: [] },
}

const register = (acno, name, password) => {

    return db.User.findOne({ acno }).then(user => {
        if (user) {
            return {
                statusCode: 422,
                status: false,
                message: "User already exists. Please login!"
            }
        } else {
            const newUser = new db.User({
                acno,
                name,
                password,
                balance: 0,
                transactions: []
            })
            newUser.save();
            return {
                statusCode: 200,
                status: true,
                message: "Successfully registered"
            }
        }
    })
}

const login = (acno, password) => {

    return db.User.findOne({
        acno,
        password
    }).then(user => {
        if (user) {
            userName = user.name;

            currentAcno = acno;

            token = jwt.sign({
                currentAcc: acno,
            }, 'superSecretKey');

            return {
                statusCode: 200,
                status: true,
                message: "Successfully logged in",
                userName,
                currentAcno,
                token
            }

        } else {

            return {
                statusCode: 422,
                status: false,
                message: "Wrong password"
            }

        }
    })
}

//DEPOSIT
const deposit = (acno, password, amt) => {

    var amount = parseInt(amt);

    return db.User.findOne({acno,password}).then(user=>{
        if(user){
            user.balance += amount;
            user.transactions.push({
                amount: amount,
                type: "CREDIT"
            })
            user.save()
            return {
                statusCode: 200,
                status: true,
                message: "Successfully deposited " + amount,
                balance: user.balance
            }
        }else{
            return {
                statusCode: 422,
                status: false,
                message: "Wrong credentials!"
            }
        }
    })
}

//WITHDRAW
const withdraw = (req, acno, password, amt) => {

    var amount = parseInt(amt);
    currentAcc = req.currentAcc;

    return db.User.findOne({acno,password}).then(user=>{
        if(currentAcc !== acno){
            return {
                statusCode: 422,
                status: false,
                message: "Operation denied"
            }
        }
        if(user){
            if (user.balance > amount) {
                user.balance -= amount;
                user.transactions.push({
                    amount: amount,
                    type: "DEBIT"
                })
                user.save();
                return {
                    statusCode: 200,
                    status: true,
                    message: "Successfully withdrawn " + amount,
                    balance: user.balance
                }
            }else{
                return {
                    statusCode: 422,
                    status: false,
                    message: "Insufficient balance"
                };
            }
        }else{
            return {
                statusCode: 422,
                status: false,
                message: "Wrong credentials"
            };
        }
    })
}

//TRANSACTION

const transaction = (acno) => {

    return db.User.findOne({acno}).then(user=>{
        if(user){
            return {
                statusCode: 200,
                status: true,
                transaction: user.transactions
            }
        }else{
            return {
                statusCode: 422,
                status: false,
                message: "Invalid account number"
            }
        }
    })
}

const deleteAcc = (acno)=>{
    return db.User.deleteOne({
        acno
    })
    .then(user=>{
        if(user){
            return{
                statusCode:200,
                status:true,
                message:"Account deleted successfully"
            }
        }else{
            return {
                statusCode: 422,
                status: false,
                message: "Invalid credentials"
            }
        }
    })
}

module.exports = {
    register,
    login,
    deposit,
    withdraw,
    transaction,
    deleteAcc
}