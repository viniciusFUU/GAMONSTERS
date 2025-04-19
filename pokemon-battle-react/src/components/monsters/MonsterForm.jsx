import React, { useEffect } from 'react'
import axios from 'axios';
import './style.css'

function MonsterForm(){
    const [monster, setMonster] = React.useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        special: '',
        playerId: ''
    });
    const [players, setPlayers] = React.useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/players');
                setPlayers(response.data);
                console.log("PLAYERS",response.data);
                
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        }
        
        fetchPlayers();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('o que estou recebendo de monstro',monster);
        
        try {
            const response = await axios.post('http://localhost:3000/monsters', monster);
            console.log('Monster created:', response.data);
        } catch (error) {
            console.error('Error creating monster:', error);
        }
    }

    return(
        <div className="monster-form">
            <h2>Cadastro de Monstros</h2>
            <div className='monster-container'>
                <div className="monster-div">
                    <label htmlFor="name">Nome:</label>
                    <input 
                        type="text" 
                        name="name"
                        value={monster.name || ''}
                        onChange={(e) =>
                            setMonster((prev) => ({ ...prev, name: e.target.value }))
                          }
                    />
                </div>
                <div className="monster-div">
                    <label htmlFor="hp">Vida:</label>
                    <input 
                        type="number"
                        name="hp"
                        value={monster.hp || ''}
                        onChange={(e) =>
                            setMonster((prev) => ({ ...prev, hp: e.target.value }))
                          }
                    />
                </div>
                <div className="monster-div">
                    <label htmlFor="attack">Ataque:</label>
                    <input 
                        type="number" 
                        name="attack"
                        value={monster.attack || ''}
                        onChange={(e) =>
                            setMonster((prev) => ({ ...prev, attack: e.target.value }))
                          }
                    />
                </div>
                <div className="monster-div">
                    <label htmlFor="defense">Defesa:</label>
                    <input 
                        type="number" 
                        name="defense"
                        value={monster.defense || ''}
                        onChange={(e) =>
                            setMonster((prev) => ({ ...prev, defense: e.target.value }))
                          }
                    />
                </div>
                <div className="monster-div">
                    <label htmlFor="speed">Velocidade:</label>
                    <input 
                        type="number" 
                        name="speed"
                        value={monster.speed || ''}
                        onChange={(e) =>
                            setMonster((prev) => ({ ...prev, speed: e.target.value }))
                          }
                    />
                </div>
                <div className="monster-div">
                    <label htmlFor="special">Habilidade:</label>
                    <input 
                        type="number" 
                        name="special"
                        value={monster.special || ''}
                        onChange={(e) =>
                            setMonster((prev) => ({ ...prev, special: e.target.value }))
                          }
                    />
                </div>
                <div className="monster-div monster-div-select">
                    <label htmlFor="playerId">Mestre do Monstro:</label>
                    <select 
                        name="playerId"
                        value={monster.playerId}
                        onChange={(e) =>
                            setMonster((prev) => ({ ...prev, playerId: e.target.value }))
                          }
                        required
                    >
                        <option value="">Selecione o Mestre</option>
                        {players.map((player) => (
                        <option className="option" key={player.player_id} value={player.player_id}>
                            {player.player_name}
                        </option>
                        ))}
                    </select>
                </div>
            </div>

            <button type="submit" onClick={handleSubmit}>Criar Monstro</button>
        </div>
    )
}

export default MonsterForm;
