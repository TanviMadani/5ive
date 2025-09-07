const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const envContent = `# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/5ive

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Server Configuration
PORT=5000
NODE_ENV=development
`;

console.log('Setting up environment variables...');

if (fs.existsSync(envPath)) {
  console.log('.env file already exists. Skipping creation.');
} else {
  fs.writeFileSync(envPath, envContent);
  console.log('.env file created successfully!');
  console.log('Please review and modify the values as needed.');
}

console.log('\nNext steps:');
console.log('1. Make sure MongoDB is running on localhost:27017');
console.log('2. Make sure Redis is running on localhost:6379');
console.log('3. Start the backend server with: npm run dev');
console.log('4. Start the frontend with: npm run dev (from frontend directory)');
