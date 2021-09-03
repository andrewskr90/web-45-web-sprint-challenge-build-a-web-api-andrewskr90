const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
const cors = require('cors')

server.use(express.json())
server.use(cors())

server.use('/api', actionsRouter, projectsRouter)

server.get('/', (req, res) => {
    res.send(`<h1>Projects and Actions!</h1>`)
})

server.get('/api', (req, res) => {
    res.json({
        message: "Welcome to the Projects and Actions API"
    })
})


// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
