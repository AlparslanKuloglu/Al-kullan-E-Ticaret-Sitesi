
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const Schema = mongoose.Schema
const slugify = require('slugify');

const ProductSchema = new Schema({
    name: {
        type: String

    },
    description: {
        type: String,
        required: false 
    },
    price: {
        type: String,
        required: false
    },

    stok: {
        type: String,
        required: false
    },
    image: {
        type: String
    },
    category: {
        type:String
    },
    slug: {
        type: String,

    },    
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      }
}
)

ProductSchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true
    })
    next()

})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product