const mongoose = require('mongoose');
const User = require('../models/user.js'); 

async function seedDatabase() {
 try {
    await mongoose.connect('mongodb://localhost:27017/socialnetworkapi', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const userData = [
      {
        username: 'bobbob',
        email: 'bobbob@gmail.com',
      }
      
    ];

    await User.insertMany(userData);

    console.log('Database seeded successfully');
 } catch (error) {
    console.error('Error seeding database:', error);
 } finally {
    await mongoose.connection.close();
 }
}

seedDatabase();