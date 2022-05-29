const Product = require('../models/product')
const User = require('../models/User')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const ejs = require('ejs')
const session = require('express-session');
const MongoStore = require('connect-mongo');



const fileUpload = require('express-fileupload')
const fs = require('fs')
const path=require('path')


exports.createProduct = async (req, res) => {
    const uploadDir = 'public/uploads';
  
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
  
    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;
  
    uploadeImage.mv(uploadPath, async () => {
      await Product.create({
        ...req.body,
        image: '/uploads/' + uploadeImage.name,
      });
      res.redirect('/myProducts');
    });
  };
exports.getAllProducts = async (req, res) => {

    try {
    const products = await Product.find()

        res.status(200).render('products',{
            products
        })
        

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }

} 

exports.getProduct = async (req, res) => {
console.log("ahflşdskşlsfdkfsd")
    try {
    const product = await Product.findOne({slug: req.params.slug})
    const user= await User.findOne({_id:req.params.userID})

        res.status(200).render('product',{
            product,user
        })
        

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error
        })
    }

} 

