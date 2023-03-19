import { useCookies } from 'react-cookie'
import '../styles/components.css'
import icon_power from '../images/icon_power.png'

const Header = (props) => {

    const [ cookies, setCookie, removeCookie ] = useCookies(['session'])

    const logout = () => {
        removeCookie('session', { path: '/' })
        props.passUser({ username: '', isLogin: false })
    }

    return (
        <div className='header-outer'>
            <div className='icon-box'>
                <p className='modal-text' style={{fontSize: '36px', marginTop: '0', lineHeight: '36px'}}>★</p>
            </div>
            <p className='modal-text'>_~\| XVII |/~_</p>
            <div className='header-icon-row'>
                <h2 className='header-title'><a>{props.user.username}</a></h2>
                <div className='icon-box' onClick={logout}>
                    <img src={icon_power}/>
                </div>
            </div>
        </div>
    )
}

export default Header