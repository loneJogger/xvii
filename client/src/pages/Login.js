import SignIn from '../components/SignIn'

const Login = (props) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <SignIn passUser={props.passUser} />
        </div>
    )
}

export default Login