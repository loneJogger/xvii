import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const entry = (message, level, body) => {
    let out = ''
    if (body && level) {
        out = `${new Date().toISOString().replace('T', ' ').substring(0,23)}: ${level.toUpperCase()} => | ${message},\n${JSON.stringify(body)}\n`
    } else if (body && !level) {
        out = `${new Date().toISOString().replace('T', ' ').substring(0,23)}: INFO => | ${message},\n${JSON.stringify(body)}\n`
    } else {
        if (level) {
            out = `${new Date().toISOString().replace('T', ' ').substring(0,23)}: ${level.toUpperCase()} => | ${message}\n`
        } else {
            out = `${new Date().toISOString().replace('T', ' ').substring(0,23)}: INFO => | ${message}\n`
        }
    }

    if (process.env.ENVIRONMENT === 'local') {
        console.log(out)
    }

    if (process.env.ENVIRONMENT === 'dev_stack') {
        fs.appendFile('/var/log/server/app.log', out, (e) => {
            if (e) {
                console.log(e)
            }
        })
    }
}

const test = () => {
    entry('just a message')
    entry('a message with a level', 'test')
    entry('a message, a level, and a body', 'test', { test: 'yo' })
    entry ('a message with a body ', null, { test: 'yo' })
}

export default {
    entry,
    test
}