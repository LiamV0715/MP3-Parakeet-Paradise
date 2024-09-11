// DEPENDENCIES
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// CONFIGURATION
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },
  () => { console.log('connected to mongo: ', process.env.MONGO_URI); }
);

// MIDDLEWARE
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.json());

// MODELS
const db = require('./models'); // Ensure models are properly required

// ROUTES
app.get('/', (req, res) => {
  res.render('home');
});

// pets
const petsController = require('./controllers/pet-controller.js');
app.use('/pets', petsController);

// 404 Page
app.get('*', (req, res) => {
  res.send('404');
});

// LISTEN
app.listen(PORT, () => {
  console.log('open at port', PORT);
});
