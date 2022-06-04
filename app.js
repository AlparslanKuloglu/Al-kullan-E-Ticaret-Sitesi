const express = require('express')
const session = require('express-session');
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const fileUpload = require('express-fileupload')
const fs = require('fs')
const path=require('path')
const methodOverride=require('method-override')

const categoryRoute= require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute')
const pageRoute= require('./routes/pageRoute')
const userRoute= require('./routes/userRoute')
const orderRoute = require('./routes/orderRoute')
mongoose.connect('mongodb+srv://alparslank:12101210@cluster0.wfcgv.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Middlewares

app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://alparslank:12101210@cluster0.wfcgv.mongodb.net/test' }),
  })
);

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);


app.set("view engine", "ejs")



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
app.use('/categories', categoryRoute);
app.use('/myOrders', orderRoute );


const port = 3000

app.listen(port, () => {
  console.log('Sunucu port 3000de başlatıldı')

})








