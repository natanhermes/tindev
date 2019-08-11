const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DeslikeController = require('./controllers/DeslikeController');

const routes = express.Router();

// routes.get('/', (req, res) => {
//     //return res.send(`Hello ${req.query.name}!`)
//     return res.json({ message: `Olá ${req.query.name}!` })
// });
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store); // chama o controller
routes.post('/devs/:devId/likes', LikeController.store)
routes.post('/devs/:devId/dislikes', DeslikeController.store)

module.exports = routes;