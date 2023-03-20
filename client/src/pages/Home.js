import { useContext } from 'react'
import userContext from '../contexts/User'

const Home = () => {

    const user = useContext(userContext)

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
        </div>
    )
}

export default Home