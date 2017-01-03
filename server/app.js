'use strict';

const Hapi = require('hapi');
const chalk = require ('chalk');
const log = console.log;

const server = new Hapi.Server();

var players = [];
var gameRooms = [];
const categories = ["Nombre","Animal","Color","Pais/Provincia/Estado","Cosa","Marca","Comida"];

server.connection({ port:3000 });

var io = require('socket.io')(server.listener);

function removePlayerfromRoom(socket,playerName,room){
  socket.leave(room.name);
  let playerIndex = -1;
  for(var i=0;i<gameRooms[room.key].players.length;i++){
    if(gameRooms[room.key].players[i] == playerName){
      playerIndex = i;
      break;
    }
  }
  if(playerIndex > -1)
    gameRooms[room.key].players.splice(playerIndex,1);

  io.to(room.name).emit('playersUpdate',gameRooms[room.key]);
  console.log('room players: ',gameRooms[room.key].players);
}

function addPlayerToRoom(socket,playerName,room){
  gameRooms[room.key].players.push(playerName);
  socket.join(room.name);
  io.to(room.name).emit('playersUpdate',gameRooms[room.key]);
  console.log('room players: ',gameRooms[room.key].players);
}

function addPlayer(socket,playerName){
  let playerIndex = -1;
  for(var i=0;i<players.length;i++){
    if(players[i].socketId == socket.id){
      playerIndex = i;
      break;
    }
  }
  if(playerIndex > -1)
    players.splice(playerIndex,1);

  players.push({
    name: playerName,
    socketId : socket.id,
  });
  console.log('players: ',players);
}

function removePlayer(socket,playerName,playerIndex){
  gameRooms.forEach(function(room,i){
    //Advise to all administrated rooms by the disconecter player that their admin has been disconnected.
    if(room.admin == playerName && room.players.length > 0){
      socket.broadcast.to(room.name).emit('admin disconected',{name:playerName});
      log('broadcasting admin disconect name: ',playerName);
    }
    //The disconected player was playing here
    if(room.players.indexOf(playerName) > -1)
      removePlayerfromRoom(socket,playerName,gameRooms[i]);
  });


  gameRooms = gameRooms.filter(function(item){
    return item.admin != playerName;
  })

  console.log('remaining gameRooms: ', gameRooms);

  //Remove the player
  players.splice(playerIndex,1);
  console.log('remaining global players: ',players);
}

io.on('connection', function(socket){
  console.log('user connected ');

  socket.on('addUser',function(msg){
    addPlayer(socket,msg.user)
  });

  socket.on('disconnect', function(){
    console.log('user disconnected ');

    let playerName = null;
    let playerIndex = null;

    //find which player has disconected
    players.forEach(function(item,i){
      if(item.socketId == socket.id)
        {
          playerName = item.name;
          playerIndex = i;
        }
    });
    console.log('player disconected: ', playerName);

    removePlayer(socket,playerName,playerIndex);


  });

  socket.on('logout',function(msg){
    let playerIndex = null;
    //find which player index has disconected
    players.forEach(function(item,i){
      if(item.name == msg.user)
        {
          playerIndex = i;
        }
    });
    console.log('player logout: ', msg.user);
    removePlayer(socket,msg.user,playerIndex);
  });

  socket.on('chat message', function(msg){
    console.log("chat message");
    socket.broadcast.to(msg.room.name).emit('receibe message', msg);
  });

  socket.on('joinRoom',function(msg){
    console.log(msg.user + ' is joining room ' + msg.room.name);
    addPlayerToRoom(socket,msg.user,msg.room);
  });

  socket.on('leaveRoom',function(msg){
    console.log('leave room');
    removePlayerfromRoom(socket,msg.user,msg.room);
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
