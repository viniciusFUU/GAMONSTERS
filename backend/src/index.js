require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./config/db');
const playerRoutes = require('./routes/playerRoutes');
const monsterRoutes = require('./routes/MonsterRoutes');
const arenaRoutes = require('./routes/ArenaRoutes');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/', playerRoutes);
app.use('/', monsterRoutes);
app.use('/', arenaRoutes);

app.get('/', (req, res) => {
    res.send('API está rodando');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});