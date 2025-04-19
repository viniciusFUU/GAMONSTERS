const PlayerService = require('../services/PlayerService');

module.exports = {
    async createPlayer(req, res) {
        try {
            const { name } = req.body;
            const result = await PlayerService.createPlayer(name);
            
            return res.status(201).json({ message: result });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async getAllPlayers(req, res) {
        try {
            const players = await PlayerService.getAllPlayers();
            
            return res.status(200).json(players);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async deletePlayer(req, res) {
        try {
            const { id } = req.params;
            const result = await PlayerService.deletePlayer(id);
            
            return res.status(200).json({ message: result });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}