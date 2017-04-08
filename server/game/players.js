class Player {
  constructor(id,username){
    this.id = id;
    this.username = username;
  };
}


let players = [];

module.exports = {
  getUsers : (username) => {
    let users = players.filter((p) => {
      return p.username == username || username == 'undefined';
    });
    return users;
  },

  add: (id,username) => {
    players.unshift(new Player(id,username));
    console.log(players);
  },

  remove: (id) => {
    players = players.filter(function(p) {
        return p.id !== id;
    });
    console.log(players);
  },
};
