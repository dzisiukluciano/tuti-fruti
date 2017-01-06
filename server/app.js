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

function addPlayerToRoom(socket,playerName,room){
  let playerObject = null;
  players.forEach(function(player,i){
    if(player.name == playerName){
      playerObject = player;
    }
  })

  if(gameRooms[room.key].players.length == gameRooms[room.key].maxPlayers){
    if (io.sockets.connected[socket.id]){
      io.sockets.connected[socket.id].emit('onRoomFull',{});
    }
  }
  else if(gameRooms[room.key].state == 'started'){
    if (io.sockets.connected[socket.id]){
      console.log('emiiting onRoomStarted');
      io.sockets.connected[socket.id].emit('onRoomStarted',{room:room});
      }
  }
  else if(playerObject != null){
    gameRooms[room.key].players.push(playerObject);
    socket.join(room.name);
    if (io.sockets.connected[socket.id]){
      console.log('emiiting onJoinOk');
      io.sockets.connected[socket.id].emit('onJoinOk',{room:room});
      }
    io.to(room.name).emit('playersUpdate',gameRooms[room.key]);
    console.log('room players: ',gameRooms[room.key].players);
  }
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
    state : 'waiting',
  });
  console.log('players: ',players);
}

function removePlayer(socket,playerName){
  gameRooms.forEach(function(room,i){
      //Advise to all administrated rooms by the disconecter player that their admin has been disconnected.
      if(room.admin == playerName && room.players.length > 0){
        socket.broadcast.to(room.name).emit('admin disconected',{name:playerName});
        log('broadcasting admin disconect name: ',playerName);
      }
      //The disconected player was playing here and its not the admin
      room.players.forEach(function(player,i){
        if(player.name == playerName){
          removePlayerfromRoom(socket,playerName,room);
        }
      });
    });

    //Delete the rooms where the user who logged out was the admin
    gameRooms = gameRooms.filter(function(item){
      return item.admin != playerName;
    })
    console.log('remaining gameRooms: ', gameRooms);
}

function removePlayerfromRoom(socket,playerName,room){
  socket.leave(room.name);
  let playerIndex = -1;
  room.players.forEach(function(player,i){
    if(player.name == playerName)
      playerIndex = i;
  });

  if(playerIndex > -1)
    gameRooms[room.key].players.splice(playerIndex,1);

  io.to(room.name).emit('playersUpdate',gameRooms[room.key]);
  console.log('room players: ',gameRooms[room.key].players);
}

io.on('connection', function(socket){
  console.log('user connected ');

  socket.on('addUser',function(msg){
    addPlayer(socket,msg.user)
  });

  socket.on('disconnect', function(){
    let playerName = null;
    let playerIndex = null;
    //find which player has disconected
    players.forEach(function(item,i){
      if(item.socketId == socket.id)
          playerName = item.name;
          playerIndex = i;
    });
    console.log('player disconected: ', playerName);
    removePlayer(socket,playerName);
    if(playerIndex != null)
      players.splice(playerIndex,1);
    console.log('remaining global players: ',players);
  });

  socket.on('addGameRoom',function(msg){
    msg.key = gameRooms.length;
    gameRooms.push(msg);
    console.log("room added: ",msg.name);

    if (io.sockets.connected[socket.id]) {
      io.sockets.connected[socket.id].emit('onRoomAdded',msg);
    }
  });

  socket.on('joinRoom',function(msg){
    console.log(msg.user + ' is joining room ' + msg.room.name);
    addPlayerToRoom(socket,msg.user,msg.room);
  });

  socket.on('leaveRoom',function(msg){
    console.log('leave room');
    removePlayer(socket,msg.user);
  });

  socket.on('roomStarted',function(msg){
    let room = msg.room;
    gameRooms[room.key].state = room.state;
  });

  socket.on('setWaitingFinished',function(msg){
    let user = msg.user;
    let room = msg.room;

    gameRooms[room.key].players.forEach(function(player,i){
      if(player.name == user){
          player.state = 'letter';
      }
    });

    console.log(msg.user,' finished waiting in room ', msg.room.name);
    io.sockets.in(msg.room.name).emit('playersUpdate',gameRooms[room.key]);

    let everybodyFinishedWaiting = true;
    gameRooms[room.key].players.forEach(function(player,i){
        if(player.state != 'letter'){
          log(player.name,' didnt finished waiting');
          everybodyFinishedWaiting = false;
        }
    });

    if(everybodyFinishedWaiting && gameRooms[room.key].players.length > 1){
      io.sockets.in(msg.room.name).emit('everybodyFinishedWaiting',{});
    }


  });

  socket.on('chat message', function(msg){
    console.log("chat message");
    socket.broadcast.to(msg.room.name).emit('receibe message', msg);
  });

  socket.on('getCategories', function(){
    console.log("getCategories");
    if (io.sockets.connected[socket.id]) {
      io.sockets.connected[socket.id].emit('onCategoriesReceibed',{categories:categories});
    }
  });

  socket.on('findRooms', function(msg){
    console.log("findRooms");

    let userFilter = msg.user;
    let filteredRooms = [];
    filteredRooms = gameRooms.filter(function(room){
      return room.admin == userFilter;
    });

    if (io.sockets.connected[socket.id]) {
      io.sockets.connected[socket.id].emit('onRoomsFound',{rooms:filteredRooms});
    }
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
