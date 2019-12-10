exports.getHomePage = (req, res, next) => {
  res.render('home', {
    path: '/',
    pageTitle: 'Home',
    isAuthenticated: req.session.isLoggedIn,
  });
};
//Controlador de la pagina About Us
exports.getAboutUsPage = (req, res, next) => {
  //Muestra la pagina
  res.render('aboutUs', {
    //Ruta de la pagina, debe mostrar la pagina localizada en views/aboutUs
    path: '/aboutUs',
    //Titulo de la pagina
    pageTitle: 'Acerca de',
    //Obtener estado de autenticacion de la persona
    isAuthenticated: req.session.isLoggedIn,
  });
};