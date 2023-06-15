const User = require("../models/User")
const Note = require("../models/Note")
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")

// GET ALL USER
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!users?.length) { return res.status(400).json({ message: 'no user found' }) }
    res.json(users)
})


// CREATE  NEW USER
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body

    //confirm data 
    if (!username || !password) { return res.status(400).json({ message: "all fields are required" }) }

    // check for duplicates
    const duplicate = await User.findOne({ username }).collation({ locale: "en", strength: 2 }).lean().exec()
    if (duplicate) { return res.status(400).json({ message: "duplicate username" }) }

    // hash password
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds 

    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, "password": hashedPwd }
        : { username, "password": hashedPwd, roles }

    //create and store new user
    const user = await User.create(userObject)
    if (user) { res.status(201).json({ message: `new user ${username} created` }) }
    else { res.status(400).json({ message: "invalid user data recieved " }) }
})


// UPDATE USER
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body

    //confirm data 
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== "boolean") { return res.status(400).json({ message: "all field are required" }) }
    const user = await User.findById(id).exec()
    if (!user) { return res.status(400).json({ message: "user not found" }) }

    // check for duplicate
    const duplicate = await User.findOne({ username }).collation({ locale: "en", strength: 2 }).lean().exec()
    // allow updates to original user 
    if (duplicate && duplicate?._id.toString() !== id) { return res.status(409).json({ message: "duplicate username" }) }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) { user.password = await bcrypt.hash(password, 10) }
    const updateUser = await user.save()
    res.json({ message: `${updateUser.username} updated` })

})


// DELETE USER
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) { return res.status(400).json({ message: "user id required" }) }
    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) { return res.status(400).json({ message: "user has assigned notes" }) }
    const user = await User.findById(id).exec()
    if (!user) { return res.status(400).json({ message: "user not found " }) }
    const result = await user.deleteOne()
    const reply = `Username ${result.username} with Id ${result._id} deleted`
    res.json(reply)
})



module.exports = { getAllUsers, createNewUser, updateUser, deleteUser }


