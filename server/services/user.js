import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../database/models/user.js'
dotenv.config()

// verifies a password
const verifyPassword = (password) => {
    if (password.length < 8) {
        return false
    }
    return true
}

// hashes and salts a password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 5)
}

// compares a password
const comparePassword = async (password, hashed) => {
    return await bcrypt.compare(password, hashed)
}

// makes a token for a user session
const makeAuthToken = (session) => {
    return jwt.sign(session, process.env.SESSION_JWT_SECRET, { expiresIn: '7 days' })
}

// authenticates a user session token and returns either the decoded token, isExpired flag, or an error 
const checkAuthToken = (token) => {
    jwt.verify(token, process.env.SESSION_JWT_SECRET, (error, decoded) => {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                console.log('this session is expired')
                return { 
                    isExpired: true,
                }
            } else {
                console.log(error)
                throw error
            }
        } else {
            console.log(decoded)
            return {
                session: decoded
            }
        }
    })
}

// finds a user in the db, compares the passwords, and returns a new user session
const userLogin = async (username, password) => {
    let user
    try {
        user = await User.findOne({
            where: { username }
        })
    } catch (e) {
        throw {
            error: e,
            type: 'noUserFound',
            message: 'not found: no user found with this username.'
        }
    }
    if (!comparePassword(password, user.password)) {
        throw {
            type: 'wrongPassword',
            message: 'wrong pass: the provided password does not match stored password.'
        }
    }
    const newSession = { username }
    const session = makeAuthToken(newSession)
    return session
}

// creates a new user in db with hashed password
const userCreate = async (username, password) => {
    if (!verifyPassword(password)) {
        throw {
            type: 'invalidPassword',
            message: 'invalid password: passwords must be at least 8 characters long'
        }
    }
    const hashed = hashPassword(password)
    return await User.create({ username, password })
}

export {
    checkAuthToken,
    userLogin,
    userCreate
}