import { useState, useEffect } from 'react';
import Card from '../card/Card';
import './style.css'

function Battle() {
  const [arenaId, setArenaId] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [monsterId, setMonsterId] = useState('');
  const [players, setPlayers] = useState([]);
  const [firstMonster, setFirstMonster] = useState({});
  const [secondMonster, setSecondMonster] = useState({});
  const [firstMonsterId, setFirstMonsterId] = useState(null);
  const [secondMonsterId, setSecondMonsterId] = useState(null);
  const [selectedAction, setSelectedAction] = useState('');
  const [finalBattle, setFinalBattle] = useState(false);
  const [winnerId, setWinnerId] = useState(null);
  let playerTurn = '';

  useEffect(() => {
    if (firstMonsterId !== null) {
      handleFirstMonsters();
    }
  }, [firstMonsterId]);

  useEffect(() => {
    if (secondMonsterId !== null) {
      handleSecondMonsters();
    }
  }, [secondMonsterId]);

  const handleAddPlayer = async () => {
    if (!arenaId || !playerId || !monsterId) return;

    try {
      const response = await fetch(`http://localhost:3000/arenas/${arenaId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playerId, monsterId })
      });

      if (!response.ok) throw new Error('Erro ao adicionar jogador');

      const data = await response.json();

      if (firstMonsterId === null) {
        setFirstMonsterId(monsterId);
      } else if (secondMonsterId === null) {
        setSecondMonsterId(monsterId);
        // setArenaId('');
      }

      setPlayers((prev) => [...prev, data]);
      setPlayerId('');
      setMonsterId('');
    } catch (error) {
      console.error('Erro ao adicionar jogador:', error);
    }
  };

  const handleStartBattle = async () => {
    if (!arenaId) return;    
    try {
      const response = await fetch(`http://localhost:3000/arenas/${arenaId}/start`, {
        method: 'POST'
      });

      if (!response.ok) throw new Error('Erro ao iniciar batalha');

      const data = await response.json();

      return "batalha iniciada";
    } catch (error) {
      console.error('Erro ao iniciar batalha:', error);
    }
  };

  const handleFirstMonsters = async () => {
    try {
      const response = await fetch(`http://localhost:3000/monsters/${firstMonsterId}`);
      if (!response.ok) throw new Error('Erro ao buscar monstro 1');

      const data = await response.json();
      setFirstMonster(data);
    } catch (error) {
      console.error('Erro ao buscar monstro 1:', error);
    }
  };

  const handleSecondMonsters = async () => {
    try {
      const response = await fetch(`http://localhost:3000/monsters/${secondMonsterId}`);
      if (!response.ok) throw new Error('Erro ao buscar monstro 2');

      const data = await response.json();
      setSecondMonster(data);
    } catch (error) {
      console.error('Erro ao buscar monstro 2:', error);
    }
  };

  const handleActions = async () => {    
    try {      
      if(playerTurn === ''){
        if (firstMonster.speed > secondMonster.speed){
          console.log("1",firstMonster.player_id);
          console.log("1",firstMonster);
          
          playerTurn = firstMonster.player_id;
        } else {
          console.log('2',secondMonster.player_id);
          console.log('2',secondMonster);
          playerTurn = secondMonster.player_id;
        }
      } else {
        if (playerTurn === firstMonster.player_id){
          console.log('3',secondMonster.player_id);
          console.log('3',secondMonster);
          playerTurn = secondMonster.player_id;
        } else {
          console.log('4',firstMonster.player_id);
          console.log('4',firstMonster);
          playerTurn = firstMonster.player_id;
        }
      } 
      
      const body = {
        playerId: playerTurn,
        action: selectedAction
      };      

      if (firstMonster.hp > 0 || secondMonster.hp > 0) {
        const response = await fetch(`http://localhost:3000/arenas/${arenaId}/action`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            playerId: playerTurn, 
            action: selectedAction, 
          })
        });
  
        if (!response.ok) throw new Error('Erro ao executar ação');
  
        const data = await response.json();
      
        let firstMonsterHpAtt = data.message.battle_state.player_1.hp;
        let secondMonsterHpAtt = data.message.battle_state.player_2.hp;
  
        firstMonster.hp = firstMonsterHpAtt;
        secondMonster.hp = secondMonsterHpAtt;
        
        setFirstMonster(firstMonster);
        setSecondMonster(secondMonster);

        console.log('HP 01',parseInt(firstMonster.hp));
        console.log('HP 02',parseInt(secondMonster.hp));
        
        if (parseInt(firstMonster.hp) < 0 || parseInt(secondMonster.hp) < 0) {
          setFinalBattle(true);
          console.log("Batalha finalizada!");
        }

      }
    } catch (error) {
      throw new Error('Erro ao executar ação:', error);
    }
  }

  const handleEndBattle = async () => {
    console.log(finalBattle);
    
    try {
      const response = await fetch(`http://localhost:3000/arenas/${arenaId}/end`, {
        method: 'POST'
      });
  
      if (!response.ok) throw new Error('Erro ao finalizar batalha');
  
      const data = await response.json();
      console.log(data.message);
  
      setWinnerId(data.winner);
  
    } catch (error) {
      console.error('Erro ao finalizar batalha:', error);
    }
  }

  return (
    <div className='battle-container'>
      <h2>Passe a Arena de Batalha</h2>
      <input
        type="text"
        placeholder="ID da Arena"
        value={arenaId}
        onChange={(e) => setArenaId(e.target.value)}
      />

      <h2>Adicionar Jogadores</h2>
      <input
        type="text"
        placeholder="ID do Player"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID do Monstro"
        value={monsterId}
        onChange={(e) => setMonsterId(e.target.value)}
      />
      <button onClick={handleAddPlayer}>Adicionar</button>

      <button onClick={handleStartBattle}>Batalhar</button>
      
      <div className='battle'>
        <div className='battle-add'>
          <h3>Jogadores Adicionados:</h3>
        </div>
        <div className='battle-fight'>
          <div>
          {firstMonsterId && <Card monster={firstMonster} isWinner={firstMonster.player_id === winnerId} />}
          </div>
          {secondMonsterId && (
            <div className='battle-action'>
            <select value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)}>
              <option value="">Ações</option>
              <option value="attack">Ataque</option>
              <option value="defend">Defesa</option>
              <option value="skill">Habilidade</option>
            </select>
          
            <button 
              onClick={handleActions} 
              disabled={finalBattle}
            >
              Executar Ação
            </button>
          
            {finalBattle && (
              <button onClick={handleEndBattle}>Finalizar Batalha</button>
            )}
          </div>
          )}
          <div>
          {secondMonsterId && <Card monster={secondMonster} isWinner={secondMonster.player_id === winnerId} />}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Battle;