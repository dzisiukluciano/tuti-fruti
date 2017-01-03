'use strict';

const Hapi = require('hapi');
const chalk = require ('chalk');
const log = console.log;

const server = new Hapi.Server();

var players = [];
const gameRooms = [];
const categories = ["Nombre","Animal","Color","Pais/Provincia/Estado","Cosa","Marca","Comida"];

server.connection({ port:3000 });

var io = require('socket.io')(server.listener);

io.on('connection', function(socket){
  console.log('user connected ');

  socket.on('addUser',function(msg){
    let player = {
      name : msg.user,
      socketId : socket.id
    };

    let playerIndex = -1;
    for(var i=0;i<players.length;i++){
      if(players[i].socketId == socket.id){
        playerIndex = i;
        break;
      }
    }
    if(playerIndex > -1)
      players.splice(playerIndex,1);

    players.push(player);
    console.log('players: ',players);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected ');
    let disconnectedId = socket.id;
    let deleteIndex = null;

    for(var i=0;i<players.length;i++){
      if(players[i].socketId == disconnectedId){
        deleteIndex = i;
        console.log(deleteIndex);
        break;
      }
    }
    if(deleteIndex != null)
      players.splice(deleteIndex,1);
    console.log('players: ',players);
  });

  socket.on('chat message', function(msg){
    console.log("chat message");
    socket.broadcast.to(msg.room.name).emit('receibe message', msg);
  });

  socket.on('joinRoom',function(msg){
    console.log(msg.user + ' is joining room ' + msg.room.name);
    gameRooms[msg.room.key].players.push(msg.user);
    socket.join(msg.room.name);
    io.to(msg.room.name).emit('playerJoined',gameRooms[msg.room.key]);
    console.log('room players: ',gameRooms[msg.room.key].players);
  });

  socket.on('leaveRoom',function(msg){
    console.log('leave room');
      socket.leave(msg.room.name);
      let playerIndex = -1;
      for(var i=0;i<gameRooms[msg.room.key].players.length;i++){
        if(gameRooms[msg.room.key].players[i] == msg.user){
          playerIndex = i;
          break;
        }
      }
      if(playerIndex > -1)
        gameRooms[msg.room.key].players.splice(playerIndex,1);
      console.log('room players: ',gameRooms[msg.room.key].players);

  });

  socket.on('addGameRoom',function(msg){
    msg.key = gameRooms.length;
    gameRooms.push(msg);
    console.log("room added");
  });

  socket.on('removeGameRoom',function(msg){
    gameRooms.slice(1,msg.index);
    console.log("room removed");
  });
});

//Defining routes
server.register(require('inert'),
  (err) => {
    if (err) {
      throw err;
    }

    server.route({
    method: 'GET',
    path: '/getRoomsList/{user}',
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    handler: function (request, reply) {
      let userFilter = encodeURIComponent(request.params.user)
      let filteredRooms = [];
      filteredRooms = gameRooms.filter(function(item){
        return item.admin == userFilter;
      });
      reply(filteredRooms).code(200);
    }
    });

    server.route({
    method: 'GET',
    path: '/getCategories',
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    handler: function (request, reply) {
        reply(categories).code(200);
    }
  });

  server.route({
  method: 'GET',
  path: '/getUsernames',
  config: {
      cors: {
          origin: ['*'],
          additionalHeaders: ['cache-control', 'x-requested-with']
      }
  },
  handler: function (request, reply) {
      let usernames = players.map(function(item,i){
        return item.name;
      });
      reply(usernames).code(200);
  }
});

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
         path: '../client/src',
         listing: true,
       },
      }
    });
  }
);

//Starting the server
server.start(
  (err) => {
    if (err)
      throw err;

    log(`${chalk.yellow('Tuti-Fruti server running at:')} ${chalk.green(server.info.uri)}`);
  }
);
