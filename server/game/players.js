let players = [];

module.exports = {
  getUsers : (username) => {
    let users = players.filter((p) => {
      return p.username == username;
    });
    return users;
  },

  add: (id,username) => {
    let newPlayer = {
      id: id,
      username: username
    }

    players.unshift(newPlayer);
  },

};
