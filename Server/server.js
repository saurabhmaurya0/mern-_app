// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Replace this with the URL of your client-side app
  credentials: true
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Registration API
app.post('/register', async (req, res) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create new user
    const newUser = new User({
      name: req.body.name,
      dob: req.body.dob,
      email: req.body.email,
      password: hashedPassword
    });

    // Save user to database
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key');

    // Return JWT and user info
    res.json({ token, user: { name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login API
app.post('/login', async (req, res) => {
  
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const passwordValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');

    // Return JWT and user info
    res.json({ token, user: { name: user.name, email: user.email, dob: user.dob } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// LogOut Api
let blacklist = [];
app.post('/logout', async (req, res) => {
  try {
    // Add the JWT to the blacklist array
    blacklist.push(req.body.token);
    res.json({ message: 'Logged out' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
