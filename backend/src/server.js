const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');


const app = express();
const server = require('http').Server(app);//extrair servidor http do express para unir com sv websocket
const io = require('socket.io')(server);
//require retorna uma função que é chamada em seguida enviando o servidor http

const connectedUsers = {
  // '18d9qdw8h8128da': 'id_do_socket'
};

//todas vez q conectar pelo websocket, recebe o socket(conexao entre back e front)
io.on('connection', socket => {
  // //facilitar/permitir a transição de mensagens em tempo real
  // console.log('Nova conexão', socket.id);//id unico de conexão, fala p qual usuario vai a mensagem // qual usuario está se conectando

  // //ouvindo uma msg, qd for do tipo 'hello', envia a msg inteira p console.log
  // socket.on('hello', message => {
  //   console.log(message) // back ouvindo do front
  // })
  // setTimeout(() => {
  //   socket.emit('world',{
  //     message: 'OmniStack' // back falando p front
  //   });
  // }, 5000)
  const { user } = socket.handshake.query; //acesso ao id do usuario
  connectedUsers[user] = socket.id;

});
mongoose.connect('mongodb+srv://natandev:devadmin1812@cluster0-dst4p.mongodb.net/bancodev', {
  useNewUrlParser: true
});

//deixar disponivel dentro do controler, da acesso ao controle a uma info fora dele
//middleware serve p mudar algo na requisição e enviar diferente
app.use((req,res,next)=>{
  // requisição para aqui e dps vai p routes através do next
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);