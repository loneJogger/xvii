import { createContext } from 'react'

const userContext = createContext({ 
    username: '',
    isLogin: false,
})

export default userContext