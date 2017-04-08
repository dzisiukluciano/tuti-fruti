import chalk from 'chalk';
import TutiFruti from '../game/tuti-fruti';

const socket_events = {

  bind: (io) => {

  let TF = new TutiFruti;

  console.log(`${chalk.yellow('binding events...')}`);

  io.on('connection', function(socket){
    console.log('user connected ');

    socket.on('tryLogin',function(msg){
      console.log(`${chalk.yellow('tryLogin Triggered')}`);

      let users = TF.players.getUsers(msg.username);
      let socketid = io.sockets.connected[socket.id];

      if(socketid){
          if(users.length > 0){
            socketid.emit('usernameTaken',{});
          }else{
            TF.players.add(socket.id,msg.username);
            socketid.emit('login',msg);
          }
      };

      console.log(`${chalk.green('tryLogin finished')}`);
    });



    socket.on('disconnect',() => {
        console.log(`${chalk.yellow('disconnect Triggered')}`);

        TF.players.remove(socket.id);

        console.log(`${chalk.green('diconnect finished')}`);
    });




/**************************************************/
/*
    socket.on('disconnect', function(){
      console.log('disconnecting');
      let playerName = null;
      let playerIndex = null;
      //find which player has disconected
      //players.forEach(function(item,i){
      //  if(item.socketId == socket.id)
      //      playerName = item.name;
      //      playerIndex = i;
    //  });
      //console.log('player disconected: ', playerName);
      //removePlayer(socket,playerName);
    //  if(playerIndex != null)
    //    players.splice(playerIndex,1);
    //  console.log('remaining global players: ',players);
    });

    socket.on('addGameRoom',function(msg){
      msg.key = gameRooms.length;
      gameRooms.push(msg);
      console.log("room added: ",msg.name);

      if (io.sockets.connected[socket.id]) {
        io.sockets.connected[socket.id].emit('onRoomAdded',msg);
      }
    });
*/
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
            console.log(player.name,' didnt finished waiting');
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

    console.log(`${chalk.green('socket events binded')}`);
  }
};

export default socket_events;
