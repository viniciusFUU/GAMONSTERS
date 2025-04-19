const express = require('express');
const router = express.Router();
const playerController = require('../controllers/PlayerController');

router.post('/players', playerController.createPlayer);
router.get('/players', playerController.getAllPlayers);
router.delete('/players/:id', playerController.deletePlayer);

module.exports = router;