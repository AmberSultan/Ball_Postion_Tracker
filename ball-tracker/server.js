const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const BallPosition = require('./models/BallPosition');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for CORS
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware for checking JWT token
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(401);
    jwt.verify(token, 'SECRET_KEY', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// User registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ username, password: hashedPassword });
        res.json({ user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// User login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, 'SECRET_KEY');
    res.json({ token });
});

// API endpoint for updating ball position
app.post('/position', authenticateToken, async (req, res) => {
    const { x, y, z } = req.body;
    try {
        const position = await BallPosition.create({ x, y, z });
        io.emit('positionUpdate', position);
        res.json({ position });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.use(express.static('public'));

// WebSocket connection
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 5001; 
sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
