// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const { validateProject, validateProjects, validateProjectId, validateProjectEdit, validateProjectActions } = require('./projects-middleware')
const router = express.Router()

router.get('/', validateProjects, (req,res) => {
    res.status(200).json(req.projects)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})

router.put('/:id', validateProjectEdit, (req, res, next) => {
    const { id } = req.params
    Projects.update(id, req.body)
        .then(projectEdit => {
                res.status(200).json(projectEdit)
        })
        .catch(next)
})

router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.params
    Projects.remove(id)
        .then(numberRemoved => {
            if (numberRemoved < 1) {
                res.status(400).json({
                    message: "unable to remove project"
                })
            } else {
                res.status(200).json({
                    message: `successfully removed ${numberRemoved} project`
                })
            }
        })
})

router.get('/:id/actions', validateProjectId, validateProjectActions, (req, res, next) => {
    const { id } = req.params  
    Projects.getProjectActions(id)
        .then(projectActions => {
            res.status(200).json(projectActions)
        })
        .catch(next)
})


router.use((err, req, res) => {
    res.status(err.status || 500)
        .json({
            message: err.message
        })
})

module.exports = router