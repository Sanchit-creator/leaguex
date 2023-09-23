const mongoose = require('mongoose');

const conn_url = 'mongodb://0.0.0.0:27017/leaguex'

const db = mongoose.connect(
    conn_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('Mongo DB Connected Successfully'))
.catch((err) => {console.log(err)})

// Define the getQuestions() function
function getQuestions() {
  const questions = db.collection('questions').find().toArray();
  return questions;
}

module.exports = db;