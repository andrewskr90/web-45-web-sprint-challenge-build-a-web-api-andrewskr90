// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const { validateProject, validateProjects, validateProjectId, validateProjectEdit } = require('./projects-middleware')
const router = express.Router()

router.get('/projects', validateProjects, (req,res) => {
    res.status(200).json(req.projects)
})

router.get('/projects/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/projects', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})

router.put('/projects/:id', validateProjectEdit, (req, res, next) => {
    const { id } = req.params
    Projects.update(id, req.body)
        .then(projectEdit => {
            console.log(projectEdit)
                res.status(200).json(projectEdit)
        })
        .catch(next)
})

router.use((err, req, res, next) => {
    console.log(err.message)
    res.status(err.status || 500)
        .json({
            message: err.message
        })
})
module.exports = router