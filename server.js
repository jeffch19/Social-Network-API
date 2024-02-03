const express = require('express'); 
const mongoose = require('mongoose');
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/socialnetworkapi';

app.use(express.json());
app.use('/api', routes);


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
 }).then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
  });
 }).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
 });