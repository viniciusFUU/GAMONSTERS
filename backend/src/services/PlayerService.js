const db = require('../config/db');

module.exports = {
    async createPlayer(name){
        try {
            await db.query('INSERT INTO players (player_name) VALUES ($1)', [name]);
        
            return "New Player Created: " + name;
        } catch (error) {
            throw new Error('Error creating player: ' + error.message);
        }
    },

    async getAllPlayers(){
        try {
            const result = await db.query('SELECT * FROM players');
            return result.rows;
        } catch (error) {
            throw new Error('Error fetching players: ' + error.message);
        }
    },

    async deletePlayer(id){
        try {
            await db.query('DELETE FROM players WHERE player_id = $1', [id]);

            return "Player Deleted";
        } catch (error) {
            throw new Error('Error deleting player: ' + error.message);
        }
    }
}