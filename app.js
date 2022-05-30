const express = require('express')
const session = require('express-session');
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose');
const categoryRoute=require('./routes/categoryRoute')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const path=require('path')


const productRoute = require('./routes/productRoute')
const pageRoute= require('./routes/pageRoute')
const userRoute= require('./routes/userRoute')
mongoose.connect('mongodb+srv://alparslank:12101210@cluster0.wfcgv.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs")

//Middlewares

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())



app.use('*',(req, res, next)=> {
  userIN=req.session.userID,
  userROLE=req.session.userROLE
  next()
} )
app.use('/',pageRoute )
app.use('/products',productRoute)
app.use('/users',userRoute)
app.use('/categories',categoryRoute)



const port = 3000

app.listen(port, () => {
  console.log('Sunucu port 3000de başlatıldı')

})








