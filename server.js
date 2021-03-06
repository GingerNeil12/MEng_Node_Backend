// Main Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const db = require('./config/keys').mongoURI;

// Route Requires
const userRoutes = require('./routes/api/user/userRoutes');
const profileRoutes = require('./routes/api/profile/profileRoutes');
const diagramRoutes = require('./routes/api/diagrams/diagramRoutes');

// Mongoose set up
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDb Connected'))
    .catch((err => console.log(err)));

// Setting up port and initialising the server
const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
});

// Setting up the body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting up to allow CORS for the development env
app.use(cors())

// Passport config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/diagram', diagramRoutes);

// Default test route
app.get('/test', (req, res) => res.json({ msg: 'Test' }));