const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://kavindudamsith9:HRB25LlOez2KKocm@nanasa.kkuzql5.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

module.exports = mongoose;