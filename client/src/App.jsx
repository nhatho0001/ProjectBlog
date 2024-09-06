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
import { PrivateCreateProject } from './components/privateCreateProject'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'
import Search from './pages/Search'
function App() {
  const [count, setCount] = useState(0)
  
  return (
    <Router>
      <ScrollToTop/>
      <Header></Header>
      <Routes>
        <Route path='/' element = {<Home />}></Route>
        <Route path='/about' element = {<About/>}></Route>
        <Route path='/signin' element = {<SignIn/>}></Route>
        <Route path='/signup' element = {<SignUp/>}></Route>
        <Route path='/search' element={<Search />} />
        <Route element = {<PrivateRoute />}>
          <Route path='/dashboard' element= {<Dashboard/>}></Route>
        </Route>
        <Route element = {<PrivateCreateProject />}>
          <Route path='/create-project' element = {<CreatePost />}></Route>
          <Route path='/update-post/:postId' element = {<UpdatePost />}></Route>
        </Route>
        <Route path='/post/:postSlug' element={<PostPage></PostPage>}></Route>
        <Route path='/project' element={<Project/>}></Route>
      </Routes>
      <Footers />
    </Router>
  )
}

export default App
