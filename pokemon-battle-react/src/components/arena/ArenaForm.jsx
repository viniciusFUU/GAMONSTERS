import { useState } from "react";
import axios from "axios";
import './style.css'

function ArenaForm() {
    const [arena, setArena] = useState({
        name: '',
        maxPlayers: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('o que estou recebendo de arena',arena);
        
        try {
            const response = await axios.post('http://localhost:3000/arenas', arena);
            console.log('Arena created:', response.data);
        } catch (error) {
            console.error('Error creating arena:', error);
        }
    }

    return (
        <div className='arena-container'>
            <h2>Cadastro de Arenas</h2>
            <div className="arena-form">
                <div className="arena-div">
                    <label htmlFor="name">Nome:</label>
                    <input 
                        type="text" 
                        name="name"
                        value={arena.name || ''}
                        onChange={(e) =>
                            setArena((prev) => ({ ...prev, name: e.target.value }))
                        }
                    />
                </div>
                <div className="arena-div">
                    <label htmlFor="maxPlayers">Maximo de <br/>Jogadores:</label>
                    <input 
                        type="number"
                        name="maxPlayers"
                        value={arena.maxPlayers || ''}
                        onChange={(e) =>
                            setArena((prev) => ({ ...prev, maxPlayers: e.target.value }))
                        }
                    />
                </div>
            </div>

            <button type="submit" onClick={handleSubmit}>Cadastrar Arena</button>
        </div>
    )
}

export default ArenaForm;