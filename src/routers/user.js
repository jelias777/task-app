const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router =  new express.Router()

router.post('/users', async (req, res) => {
    //create user from the request
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredencials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send({msg: e.toString()})
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {

        req.user.tokens = []
        await req.user.save()
        res.send()        

    } catch (e) {
        res.status(500).send()
    }
})

//Get your profile
router.get('/users/me', auth,  async (req, res) => {
    res.send(req.user)
})

//patch = update
//patch: you can update part of the doc, with put you update the entire document
router.patch('/users/me', auth, async (req, res) => {
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
        //bracket notation instead of dot notation
        updates.forEach((update) => req.user[update] = req.body[update] )
        await req.user.save()
        res.status(200).send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }
})

//route to delete your own user
router.delete('/users/me', auth, async (req, res) => {
     
    try {
        //User that is attached on the request, use the remove method of moongoose
        req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router