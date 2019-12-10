require('dotenv').config();
//const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//Mongoose
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);



//URI de mongo
const MongoDB_URI =
  'mongodb+srv://SMS_nodeApp:mvGx8TZJ5R7g5c5l@cluster0-kcdyy.mongodb.net/test?retryWrites=true&w=majority';

//Initialize express
const app = express();
//Guardar sesiones en MONGODB
const store = new MongoDBStore({
  uri: MongoDB_URI,
  collection: 'sessions'
});
//Template Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//Routes functions
const homeRoutes = require('./routes/home');
//const errorRoutes = require('./routes/error');
const authRoutes = require('./routes/auth');
//Ruta para vistas de usuario
const userRoutes = require('./routes/users')

//Middlewares - Encode Body + Static Files
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(express.static(path.join(__dirname, 'public')));
//Sesion
app.use(
  session({
    secret: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);


//Routes to home
app.use(homeRoutes);
//Routes to error pages
//app.use(errorRoutes);
//Routes to auth
app.use(authRoutes);
//Rutas vistas de usuario
app.use(userRoutes);

//Server port
const PORT = process.env.PORT || 3000;
//Connect DB
mongoose
  .connect(MongoDB_URI)
  .then(result => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });