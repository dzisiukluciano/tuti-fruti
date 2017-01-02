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
    players.push(player);
    console.log('players: ',players);
  });

  socket.on('disconnect', function(){
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
    console.log("broadcasting message and notification");
    socket.broadcast.to(msg.room.name).emit('receibe message', msg);
  });

  socket.on('joinRoom',function(msg){
    let user = msg.user;
    console.log(user + ' is joining room ' + msg.room.name);
    socket.join(msg.room.name);
  });

  socket.on('something',function(msg){
    let room = gameRooms[msg.room];

    console.log('something receibed');
    io.to(room.name).emit('somethingCallback');
  });

  socket.on('addGameRoom',function(msg){
    msg.key = gameRooms.length+1;
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
