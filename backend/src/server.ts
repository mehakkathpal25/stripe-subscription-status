import express from 'express';
import pkg from 'mongodb';
import router from './routes/userRoutes.ts';
import authRouter from './routes/authRoutes.ts';


const { MongoClient, ServerApiVersion } = pkg;

const app = express();
const uri = "mongodb+srv://root1:root@stripe-info-data.blxugnw.mongodb.net/?appName=stripe-info-data";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
  tlsInsecure: true
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

app.use(express.json());
app.use('/users',router);
app.use('/auth', authRouter);
app.listen(4000,(error)=>{
  if(!error){
    console.log('Server is running on port 4000');
  }
  else {
    console.log('Error occurred: ', error);
  };
})