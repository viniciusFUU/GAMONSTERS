const db = require('../config/db');
const Monster = require('../models/Monster');

module.exports = {
    async createMonster(name, hp, attack, defense, speed, special, playerId){
        try {
            await db.query('INSERT INTO monsters (monster_name, hp, attack, defense, speed, special, player_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', [name, hp, attack, defense, speed, special, playerId]);
            
            return "New Monster Created: " + name;
        } catch (error) {
            throw new Error('Error creating monster: ' + error.message);
        }
    },

    async getMonsters(){
        try {
            let monsters = await db.query('SELECT * FROM monsters');
            
            return monsters.rows;
        } catch (error) {
            throw new Error('Error fetching monsters: ' + error.message);
        }
    },

    async getById(id){
        try {
            let monster = await db.query('SELECT * FROM monsters WHERE monster_id = $1', [id]);
            
            return monster.rows[0];
        } catch (error) {
            throw new Error('Error fetching monster: ' + error.message);
        }
    }
}