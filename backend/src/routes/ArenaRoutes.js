const arenaController = require('../controllers/ArenaController');
const express = require('express');
const router = express.Router();

router.post('/arenas', arenaController.createArena);
router.post('/arenas/:id/join', arenaController.joinIntoArena);
router.post('/arenas/:id/leave', arenaController.leaveArena);
router.post('/arenas/:id/start', arenaController.startBattle);
router.post('/arenas/:id/action', arenaController.actionBattle);
router.post('/arenas/:id/end', arenaController.endBattle);

module.exports = router;