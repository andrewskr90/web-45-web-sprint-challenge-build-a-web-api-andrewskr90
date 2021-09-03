// add middlewares here related to actions
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

const validateActions = (req, res, next) => {
    Actions.get()
        .then(actions => {
            if (!actions.length) {
                res.status(404).json([])
            } else {
                req.actions = actions
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

const validateActionId = (req, res, next) => {
    const { id } = req.params
    Actions.get(id)
        .then(action => {
            if (!action) {
                res.status(404).json({
                    message: 'action not found'
                })
            } else {
                req.action = action
                next()
            }
        })
}

const validateAction = (req, res, next) => {
    console.log(req.body)
    const { notes, description, project_id } = req.body
    if (!notes || !notes.trim()) {
        res.status(400).json({
            message: "missing required field name"
        })
    } else if (!description || !description.trim()) {
        res.status(400).json({
            message: "missing required field description"
        })
    } else if (!project_id) {
        res.status(400).json({
            message: "missing required field project_id"
        })
    } else {
        next()
    }
}

const validateActionProjectId = (req, res, next) => {
    const { project_id } = req.body
    Projects.get(project_id)
        .then(id => {
            if (!id) {
                res.status(400).json({
                    message: 'body does not include existing project_id'
                })
            } else {
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

const validateActionEdit = (req, res, next) => {
    const { notes, description, project_id, completed } = req.body
    if (!notes || !notes.trim()) {
        res.status(400).json({
            message: "missing required field name"
        })
    } else if (!description || !description.trim()) {
        res.status(400).json({
            message: "missing required field description"
        })
    } else if (!project_id) {
        res.status(400).json({
            message: "missing required field project_id"
        })
    } else if (typeof completed !== 'boolean') {
        res.status(400).json({
            message: "missing required field completed"
        })
    } else {
        next()
    }
}

module.exports = {
    validateActions,
    validateActionId,
    validateAction,
    validateActionProjectId,
    validateActionEdit
}