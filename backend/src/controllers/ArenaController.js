const arenaService = require('../services/ArenaService');

module.exports = {
    async createArena(req, res) {
        try {
            const { name, maxPlayers } = req.body;
            
            const result = await arenaService.createArena(name, maxPlayers);
            
            return res.status(201).json({ message: result });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async joinIntoArena(req, res) {
        try {
            const { playerId, monsterId } = req.body;
            const { id } = req.params;
            
            const result = await arenaService.joinIntoArena(id, playerId, monsterId);
            
            return res.status(200).json({ message: result });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    leaveArena(req, res) {
        try {
            const { playerId } = req.body;
            const { id } = req.params;
            
            arenaService.leaveArena(playerId, id);
            
            return res.status(200).json({ message: 'Player left the arena successfully' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    startBattle(req, res){
        try {
            const { id } = req.params;

            arenaService.startBattle(id);
            return res.status(200).json({ message: 'Battle started successfully' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async actionBattle(req, res) {
        try {
            const { id } = req.params;
            const { playerId, action } = req.body;

            const result = await arenaService.action(id, playerId, action);
            
            return res.status(200).json({ message: result });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async endBattle(req, res) {
        try {
            const { id } = req.params;
            
            const result = await arenaService.endBattle(id);
            
            return res.status(200).json({ message: result });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}