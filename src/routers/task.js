const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router =  new express.Router()

//Create task and to the relation with the user
router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        user_id: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/tasks', auth, async (req, res) => {

    try {
        //Use find method with param
        const tasks = await Task.find({ user_id: req.user._id })

        //Using populate approach
        //await req.user.populate('tasks').execPopulate()
        //res.send(req.user.tasks)

        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {

    try {
        //Find the task by id and that is related to the user
        const task  = await Task.findOne({ _id , user_id: req.user._id})

        if(!task) {
            return res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    //only fields allowed to do a change
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, user_id: req.user._id })

        if(!task) {
            return res.status(400).send({ error: 'Task not found' })
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
     
    try {
        //Task that is going to be deleted
        const task = await Task.findOneAndDelete({ _id: req.params.id, user_id: req.user._id })

        if(!task) {
            return res.status(404).send({msg: 'The task doesn\'t exist'})
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router