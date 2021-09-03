// add middlewares here related to projects
const Projects = require('./projects-model')

const validateProjects = (req, res, next) => {
    Projects.get()
        .then(projects => {
            console.log(projects)
            if (projects.length < 1) {
                res.status(404).json([])
            } else {
                console.log(projects)
                req.projects = projects
                next()
            }
        })
        .catch(next)
}

module.exports = {
    validateProjects
}