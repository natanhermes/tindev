const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
    async index(req, res) {
        const { user } = req.headers;
        const loggedDev = await Dev.findById(user);
        const users = await Dev.find({
            $and: [ // condição para passar nos 3 filtros
                { _id: {$ne: user } },//todos id q n são iguais ao user
                { _id: {$nin: loggedDev.likes }},//todos q n estejam dentro de uma lista(usuarios q deu like)
                { _id: {$nin: loggedDev.dislikes }}
            ],

        })
        return res.json(users);
    },
    async store(req, res) {
        //console.log(req.body.username)
        const { username } = req.body; //desetrutura o objeto daquela chave
        const userExists = await Dev.findOne({ user: username });
        if (userExists) {
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        //console.log(response.data); // resposta da requisição do axius
        //function await demora para executar, async espera a execução para prosseguir
        const { name, bio, avatar_url: avatar } = response.data
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })
        return res.json(dev)
    }
};
// métodos únicos do devcontroller.js
// store, show, index, update, delete