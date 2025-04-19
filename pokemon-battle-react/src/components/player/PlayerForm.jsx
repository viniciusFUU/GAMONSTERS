import React from 'react'
import './style.css'
import axios from 'axios'

export default function PlayerForm({ onSubmit }) {
    const [playerName, setPlayerName] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(playerName);

        try {
            const response = await axios.post('http://localhost:3000/players', {
                name: playerName
            });

            console.log(response.data);

            onSubmit(response.data);
            setPlayerName('');
        } catch (error) {
            console.error('Error creating player:', error);
        }
    }

    return (
        <>
        <div className="player-form">
            <h2 htmlFor="">Cadastrar Player</h2>
                <div className = "player-div">
                    <label htmlFor="">Nome</label>
                    <input
                        type="text" 
                        id='playerName'
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
            </div>
            <button type="submit" onClick={handleSubmit}>Criar</button>
        </div>
        </>
    )
}