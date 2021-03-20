import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('jwt env variable not defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI env variable not defined');
  }
  console.log(process.env.JWT_KEY);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('connected to db');
    app.listen(3000, () => {
      console.log('server strated on port 3000!');
    });
  } catch (e) {
    console.log(e);
  }
};

start();
