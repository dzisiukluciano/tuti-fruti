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
        console.log('broadcasting admin disconect name: ',playerName);
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
