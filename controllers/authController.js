const User = require('../models/User')
const Category = require('../models/Category')
const Product = require('../models/product')
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect('/login')

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })

  }

}
exports.loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            req.session.userROLE = user.role
            req.session.userID = user._id
            res.status(200).redirect('/')

          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
}

exports.getSellerPage = async (req, res) => {
  const products = await Product.find({ user: req.session.userID })
  const user = await User.findOne({ _id: req.session.userID })
  const categories = await Category.find()

  res.status(200).render('myProducts', { user, products, categories })
}

exports.getMyBasketPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate('basket')

  res.status(200).render('myBasket', { user })
}

exports.getOrdersPage = async (req, res) => {

  const user = await User.findOne({ _id: req.session.userID }).populate('ordersDocument')

  await res.status(200).render('myOrders', { user })
}

exports.deleteOrder = async (req, res) => {

  const user = await User.findOne({ _id: req.session.userID }).populate('ordersDocument')


  await user.ordersDocument.pull(user.ordersDocument[req.body.customerName])
  await user.ordersDocument.pull(user.ordersDocument[req.body.customerEmail])
  await user.ordersDocument.pull(user.ordersDocument[req.body.customerAddress])
  await user.ordersDocument.pull(user.ordersDocument[req.body.productName])

  await user.save()

  await res.status(200).redirect('/myOrders')
}

