const Dev = require('../models/Dev')

module.exports = {
    async store(req, res){
       //console.log(req.params.devId);//usuario q recebe o like
       //console.log(req.headers.user);//usuario q deu o like
        // coletando as informações
        const { user } = req.headers;
        const { devId } = req.params;        
        //buscar o model dentro do banco
        const loggedDev = await Dev.findById(user);//busca id daquele user
        const targetDev = await Dev.findById(devId);

        if (!targetDev){ // se n existir
            return res.status(400).json({error: 'Dev not exist'});
        }   // http codes, cod 400, algo errado na requisição
        //informação de quem deu o like
        loggedDev.dislikes.push(targetDev._id);//id do like q ele deu
        await loggedDev.save();

        return res.json(loggedDev)
    }
};