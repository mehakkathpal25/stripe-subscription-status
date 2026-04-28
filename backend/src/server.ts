import express from 'express';
import pkg from 'mongodb';

const { MongoClient, ServerApiVersion } = pkg;

const app = express();
const uri = "mongodb+srv://root1:root@stripe-info-data.blxugnw.mongodb.net/?appName=stripe-info-data";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
  res.send('hello world');
});

async function connectToDB() {
  try {
    await client.connect();
    console.log("connected to database");
  }
  catch(error) {
    console.log("error connecting to database:", error);
  }
}
await connectToDB();
  
app.get('/hello',(req,res) => {
  res.send('<h1> hello from the backend </h1>');
})


app.listen(3000,(error)=>{
  if(!error){
    console.log('Server is running on port 3000');
  }
  else {
    console.log('Error occurred: ', error);
  };
})