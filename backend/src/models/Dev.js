const { Schema, model } = require('mongoose'); //desestruturação

const devSchema = new Schema({ // estrutura do banco de dados
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
}, {// cria coluna de forma automática com createdAt e updateAt em cada registro
    timestamps: true,//createdAt armazena a data do registro//updateAt armazena a data da ultima alteração
});
module.exports = model('Dev', devSchema)