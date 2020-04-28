const express = require('express')
const User = require('../models/user')
const router =  new express.Router()

router.post('/users', async (req, res) => {
    //create user from the request
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/users', async (req, res) => {
    //inside the find method could be added some search criteria
    //find doc: https://mongoosejs.com/docs/queries.html
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id)

        if(!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch (e) {
        res.status(500).send()
    }

})

//patch = update
//patch: you can update part of the doc, with put you update the entire document
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    //only fields allowed to do a change
    const allowedUpdates = ['name','age','password','email']

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        //new:true return the user before the update
        //runValidators run validation
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true })

        if(!user) {
            return res.status(400).send()
        }

        res.status(200).send(user)

    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
     
    try {
        //User that is going to be deleted
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            return res.status(404).send({msg: 'The user doesn\'t exist'})
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router