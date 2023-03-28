import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import userContext from './contexts/User'
import Header from './components/Header'
import Chat from './components/Chat'
import Login from './pages/Login'
import Home from './pages/Home'

import './styles/main.css'

const App = () => {

  const [ user, setUser ] = useState({ username: '', isLogin: false })

  return (
    <Router>
      <userContext.Provider value={user}>
        <CookiesProvider>
          <Header user={user} passUser={setUser}/>
          <Switch>
            <>
            <Route exact path='/' render={() => (
              <>
              {user.isLogin ? (
                <Home />
              ) : (
                <Login passUser={setUser} />
              )}
              </>
            )} />
            <Route exact path='/profile' render={() => (
              <>
              {user.isLogin ? (
                <div></div>
              ) : (
                <Login passUser={setUser} />
              )}
              </>
            )} />
            </>
          </Switch>
          <Chat user={user} />
        </CookiesProvider>
      </userContext.Provider> 
    </Router>
  )
}

export default App