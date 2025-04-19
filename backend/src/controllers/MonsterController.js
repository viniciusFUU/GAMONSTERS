const monsterService = require('../services/MonsterService');

module.exports = {
    async createMonster(req, res) {
        try {
            const { name, hp, attack, defense, speed, special, playerId } = req.body;
            
            const result = await monsterService.createMonster(name, hp, attack, defense, speed, special, playerId);
            
            return res.status(201).json({ message: result });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async getMonsters(req, res) {
        try {
            const monsters = await monsterService.getMonsters();
            
            return res.status(200).json(monsters);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async getMonsterById(req, res) {
        try {
            const { id } = req.params;
            
            const monster = await monsterService.getById(id);
            
            if (!monster) {
                return res.status(404).json({ message: 'Monster not found' });
            }
            
            return res.status(200).json(monster);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};