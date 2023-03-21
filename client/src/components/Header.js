import { useCookies } from 'react-cookie'
import '../styles/components.css'
import '../styles/header.css'

const Header = (props) => {

    const [ cookies, setCookie, removeCookie ] = useCookies(['session'])

    const logout = () => {
        removeCookie('session', { path: '/' })
        props.passUser({ username: '', isLogin: false })
    }

    return (
        <div className='header-outer'>
            <a 
                className='component-text icon-info' 
                title='more info'
                href='info.txt'
                download='info.txt'
            >★</a>
            <p className='component-text'>_~\| XVII |/~_</p>
            <div className='header-icon-row'>
                <h2 className='component-title' style={{margin: '0px 8px'}}><a>{props.user.username}</a></h2>
                <a 
                    className='icon-info'
                    style={{margin: '2px 4px'}} 
                    onClick={logout}
                    title='log out'
                >⏻</a>
            </div>
        </div>
    )
}

export default Header