const express = require('express')
const router = express.Router()
const task = require('../models/task')
const m = require('../helpers/middlewares')
// Routes
module.exports = router

/* All tasks */
router.get('/', m.pagination(5), async (req, res) => {
    const { startIndex, endIndex } = req.pagination;

    await task.getTasks()
    .then(tasks => 
        res.json(tasks.slice(startIndex, endIndex))
    )
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A task by id */
router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await task.getTask(id)
    .then(task => res.json(task))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new task */
router.post('/', m.checkFieldsTask, async (req, res) => {
    await task.insertTask(req.body)
    .then(task => res.status(201).json({
        message: `The task #${task.id} has been created`,
        content: task
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a task */
router.put('/:id', m.mustBeInteger, m.checkFieldsTask, async (req, res) => {
    const id = req.params.id

    await task.updateTask(id, req.body)
    .then(task => res.json({
        message: `The task #${id} has been updated`,
        content: task
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a task */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await task.deleteTask(id)
    .then(task => res.json({
        message: `The task #${id} has been deleted`, task
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

module.exports = router