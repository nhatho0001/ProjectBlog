import React , {useState} from 'react'
import { Link , useLocation , useNavigate} from 'react-router-dom';
import { Button, TextInput } from "flowbite-react";
import { Navbar } from "flowbite-react";
import { ImSearch} from "react-icons/im";
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import {
    signOut
  } from '../redux/user/userSlice';
import {
    toggleTheme
} from '../redux/theme/themeSlice'

export default function Header() {
    const path = useLocation().pathname
    const [dark , setDark] = useState(true);
    const {currentUser} = useSelector(state => state.user);
    const {theme} = useSelector(state => state.theme)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function handSignOut() {
        dispatch(signOut())
        navigate('/signin')
    }
    function handDark(){
        dispatch(toggleTheme())
    }
    return (
    <Navbar fluid rounded className='border-2 bg-white/50'> 
        <Link to = '/'> 
                <img src="./img/Logo.png" className="mr-3 h-6 sm:h-12" alt="Flowbite React Logo" />
        </Link>
        <form action="" className='w-1/5'>
            <TextInput placeholder='Search...' rightIcon={ImSearch} type='text'/>
        </form>
        
        <div className='flex md:order-2 gap-2'>
            <Button onClick={()=>{handDark()}} className='w-12 h-10 hidden sm:inline' color="gray"  pill>
                {theme === 'light' ? <FaSun/> : <FaMoon />}
            </Button>
            {currentUser ? <Dropdown arrowIcon='' inline label={<Avatar src={currentUser.photoURL} img={currentUser.photoURL} alt="avatar of Jese" rounded />} placement="bottom">
                <Dropdown.Header>
                    <span className="block text-sm">{currentUser.username}</span>
                    <span className="block truncate text-sm font-medium">{currentUser.email}</span>
                </Dropdown.Header>
                <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Item>Settings</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Item onClick={handSignOut}>Sign out</Dropdown.Item>
            </Dropdown>  :
            <Link to = '/signin'>
                <Button className='mr-1' outline gradientDuoTone="purpleToPink">
                    Sign In
                </Button>
            </Link> 
            }
            
            <Navbar.Toggle />
        </div>
         
        <Navbar.Collapse className=' dark:text-white'>
            <Navbar.Link active = {path === '/'} as = {'div'}> <Link to = '/'>Home</Link> </Navbar.Link>
            <Navbar.Link active = {path === '/about'} as={'div'}> <Link to = '/about'>About</Link></Navbar.Link>
            <Navbar.Link active = {path === '/project'} as={'div'}> <Link to ='/project'>Project</Link></Navbar.Link>
        </Navbar.Collapse>
            
    </Navbar>
    
  )
}
