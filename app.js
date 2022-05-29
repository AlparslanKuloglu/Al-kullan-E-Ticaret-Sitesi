const express = require('express')
const session = require('express-session');
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose');
const Photo = require('./models/Photo')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const path=require('path')
const photoController = require('./controllers/photoControllers');
const photo = require('./models/Photo');
const productRoute = require('./routes/productRoute')
const pageRoute= require('./routes/pageRoute')
const userRoute= require('./routes/userRoute')
mongoose.connect('mongodb+srv://alparslank:12101210@cluster0.wfcgv.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(
  session({
    secret: 'my_keyboard_cat', // Buradaki texti değiştireceğiz.
    resave: false,
    saveUninitialized: true,
  })
);
/*const MiddleWare1 = (req, res, next) => {
  console.log("MiddleWare 1");
  next()
} */

//next() metodunu eklemeseydik response dönüp duruyordu.

//Template Engines
//wiews diye bir klasör vardı o dosyanın içindeki .html uzantılı dosyaları .ejsye çevirdi hoca.
app.set("view engine", "ejs")

//Middlewares

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())


// DOSYA GÖNDERMEK         app.get('/', (req,res) => {
// path'ı require ettik    res.sendFile(path.resolve(__dirname, 'temp/index.html )) }   index.html'i   /'a gönder demiş olduk.



// ROUTES
//app.post('/photos', photoController.createPhoto )
app.use('*',(req, res, next)=> {
  userIN=req.session.userID,
  userROLE=req.session.userROLE
  next()
} )
app.use('/',pageRoute )
app.use('/products',productRoute)
app.use('/users',userRoute)



const port = 3000

app.listen(port, () => {
  console.log('Sunucu port 3000de başlatıldı')

})








