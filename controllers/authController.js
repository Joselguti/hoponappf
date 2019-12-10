const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
  });
};

exports.postRegister = (req, res, next) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
      email: email
    })
    .then(userDoc => {
      //SI YA EXISTE USER CON ESE MAIL
      if (userDoc) {
        return res.redirect('/register')
      }
      //SI NO EXISTE USER CON MAIL
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: hashedPassword,
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login')
        }); //FIN PROMESA DE CREACION DE USUARIO
    }) // FIN PROMESA USUARIO YA EXISTE
};

exports.getRegister = (req, res, next) => {
  res.render('auth/register', {
    path: '/register',
    pageTitle: 'Register',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
      email: email
    })
    .then(user => {
      //Si no existe usuario
      if (!user) {
        return res.redirect('/login');
      }
      //Si existe usuario, compara pass
      bcrypt.compare(password, user.password)
        .then(doMatch => {
          //Si pass son iguales
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              res.redirect('/dashboard');
            });
          }
          //Si pass no son iguales
          res.redirect('/login');
        })
        .catch(err => {
          res.redirect('/login');
        });
    });
};
exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};