import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import purchaseRoute from './routes/purchaseRoute.js';
import cors from 'cors';

const app = express();


app.use(express.json());


app.use(cors());




app.use('/purchases', purchaseRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
