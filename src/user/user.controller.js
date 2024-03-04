'use strict'


import User from './user.model.js'
import { encrypt, checkPassword} from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'


export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

//registro de usuarios
export const register = async (req, res) => {
    try {
        let data = req.body
        let exists = await User.findOne({
            $or: [
                {
                    user: data.username
                },
                {
                    email: data.email
                }
            ]
        })
        if (exists) {
            return res.status(500).send({ message: 'Email or username alredy exists' })
        }
        data.password = await encrypt(data.password)
        data.role = 'ADMIN'
        let user = new User(data)
        await user.save()
        return res.send({ message: `Registered successfully, can be logged with username ${user.username}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err: err })
    }
}

//login
export const login = async (req, res) => {
    try {
        let { username, password, email } = req.body
        let user = await User.findOne({
            $or: [
                {
                    username
                },
                {
                    email
                }
            ]
        })
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                surname: user.surname,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${loggedUser.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to login' })
    }

}

