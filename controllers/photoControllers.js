const Photo = require('../models/Photo')
const photo = require('../models/Photo');


exports.getAllPhotos = async (req, res) => {

const page = req.query.page || 1    // page yoksa 1 al dedik.
const photosPerPage= 2              // 1 sayfadaki foto sayısı
const totalPhotos= await Photo.find().countDocuments()  // fotoğraf sayısını bul dedik
const photos = await Photo.find({})
.sort('-dataCreated')
.skip((page-1) *photosPerPage)
.limit(photosPerPage)



  res.render('index', {
    photos: photos,
    current:page,
    pages: Math.ceil(totalPhotos/photosPerPage)
  }) 
}

exports.getPhoto = async (req, res) => {
  const product = await Photo.findById(req.params.id)
  res.render('products', { product }) }


  exports.createPhoto = async (req, res) => {

    if(req.body.title) {await Photo.create(req.body) }
    
  
  
    if (req.files && req.body) {
      let uploadImage = req.files.image
      let uploadPath = __dirname + '/public/uploads/' + uploadImage.name
  
      uploadImage.mv(uploadPath, async () => {
  
        await Photo.create({
          ...req.body,
          image: '/uploads/' + uploadImage.name,
        });
        res.redirect('/');
      });
    }
  
    else { res.redirect('/') }
  
  }