'use strict';

const Hapi = require('hapi');
const chalk = require ('chalk');
const log = console.log;

const server = new Hapi.Server();


server.connection({ port:3000 });

var io = require('socket.io')(server.listener);

io.on('connection', function(socket){
  console.log('users connected:');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('distributing message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('chat message', function(msg){
    console.log("broadcast notification");
    socket.broadcast.emit('alert message',msg);
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
