//import UserModel from '../models/UserModel.js'; // Import the renamed model

import { User, User3, Property } from '../models/UserModel.js';


export const test = (req, res) => {
    res.json({
        massage: 'User Route is working'
    });
}; //create a route for the router




// Controller for User (userSchema1)
export const createUser = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;

    const newUser = new User({ username, email, password, avatar });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Controller for User3 (userSchema2)
export const createUser3 = async (req, res) => {
  try {
    const { username, email, password, petname } = req.body;

    const newUser3 = new User3({ username, email, password, petname });
    await newUser3.save();

    res.status(201).json({ message: 'User3 created successfully', user3: newUser3 });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user3', error: error.message });
  }
};

// Controller for Property
export const createProperty = async (req, res) => {
  try {
    const {
      price,
      photos,
      homeType,
      beds,
      attachedBathrooms,
      detachedBathrooms,
      floors,
      houseArea,
      landArea,
      parkingAvailability,
      buildYear,
      description,
    } = req.body;

    const newProperty = new Property({
      price,
      photos,
      homeType,
      beds,
      attachedBathrooms,
      detachedBathrooms,
      floors,
      houseArea,
      landArea,
      parkingAvailability,
      buildYear,
      description,
    });
    await newProperty.save();

    res.status(201).json({ message: 'Property created successfully', property: newProperty });
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error: error.message });
  }
};






/*
// Handle form data submission
export const createUser = async (req, res) => {
    try {
      const { username, email, password,petname,price } = req.body;
      
      // Validate incoming data
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Create a new user
      const newUser = new UserModel({ username, email, password,petname,price });
  
      // Save the user to the database
      await newUser.save();
  
      // Send a success response
      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error); // Log the error for debugging
      return res.status(500).json({ message: 'Internal Server Error' }); // Send a 500 error response
    }
  };
  */
  

