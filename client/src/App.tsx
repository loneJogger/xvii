import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import userContext from './contexts/User'
import Header from './components/Header'
import Chat from './components/Chat'

import Login from './pages/Login'
import Home from './pages/Home'
import Inbox from './pages/Inbox'
import Test from './pages/Test'

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
                <div>profile</div>
              ) : (
                <Login passUser={setUser} />
              )}
              </>
            )} />
            <Route exact path='/inbox' render={() => (
              <>
              {user.isLogin ? (
                <Inbox />
              ) : (
                <Login passUser={setUser} />
              )}
              </>
            )} />
            <Route exact path='/test' render={() => (
              <Test />
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
