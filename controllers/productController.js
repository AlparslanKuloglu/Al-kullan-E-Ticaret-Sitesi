const Product = require('../models/product')
const Category = require('../models/Category')
const User = require('../models/User')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const path = require('path')


exports.createProduct = async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Product.create({
      name: req.body.name,
      description: req.body.description,
      stok: req.body.stok,
      price: req.body.price,
      category: req.body.category,
      user: req.session.userID,
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/myProducts');
  });
};
exports.getAllProducts = async (req, res) => {

  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug })

    let filter = {};


    if (categorySlug) {
      filter = { category: category.name }
    }


    const products = await Product.find(filter)
    const categories = await Category.find()
    res.status(200).render('products', {
      products, categories
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
    const product = await Product.findOne({ slug: req.params.slug }).populate('user')

    res.status(200).render('product', {
      product
    })


  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }

}



exports.addToBasket = async (req, res) => {

  try {

    console.log("sepet")
    const user = await User.findById(req.session.userID);
    console.log("user alındı")
    await user.basket.push({ _id: req.body.product_id });
    console.log("push")
    await user.save();

    res.status(200).redirect('/');
  }



  catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.Order = async (req, res) => {

  var user = await User.findById(req.session.userID).populate('basket')

  for (let i = 0; i < user.basket.length; i) {
    let seller = await User.findOne({ _id: user.basket[0].user._id })
    await seller.ordersDocument.push(user.name, user.email, user.address)
    await seller.ordersDocument.push(user.basket[0].name)
    await user.basket.pull({ _id: user.basket[0]._id })
    await user.save()
    await seller.save()
  }

  await console.log(user.basket.length)
  await res.status(200).redirect('/myBasket');


};






exports.releaseProduct = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.basket.pull({ _id: req.body.product_id });
    await user.save();

    res.status(200).redirect('/myBasket');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};






exports.deleteProduct = async (req, res) => {
  try {

    const product = await Product.findOneAndRemove({ slug: req.params.slug })


    res.status(200).redirect('/myProducts');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};


