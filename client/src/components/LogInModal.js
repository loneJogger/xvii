import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import ScaleLoader from 'react-spinners/ScaleLoader'

import Button from './Button'
import { login, create, checkSession } from '../api/user'
import '../styles/components.css'
import '../styles/modal.css'

const LogInModal = props => {

    const [ page, setPage ] = useState(0)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ showPass, setShowPass ] = useState(false)
    const [ loginRes, setLoginRes ] = useState({})
    const [ createRes, setCreateRes ] = useState({})
    const [ checkSessRes, setCheckSessRes ] = useState({})
    const [ error, setError ] = useState('')
    const [ message, setMessage ] = useState('')

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ newUser, setNewUser ] = useState('')
    const [ newPass, setNewPass ] = useState('')
    const [ confirmPass, setConfirmPass ] = useState('')

    const [ cookies, setCookie ] = useCookies(['session'])

    useEffect(() => {
        const getSession = async () => {
            if (cookies.session) {
                setCheckSessRes(await checkSession(cookies.session))
            }
        }
        getSession()
    }, [])

    useEffect(() => {
        if (checkSessRes && checkSessRes.type === 'success') {
            props.passUser({ username: checkSessRes.user.username, isLogin: true })
        }
    }, [checkSessRes])

    useEffect(() => {
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

    useEffect(() => {
        if (createRes && createRes.type === 'success') {
            setMessage(createRes.message)
            setIsLoading(false)
        } else if (createRes && createRes.type !== 'success') {
            setError(createRes.message)
            setIsLoading(false)
        }
    }, [createRes])

    const clearValues = () => {
        setUsername('')
        setPassword('')
        setNewUser('')
        setNewPass('')
        setConfirmPass('')
    }

    const submitLogin = async () => {
        setPage(2)
        setIsLoading(true)
        setLoginRes( await login(username, password))
    }

    const submitCreate = async () => {
        if (verifyNewUser() === 0) {
            setPage(2)
            setIsLoading(true)
            setCreateRes(await create(newUser, newPass))
        }
    }

    const verifyNewUser = () => {
        if (!newUser || !newPass) {
            return 1
        }
        if (newPass !== confirmPass) {
            return 2
        }
        if (newPass.length < 7) {
            return 3
        }
        return 0
    }

    const toggleShowPass = () => { setShowPass(!showPass) }

    return (
        <div className='modal-container'>
            <div className='modal-header'>
                <a 
                    className='icon-info modal-close' 
                    onClick={() => props.controlIsModal(false)}
                >✕</a>
            </div>
            <div className='modal-outer'>
                <div className='modal-inner'>
                    <>
                    {page === 0 && (
                            <>
                            <h2 className='component-title'>Log In</h2>
                            <hr className='modal-rule'/>
                            <div className='modal-body'>
                                <label className='modal-label'>username</label>
                                <input className='modal-input' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                                <label className='modal-label'>password</label>
                                <div style={{display: 'flex'}}>
                                    <input 
                                        type={showPass ? ('text') : ('password')}
                                        style={{width: '100%'}}
                                        className='modal-input' 
                                        value={password} 
                                        onChange={(e) => { setPassword(e.target.value) }} 
                                    />
                                    <button
                                        className='modal-input-button'
                                        onClick={toggleShowPass}
                                    >{showPass ? ('hide') : ('show')}</button>
                                </div>
                                <div className='modal-button-row'>
                                    <Button execute={clearValues}>Clear</Button>
                                    <Button execute={submitLogin}>Submit</Button>
                                </div>
                            </div>
                            <hr className='modal-rule'/>
                            <p className='component-text'>Need to make an account? <a onClick={() => {setPage(1)}}>Create one here</a>.</p>
                            </>
                        )}
                        {page === 1 && (
                            <>
                            <h2 className='component-title'>Create a New User</h2>
                            <hr className='modal-rule'/>
                            <div className='modal-body'>
                                <label className='modal-label'>username</label>
                                <input className='modal-input' value={newUser} onChange={(e) => { setNewUser(e.target.value) }} />
                                <label className='modal-label'>password</label>
                                <div style={{display: 'flex'}}>
                                    <input 
                                        type={showPass ? ('text') : ('password')}
                                        style={{width: '100%'}}
                                        className='modal-input' 
                                        value={newPass} 
                                        onChange={(e) => { setNewPass(e.target.value) }} 
                                    />
                                    <button
                                        className='modal-input-button'
                                        onClick={toggleShowPass}
                                    >{showPass ? ('hide') : ('show')}</button>
                                </div>
                                <label className='modal-label'>confirm password</label>
                                <div style={{display: 'flex'}}>
                                    <input 
                                        type={showPass ? ('text') : ('password')}
                                        style={{width: '100%'}}
                                        className='modal-input' 
                                        value={confirmPass} 
                                        onChange={(e) => { setConfirmPass(e.target.value) }} 
                                    />
                                </div>
                                <div className='modal-button-row'>
                                    <Button execute={clearValues}>Clear</Button>
                                    <Button execute={submitCreate}>Submit</Button>
                                </div>
                            </div>
                            <hr className='modal-rule'/>
                            <p className='component-text'><a onClick={() => {setPage(0)}}>Return to Log In</a></p>
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
                                    <p className='component-text'>{message}</p>
                                    <div>
                                        <p className='component-text'><a onClick={() => {setPage(0)}}>Return to Log In</a></p>
                                    </div>
                                    </>
                                )}
                                {error && (
                                    <>
                                    <p className='component-text'>{error}</p>
                                    <div>
                                        <p className='component-text'><a onClick={() => {setPage(0)}}>Retry</a></p>
                                    </div>
                                    </>
                                )}
                            </div>
                            </>
                        )}
                    </>
                </div>
            </div>
        </div>
    )
}

export default LogInModal