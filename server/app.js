'use strict';

//Libs
import Hapi from 'hapi';
import Socket from './socket/socket_config';
import Config from './config/config';
import chalk from 'chalk';

//Initialize socket server
const server = new Hapi.Server();
server.connection(Config.port);

server.start(
  (err) => {
    if (err)
      throw err;

    console.log(`${chalk.green('Tuti-Fruti server running at:')} ${chalk.cyan(server.info.uri)}`);
    Socket.initialize(server.listener);
  }
);

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
