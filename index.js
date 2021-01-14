const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;


const port = 7000

const app = express();
app.use(cors());
app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({ extended: false }));




app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = "mongodb+srv://volunteer:volunteer123@cluster0.7adfu.mongodb.net/volunteerNetwork?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("volunteerNetwork").collection("events");
  console.log('database connected');
  app.post("/addBooking",(req, res)=>{
      const newBooking = req.body;
      console.log(newBooking);
  })
  
});


app.listen(port);

// app.listen(5000, () => {
//   console.log('Example app listening at http://localhost:5000')
// })