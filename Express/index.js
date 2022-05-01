//Import express
const express = require('express');

const jwt = require('jsonwebtoken');

const cors = require('cors')

//Import data sevices
const dataService = require('./sevices/dataServices');

//Create an app using express
const app = express();

//Use cors to set origin
app.use(cors({
    origin:"http://localhost:4200"
}))

//JSON
app.use(express.json());

//Application specific middleware
// const logMiddleware = (req,res,next)=>{
//     console.log("logMiddleware");
//     next();
// }
// app.use(logMiddleware)

//Router level middleware for jwt verification
const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        const data = jwt.verify(token, 'superSecretKey');
        req.currentAcc = data.currentAcc;
        next()
    } catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: "Please login"
        })
    }
}

//Register
app.post('/register', (req, res) => {
    dataService.register(req.body.acno, req.body.name, req.body.password).then(result => {
        res.status(result.statusCode).json(result);
    })
})

app.post('/login', (req, res) => {
    dataService.login(req.body.acno, req.body.password).then(result => {
        res.status(result.statusCode).json(result);
    })
})

    app.post('/deposit', jwtMiddleware, (req, res) => {
        dataService.deposit(req.body.acno, req.body.password, req.body.amt).then(result => {
            res.status(result.statusCode).json(result);
        })
    })

    app.post('/withdraw', jwtMiddleware, (req, res) => {
        dataService.withdraw(req, req.body.acno, req.body.password, req.body.amt).then(result => {
            res.status(result.statusCode).json(result);
        })
    })

    app.post('/transaction', jwtMiddleware, (req, res) => {
        dataService.transaction(req.body.acno).then(result=>{
            res.status(result.statusCode).json(result);
        })
    })

    app.delete('/deleteAcc/:acno',(req,res)=>{
        dataService.deleteAcc(req.params.acno)
        .then(result=>{
            res.status(res.statusCode).json(result)
        })
    })

    //Set port for server
    app.listen(3000, () => {
        console.log("Server started at port number 3000");
    })