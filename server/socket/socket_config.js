import chalk from 'chalk';
import socketio from 'socket.io';
import socketEvents from './socket_events';


const socket_config = {
  initialize : function(listener){
    let io = socketio(listener);
    socketEvents.bind(io);
    console.log(`${chalk.green('Socket initialized')}`);
  }
};

export default socket_config;
