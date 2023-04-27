import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import '../styles/components.css'
import '../styles/header.css'

const Header = (props) => {

    const [ ,, removeCookie ] = useCookies(['session'])

    const logout = () => {
        removeCookie('session', { path: '/' })
        props.passUser({ username: '', isLogin: false })
    }

    return (
        <div className='header-outer'>
            <div style={{width:'100%'}}>
                <a 
                    className='component-text icon-info' 
                    title='more info'
                    href='info.txt'
                    download='info.txt'
                >★</a>
            </div>
            <p className='component-text' style={{whiteSpace: 'nowrap'}}>_~\| CROCUS |/~_</p>
            <div className='header-icon-row'>
                <h2 className='component-title' style={{margin: '0px 8px'}}>
                    <Link to={'/profile'}>{props.user.username}</Link>
                </h2>
                {props.user?.isLogin && (
                    <div className='component-text' style={{display: 'flex'}}>
                        <Link 
                            className='icon-info' 
                            to={'/inbox'} 
                            style={{fontSize: '64px', lineHeight: '12px'}}
                            title='inbox'
                        >{'✉'}</Link>
                    </div>
                )}
                <a 
                    className='icon-info'
                    style={{margin: '2px 4px'}} 
                    onClick={logout}
                    title='log out'
                    href='#'
                >⏻</a>
            </div>
        </div>
    )
}

export default Header