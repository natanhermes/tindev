const Dev = require('../models/Dev')

module.exports = {
    async store(req, res) {
        console.log(req.io, req.connectedUsers)
        //console.log(req.params.devId);//usuario q recebe o like
        //console.log(req.headers.user);//usuario q deu o like
        // coletando as informações
        const { user } = req.headers;
        const { devId } = req.params;
        //buscar o model dentro do banco
        const loggedDev = await Dev.findById(user);//busca id daquele user
        const targetDev = await Dev.findById(devId);

        if (!targetDev) { // se n existir
            return res.status(400).json({ error: 'Dev not exist' });
        }   // http codes, cod 400, algo errado na requisição
        if (targetDev.likes.includes(loggedDev._id)) {
            // console.log('Deu match!');
            // verificar a conexão ativa dos dois users q deram like
            // conexao em tempo real se existir
            const loggedSocket = req.connectedUsers[user];//id do usuario logado q deu o like
            const targetSocket = req.connectedUsers[devId];//id do user q recebeu o like
            
            if (loggedSocket){
                //avisando ao user logado q deu match com quem ele curtiu
                req.io.to(loggedSocket).emit('match', targetDev);
            }
            if (targetSocket) {
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }
        //informação de quem deu o like
        loggedDev.likes.push(targetDev._id);//id do like q ele deu
        await loggedDev.save();

        return res.json(loggedDev)
    }
};