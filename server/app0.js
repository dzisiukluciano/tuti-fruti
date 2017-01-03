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

function addPlayer(socket,playerName){
  let playerIndex = -1;
  players.forEach(funciton(p,i){
    if(p.socketId == socket.id)
      playerIndex = i;
  });

  if(playerIndex > -1)
    players.splice(playerIndex,1);

  players.push({
    name: playerName,
    socketId : socket.id,
  });
  console.log('players: ',players);
}

io.on('connection', function(socket){
  console.log('user connected ');

  socket.on('addUser',function(msg){
    addPlayer(socket,msg.user)
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
