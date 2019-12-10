const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

//Al recibir request de home, usa homeController
router.get('/', homeController.getHomePage);

//Al recibir la URL /aboutUs, llama al controlador homeController y ahi llama a la funcion getAboutUsPage
router.get('/aboutUs', homeController.getAboutUsPage);

module.exports = router;