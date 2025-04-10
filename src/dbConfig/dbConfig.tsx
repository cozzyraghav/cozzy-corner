import mongoose from 'mongoose';

function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
}

export default connect;
