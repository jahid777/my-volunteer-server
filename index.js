const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();




const port = 7000

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));




app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7adfu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("volunteerNetwork").collection("events");
  const uploadCollection = client.db("volunteerNetwork").collection("upload");
  

  //create data
  app.post("/addBooking",(req, res)=>{
      const newBooking = req.body;
      collection.insertOne(newBooking)
      .then(result =>{
        res.send(result.insertedCount);
      })
      // console.log(newBooking);
  });


  //ui te read data
  app.get('/eventsCard',(req, res)=>{
    // console.log(req.query.email); jarjar data se se dhakbe
    collection.find({email: req.query.email})
    .toArray((err, documents)=>{
      res.send(documents);
    })
  })

   
  //delete korer jonno registerList theke
  app.delete('/delete/:id', (req, res)=>{
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then( result =>{
      // console.log(result);
      (result.deletedCount > 0) 
    })
  })


  //getting data from input of AddEventForm
   //create data
   app.post("/addData",(req, res)=>{
    const upload = req.body;
    uploadCollection.insertOne(upload)
    .then(result =>{
      res.send(result.insertedCount > 0);
    })
});

   //home page a read korer jono upload ar data
  app.get('/homeData',(req, res)=>{
    uploadCollection.find({})
    .toArray((err, documents)=>{
      res.send(documents);
    })
  })

  
});


app.listen(port);

