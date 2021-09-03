// add middlewares here related to projects
const Projects = require('./projects-model')

const validateProjects = (req, res, next) => {
    Projects.get()
        .then(projects => {
            console.log(projects)
            if (projects.length < 1) {
                res.status(404).json([])
            } else {
                req.projects = projects
                next()
            }
        })
        .catch(next)
}

const validateProjectId = (req, res, next) => {
    const { id } = req.params
    Projects.get(id)
        .then(project => {
            if(!project) {
                res.status(404).json({
                    message: "Project not found"
                })
            } else {
                req.project = project
                next()
            }
        })
        .catch(next)
}

const validateProject = (req, res, next) => {
    const { name, description } = req.body
    if (!name || !name.trim()) {
        res.status(400).json({
            message: "missing required field name"
        })
    } else if (!description || !description.trim()) {
        res.status(400).json({
            message: "missing required field description"
        })
    } else {
        next()
    }
}

const validateProjectEdit = (req, res, next) => {
    const { name, description, completed } = req.body
    if (!name || !name.trim()) {
        res.status(400).json({
            message: "missing required field name"
        })
    } else if (!description || !description.trim()) {
        res.status(400).json({
            message: "missing required field description"
        })
    } else if (typeof completed !== 'boolean') {
        res.status(400).json({
            message: "missing required field completed"
        })
    } else {
        console.log(req.body)
        next()
    }
}

module.exports = {
    validateProject,
    validateProjects,
    validateProjectId,
    validateProjectEdit
}