const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create( {title: "burgers", cuisine: "irgwas"})
      .then(createdRecipe => console.log(createdRecipe))
      .catch(err => console.log(err))
  })
  .then(() => {
    return Recipe.insertMany(data)
      .then(createdData => console.log(createdData))
      .catch(err => console.log(err))
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true}) 
      .then(updatedRigatoni => console.log(updatedRigatoni))
      .catch(err => console.log(err))
    })
  .then(() => {
    return Recipe.deleteOne( { title: "Carrot Cake"})
    .then(deletedCake => console.log(deletedCake))
    .catch(err => console.log(err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error)
  })
  .finally(() => {
    mongoose.connection.close()
  })
  
