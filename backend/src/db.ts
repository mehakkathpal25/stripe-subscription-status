import express from 'express';
import pkg from 'mongodb';
const { MongoClient, ServerApiVersion } = pkg;

const app = express();
const uri = "mongodb+srv://root1:root@stripe-info-data.blxugnw.mongodb.net/?appName=stripe-info-data";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});