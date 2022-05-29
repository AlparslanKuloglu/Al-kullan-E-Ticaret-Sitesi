const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt=require('bcrypt')


const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type:String,
        required:true
    },
    basket:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
      }],
    role:{
        type: String,
        enum:["Customer", "Seller", "Admin"],
        default: "Customer"
      }

})

UserSchema.pre('save',function(next){
    const user=this
    bcrypt.hash(user.password, 10,(error,hash) =>{
        user.password=hash
        next()
    } )
}
)


const User = mongoose.model('User', UserSchema)
module.exports = User