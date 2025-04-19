const db = require('../config/db');

const playersInArena = {};
const battle = {};

module.exports = {
    async createArena(name, maxPlayers){
        try {
            await db.query('INSERT INTO arenas (arena_name, max_players) VALUES ($1, $2)', [name, maxPlayers]);
            return 'Arena created successfully';
        } catch (error) {
            throw new Error('Error creating arena: ' + error.message);
        }
    },

    async joinIntoArena(arenaId, playerId, monsterId){
        try {
            const result = await db.query('SELECT MAX_PLAYERS FROM arenas WHERE arena_id = $1', [arenaId]);            
            const maxPlayers = result.rows[0].max_players;

            if (!playersInArena[arenaId]) {
                playersInArena[arenaId] = [];
            }

            if (playersInArena[arenaId].length >= maxPlayers) {
                throw new Error('Arena is full');
            }

            playersInArena[arenaId].push({
                player_id: playerId,
                monster_id: monsterId
            });

            return 'Player joined arena successfully';
        } catch (error) {
            throw new Error('Error joining arena: ' + error.message);
        }
    },

    leaveArena(playerId, arenaId) {
        try {
            let list = playersInArena[arenaId];
            if (!list) {
                throw new Error('Arena not found');
            }
            
            list.forEach(element => {
                if (element.player_id === playerId) {
                    list.splice(list.indexOf(element), 1);
                }
            });
            
            playersInArena[arenaId] = list;
        } catch (error) {
            
        }
    },

    async readyToStartBattle(arenaId, maxPlayersInArena){
        try {
            if (playersInArena[arenaId].length === maxPlayersInArena){
                return true;
            }

            return false;
        } catch (error) {
            throw new Error('Error starting battle: ' + error.message);
        }
    },

    async startBattle(arenaId) {
        const numPlayers = playersInArena[arenaId]?.length || 0;
        const readyOrNot = await this.readyToStartBattle(arenaId, numPlayers);
    
        if (readyOrNot === true) {
            try {
                const monsters = [];
                
                for (const player of playersInArena[arenaId]) {
                    const monsterResult = await db.query(
                        'SELECT * FROM monsters WHERE monster_id = $1',
                        [player.monster_id]
                    );
    
                    monsters.push({
                        ...monsterResult.rows[0],
                        player_id: player.player_id,
                        current_hp: monsterResult.rows[0].hp,
                        cooldown: 0,
                        defending: false
                    });
                }
    
                monsters.sort((a, b) => b.speed - a.speed);
    
                const fastestPlayerId = monsters[0].player_id;
                let currentPlayerIndex;
                if (monsters[0].speed > monsters[1].speed) {
                    currentPlayerIndex = 0;
                } else{
                    currentPlayerIndex = 1;
                }
    
                battle[arenaId] = {
                    turn: 1,
                    currentPlayer: currentPlayerIndex,
                    monsters,
                };                

                return {
                    message: "Battle started",
                    turn: 1,
                    current_turn_player: fastestPlayerId,
                    battle_state: {
                        player_1: {
                            monster: monsters[0].monster_name,
                            hp: monsters[0].current_hp
                        },
                        player_2: {
                            monster: monsters[1].monster_name,
                            hp: monsters[1].current_hp
                        }
                    }
                };
            } catch (error) {
                throw new Error("Error starting battle: " + error.message);
            }
        } else {
            throw new Error("Battle cannot start yet: not enough players or arena not ready.");
        }
    },

    async action(arenaId, playerId, action) {
        const arena = battle[arenaId];
        if (!arena) throw new Error('Battle not found');
    
        const { monsters, currentPlayer } = arena;
        const currentMonster = monsters[currentPlayer];
    
        if (currentMonster.player_id != playerId) {
            throw new Error("It's not your turn");
        }
    
        const opponentIndex = (currentPlayer + 1) % monsters.length;
        const opponent = monsters[opponentIndex];
    
        if(monsters[0].current_hp > 0 && monsters[1].current_hp > 0) {
            switch (action) {
                case 'attack':
                    opponent.current_hp -= currentMonster.attack;
                    break;
        
                case 'defend':
                    currentMonster.defending = true;
                    break;
        
                case 'skill':
                    opponent.current_hp -= currentMonster.attack * 1.5;
                    break;
        
                default:
                    throw new Error("Invalid action");
            }
        
            currentMonster.defending = false;
        
            arena.currentPlayer = opponentIndex;
            arena.turn += 1;
        
            return {
                message: `Action '${action}' performed successfully.`,
                turn: arena.turn,
                battle_state: {
                    player_1: {
                        monsterName: monsters[0].monster_name,
                        monsterId: monsters[0].monster_id,
                        hp: monsters[0].current_hp
                    },
                    player_2: {
                        monster: monsters[1].monster_name,
                        monsterId: monsters[1].monster_id,
                        hp: monsters[1].current_hp
                    },
                }
            };
        } else {
            throw new Error("Battle has already ended.");
        }
    },
    
    async endBattle(arenaId){
        try{
            const arena = battle[arenaId];
            
            if (!arena) throw new Error('Battle not found');

            const [player1, player2] = arena.monsters;

            if(player1.current_hp <= 0 || player2.current_hp <= 0) {
                if(player1.current_hp <= 0) {
                    delete battle[arenaId];
                    return {
                        message: `${player2.monster_name} wins!`,
                        winner: player2.player_id,
                        winner_monster: player2.monster_name
                    };
                } else {
                    delete battle[arenaId];
                    return {
                        message: `${player1.monster_name} wins!`,
                        winner: player1.player_id,
                        winner_monster: player1.monster_name
                    };
                }
            } else {
                throw new Error("Battle is still ongoing.");
            }
        } catch (error) {
            throw new Error("Error ending battle: " + error.message);
        }
    } 
}