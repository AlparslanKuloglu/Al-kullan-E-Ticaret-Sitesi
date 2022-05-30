exports.getIndexPage= (req,res)=> {
    console.log(req.session.userID)
    console.log(req.session.userROLE)
    res.status(200).render('index')
}
exports.getProductsPage =(req,res)=> {
    res.status(200).render('products',products)
} 
exports.getRegisterPage =(req,res)=> {
    res.status(200).render('register')
} 

exports.getLoginPage =(req,res)=> {
    res.status(200).render('login')
} 


