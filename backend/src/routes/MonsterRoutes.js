const express = require('express');
const router = express.Router();
const monsterController = require('../controllers/MonsterController');

router.post('/monsters', monsterController.createMonster);
router.get('/monsters', monsterController.getMonsters);
router.get('/monsters/:id', monsterController.getMonsterById);

module.exports = router;