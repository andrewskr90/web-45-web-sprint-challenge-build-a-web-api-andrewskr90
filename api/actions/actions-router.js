// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const Actions = require('./actions-model')
const { validateActions, validateActionId, validateAction, validateActionProjectId, validateActionEdit } = require('./actions-middlware')

router.get('/', validateActions, (req,res) => {
    res.status(200).json(req.actions)
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', validateActionProjectId, validateAction, (req, res, next) => {
    console.log(req.body)
    Actions.insert(req.body)
        .then(action => {
            console.log('action router ln 19')
            res.status(201).json(action)
        })
        .catch(next)
})

router.put('/:id', validateActionId, validateActionEdit, (req, res, next) => {
    const { id } = req.params
    Actions.update(id, req.body)
        .then(updatedAction => {
            console.log(updatedAction)
            res.status(200).json(updatedAction)
        })
        .catch(err => {
            next(err)
        })
})

router.delete('/:id', validateActionId, (req, res) => {
    const { id } = req.params
    Actions.remove(id)
        .then(numberRemoved => {
            if (!numberRemoved) {
                res.status(400).json({
                    message: "unable to remove action"
                })
            } else {
                res.status(200).json([])
            }
        })
})

router.use((err, req, res) => {
    res.status(err.status || 500)
        .json({
            message: err.message
        })
})

module.exports = router