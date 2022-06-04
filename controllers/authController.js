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
  const products = await Product.find({ userID: req.session.userID })
  const user = await User.findOne({ _id: req.session.userID })
  const categories = await Category.find()

  res.status(200).render('myProducts', { user, products, categories })
}

exports.getMyBasketPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate('basket')

  res.status(200).render('myBasket', { user })
}

exports.getOrdersPage = async (req, res) => {

  const user = await User.findOne({ _id: req.session.userID }).populate('orders')
 
  for (let i = 0; i < user.orders.length; i++) {
    let product = await Product.findOne({ _id: user.orders[i] })

    let customer = await User.findOne({_id: user.orders[i] })

    
    

    if (customer) {
      if(!(user.ordersDocument[i-1]===customer.name)) {
      user.ordersDocument.push(customer.name,customer.email,customer.address,)
     }
    
    }

    if (product) {
     user.ordersDocument.push(product.name)
     
    }
  
    user.save()

  }
  


  await res.status(200).render('myOrders', { user })
} 