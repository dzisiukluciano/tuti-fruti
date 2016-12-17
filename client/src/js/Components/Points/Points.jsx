import React from 'react';


export default class Points extends React.Component{


  render(){
    <div>
      Se acabop el tiempo, todos los jugadores deben iniciar la siguiente ronda pra continuar
      <button onClick={this.nextRound.bind(this)}>Iniciar siguiente ronda</button>
    </div>
  }
}
