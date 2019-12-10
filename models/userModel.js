const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Estructura DB
const userSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('User', userSchema);