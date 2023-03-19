import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import Login from './pages/Login'
import Home from './pages/Home'
import userContext from './contexts/User'
import './styles/main.css'

const App = () => {

  const [ user, setUser ] = useState({ username: '', isLogin: false })

  return (
    <div>
    <userContext.Provider value={user}>
    <CookiesProvider>
    <Router>
      <Switch>
        <Route exact path='/' render={() => (
          <>
          {user.isLogin ? (
            <Home />
          ) : (
            <Login passUser={setUser} />
          )}
          </>
        )} />
      </Switch>
    </Router>
    </CookiesProvider>
    </userContext.Provider> 
    </div>
  )
}

export default App