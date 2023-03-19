import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'
import ScaleLoader from 'react-spinners/ScaleLoader'

import Button from './Button'
import { login, create } from '../api/user'

const OuterShell = styled.div`
        display: flex;
        background-color: #fceef2;
        box-shadow: 0px 0px 32px 8px rgba(252, 238, 242, 0.8);
        width: 30%;
        height: 320px;
    `

const Shell = styled.div`
    margin: 8px;
    padding: 8px;
    color: #110307;
    background-color: #fceef2;
    border: 1px solid #110307;
    display: flex;
    flex-direction: column;
    width: 100%;
    & > h2 {
        font-size: 32px;
        font-family: 'Terminal';
        margin: 8px;
        text-align: center;
    }
    & > div {
        display: flex;
        flex-direction: column;
        margin: 8px 8px;
    }
    & > div > label {
        font-size: 16px;
        font-family: 'Anon';
    }
    & > div > input {
        margin-bottom: 8px;
        padding: 4px;
        border: none;
        color: #fceef2;
        background-color: #110307;
        font-family: 'Anon';

    }
    & > div > div {
        display: flex;
        justify-content: space-between;
    }
    & > hr {
        color: #110307;
        background-color: #110307;
        margin-left: 0;
        margin-right: 0;
    }
    & > p {
        font-size: 16px;
        font-family: 'Anon';
        margin: 8px;
        text-align: center;
    }
`

const SignIn = props => {

    const [ page, setPage ] = useState(0)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ loginRes, setLoginRes ] = useState({})
    const [ error, setError ] = useState('')
    const [ message, setMessage ] = useState('')

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ newUser, setNewUser ] = useState('')
    const [ newPass, setNewPass ] = useState('')

    const [ user, setUser ] = useState({ username: '', isLogin: false })

    const [ cookies, setCookie ] = useCookies(['session'])

    useEffect(() => {
        console.log(loginRes)
        if (loginRes && loginRes.type === 'success') {
            setCookie('session', loginRes.session, { path: '/' })
            props.passUser({ username: username, isLogin: true })
            setMessage(loginRes.message)
            setIsLoading(false)
        } else if (loginRes && loginRes.type !== 'success') {
            setError(loginRes.message)
            setIsLoading(false)
        }
    }, [loginRes])

    const clearValues = () => {
        setUsername('')
        setPassword('')
        setNewUser('')
        setNewPass('')
    }

    const submitLogin = async () => {
        setPage(2)
        setIsLoading(true)
        setLoginRes( await login(username, password))
    }

    const submitCreate = async () => {
        setPage(2)
        setIsLoading(true)
        const createAttempt = await create(newUser, newPass)
        if (createAttempt.type === 'success') {
            setMessage(createAttempt.message)
            setIsLoading(false)
        } else {
            setError(createAttempt.error)
            setIsLoading(false)
        }
    }

    return (
        <OuterShell>
            <Shell>
                <>
                {page === 0 && (
                        <>
                        <h2>Log In</h2>
                        <hr />
                        <div>
                            <label>username</label>
                            <input value={username} onChange={(e) => { setUsername(e.target.value) }} />
                            <label>password</label>
                            <input value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <div>
                                <Button execute={clearValues}>Clear</Button>
                                <Button execute={submitLogin}>Submit</Button>
                            </div>
                        </div>
                        <hr />
                        <p>Need to make an account? <a onClick={() => {setPage(1)}}>Create one here</a>.</p>
                        </>
                    )}
                    {page === 1 && (
                        <>
                        <h2>Create a New User</h2>
                        <hr />
                        <div>
                            <label>username</label>
                            <input value={newUser} onChange={(e) => { setNewUser(e.target.value) }} />
                            <label>password</label>
                            <input value={newPass} onChange={(e) => { setNewPass(e.target.value) }} />
                            <div>
                                <Button execute={clearValues}>Clear</Button>
                                <Button execute={submitCreate}>Submit</Button>
                            </div>
                        </div>
                        <hr />
                        <p><a onClick={() => {setPage(0)}}>Return to Log In</a></p>
                        </>
                    )}
                    {page === 2 && (
                        <>
                         <div style={{display: 'flex', height: '100%', justifyContent: 'center'}}>
                            {isLoading ? (
                                <ScaleLoader
                                color={'#110307'}
                                height={70}
                                width={8}
                                speedMultiplier={0.67}
                                cssOverride={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            />
                            ) : (
                                <></>
                            )}
                        </div>
                        <div>
                            {message && (
                                <>
                                <p>{message}</p>
                                <div>
                                    <p><a onClick={() => {setPage(0)}}>Return to Log In</a></p>
                                </div>
                                </>
                            )}
                            {error && (
                                <>
                                <p>{error}</p>
                                <div>
                                <p><a onClick={() => {setPage(0)}}>Retry</a></p>
                                </div>
                                </>
                            )}
                        </div>
                        </>
                    )}
                </>
            </Shell>
        </OuterShell>
    )

}

export default SignIn