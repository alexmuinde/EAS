import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'


export const signUp = async (req, res, next) => {
 const { username, email, password } = req.body
 const hashedPassword = await bcrypt.hashSync(password, 10)
 const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json("User Created Successfully!")
    } catch (error) {
        next(error)
    }
}