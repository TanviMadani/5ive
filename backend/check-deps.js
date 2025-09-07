const mongoose = require('mongoose');
const Redis = require('ioredis');

async function checkDependencies() {
  console.log('🔍 Checking dependencies...\n');
  
  // Check MongoDB
  console.log('Checking MongoDB connection...');
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/5ive', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ MongoDB is running and accessible');
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ MongoDB is not accessible:', error.message);
    console.error('Please start MongoDB with: mongod');
    return false;
  }
  
  // Check Redis
  console.log('\nChecking Redis connection...');
  const redis = new Redis({
    host: 'localhost',
    port: 6379,
    retryDelayOnFailover: 100,
    maxRetriesPerRequest: 1
  });
  
  try {
    await redis.ping();
    console.log('✅ Redis is running and accessible');
    redis.disconnect();
  } catch (error) {
    console.error('❌ Redis is not accessible:', error.message);
    console.error('Please start Redis with: redis-server');
    return false;
  }
  
  console.log('\n🎉 All dependencies are running! You can start the server with: npm run dev');
  return true;
}

checkDependencies().catch(console.error);
