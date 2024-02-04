const mongoose = require('mongoose');
const User = require('../models/user.js'); 

async function seedDatabase() {
 try {
    await mongoose.connect('mongodb://localhost:27017/socialnetworkapi');

    const userData = [
      {
        username: 'bobbob',
        email: 'bobbob@gmail.com',
      },
      {
        username: 'janejane',
        email: 'janejane@gmail.com',
      },
      {
        username: 'alicealice',
        email: 'alicealice@gmail.com',
      }
      
    ];

    for (const user of userData) {
      const existingUser = await User.findOne({ username: user.username });
      if (!existingUser) {
        await User.create(user);
      } else {
        console.log(`User with username "${user.username}" already exists.`);
      }
    }

    console.log('Database seeded successfully');
 } catch (error) {
    console.error('Error seeding database:', error);
 } finally {
    await mongoose.connection.close();
 }
}

seedDatabase();