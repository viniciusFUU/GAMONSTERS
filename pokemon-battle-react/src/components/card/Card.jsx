import React from 'react';
import './style.css';

function Card({ monster, isWinner }) {
  return (
    <div className={`card ${isWinner ? 'winner' : ''}`}>
      <h4>Mestre: {monster.player_id}</h4>
      {isWinner && <p className="winner-badge">🏆 Vencedor!</p>}
      <p>Nome: {monster.monster_name}</p>
      <p>Ataque: {monster.attack}</p>
      <p>Defesa: {monster.defense}</p>
      <p>Vida: {monster.hp}</p>
      <p>Habilidade: {monster.special}</p>
      <p>Velocidade: {monster.speed}</p>
    </div>
  );
}

export default Card;