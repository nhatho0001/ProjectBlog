import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Project from './pages/Project'
import Dashboard from './pages/Dashboard'
import './App.css'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Header from './components/Header'
import Footers from './components/Footer'
import PrivateRoute from './components/privateRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path='/' element = {<Home />}></Route>
        <Route path='/about' element = {<About/>}></Route>
        <Route path='/signin' element = {<SignIn/>}></Route>
        <Route path='/signup' element = {<SignUp/>}></Route>
        <Route element = {<PrivateRoute />}>
          <Route path='/dashboard' element= {<Dashboard/>}></Route>
        </Route>
        <Route path='/project' element={<Project/>}></Route>
      </Routes>
      <Footers />
    </Router>
  )
}

export default App
