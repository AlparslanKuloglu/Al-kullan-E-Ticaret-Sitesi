const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*mongoose.connect('mongodb+srv://alparslank:12101210@cluster0.wfcgv.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});*/

//const dbUrl='mongodb://localhost:27017/pcat-dest-db'

/*mongoose.connect(dbUrl, { 
 useNewUrlParser: true, 
  useUnifiedTopology: true
}, () => { 
 console.log('connected to database myDb ;)') 
})  */

/*mongoose 
 .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err)); */



 /*mongoose.set('useUnifiedTopology', true);
 mongoose.set('useNewUrlParser', true);
 mongoose.connect("mongodb://localhost:27017")
 .then( () => console.log("connected to DB."))
 .catch( err => console.log(err)); */
 






const PhotoSchema = new Schema(
{ title: String,
    description: String,
}
)

const Photo = mongoose.model('Photo', PhotoSchema)

//create a photo

Photo.create(
{
  title:"Photo title 34",
  description: "photo descp Lorem ipsum 1233232"  
}
)

