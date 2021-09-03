// Write your "projects" router here!
const express = require('express')
const { validateProjects } = require('./projects-middleware')
const router = express.Router()

router.get('/projects', validateProjects, (req,res) => {
    res.status(200).json(req.projects)
})

module.exports = router