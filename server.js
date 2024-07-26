require('dotenv').config()
const express = require("express")
const MongoClient = require('mongodb').MongoClient
//var mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const path = require("path")
const { error } = require("console")
const PORT = process.env.PORT || 8000
const DB_STRING = process.env.DB_STRING
const { ObjectId } = require('mongodb')


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname , 'public')))
app.set('view engine', 'ejs')


MongoClient.connect(DB_STRING, {useUnifiedTopology: true })
.then(client => {
  const db = client.db('book-lib')
  const bookCollection = db.collection('books')

  app.get("/", (req, res) => {
    res.render('index', { PORT: PORT});
  });
  
  
  app.post("/bookmark", (req, res) => {
      const { title, author, image, link } = req.body;
      bookCollection.insertOne({title, author, image, link})
      .then(result=>{
        console.log(result)
        res.redirect("/bookmark")
      })
      .catch(error =>{
        console.log(error)
    })
    });
  
  
  app.get("/bookmark", (req,res)=>{
      const cursor = bookCollection.find().toArray()
      .then(results=>{
        res.render('bookmarked.ejs', {books:results})
      })
      .catch(error =>{
        console.log(error)
    })
  }) 
  
  app.delete("/bookmark", (req, res) => {
        const { _id } = req.body
        console.log(_id)

        bookCollection.deleteOne({_id: new ObjectId(_id)})
        .then(result => {
            res.json({deletedId: _id })
        })
        .catch(error => {
            console.error(error)
        })
    })

  app.listen(PORT, function(){
      console.log(`Listening on ${PORT}`)
  })
})
.catch(error => console.error(error))

 