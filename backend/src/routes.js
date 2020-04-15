const express = require('express');

// Controladores
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const LoginController = require('./controllers/LoginController');

const routes = express.Router();

routes.post('/login', LoginController.create);

routes.get('/ongs', OngController.index); 
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;