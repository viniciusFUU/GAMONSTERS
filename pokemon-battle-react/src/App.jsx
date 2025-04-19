import { useState } from 'react';
import PlayerForm from './components/player/PlayerForm';
import MonsterForm from './components/monsters/MonsterForm';
import ArenaForm from './components/arena/ArenaForm';
import './App.css';
import Battle from './components/battle/Battle';

function App() {
  const [players, setPlayers] = useState([]);

  const handlePlayerSubmit = (newPlayer) => {
    console.log('Novo jogador criado:', newPlayer);
    setPlayers([...players, newPlayer]); // Atualiza a lista de jogadores
  };

  return (
    <div className='general-container'>
      <div className='second-container'>
        <PlayerForm onSubmit={handlePlayerSubmit} />
        <MonsterForm />
        <ArenaForm />
      </div>

      <div className='battle-container'>
        <Battle/>
      </div>
    </div>
  );
}

export default App;
