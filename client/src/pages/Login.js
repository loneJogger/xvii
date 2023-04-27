import { useState } from 'react'
import LogInModal from '../components/LogInModal'
import '../styles/page.css'
import '../styles/button.css'
import '../styles/modal.css'

const Login = (props) => {

    const [ isModal, setIsModal ] = useState(false) 

    return (
        <div>
            {isModal && (
                <div className='modal-screen'>
                    <LogInModal 
                        passUser={props.passUser} 
                        controlIsModal={(choice) => setIsModal(choice)}
                    />
                </div>
            )}
            <div className='page-body'>
                <h1 className='page-title'>welcome to crocus</h1>
                <p className='page-title'>please log in, or create an account.</p>
                <div style={{textAlign: 'center'}}>
                    <div className='button-outer'>
                        <button 
                            className='button-inner' 
                            style={{fontSize: '24px'}}
                            onClick={() => setIsModal(true)}
                        >Log In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login