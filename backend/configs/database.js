const mongoose = require('mongoose');

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    console.log(process.env.NODE_ENV )
    if(process.env.NODE_ENV  === 'Development'){
      await mongoose.connect(process.env.MONGODB_HOST);
    }
    else{
      await mongoose.connect(process.env.MONGODB_HOST_PROD);
    }
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
};

module.exports = connectToMongoDB;
