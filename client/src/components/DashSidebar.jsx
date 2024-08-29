import React , { useEffect , useState }  from 'react'
import { Sidebar } from "flowbite-react";
import { useLocation } from 'react-router-dom'
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function DashSidebar() {
    const {currentUser} = useSelector((state) => state.user)
    const location = useLocation();
    const [tab , setTab] = useState('')
    useEffect(() => {
      const urlParagram = new URLSearchParams(location.search)
      const urlTab = urlParagram.get('tab');
      if(urlTab) setTab(urlTab)
    } , [location.search])
    async function handSignOut() {
      try {
          const response = await fetch('/api/user/signout' , {
              method: 'DELETE'
          })
          const res = response.json();
          dispatch(signOutSuccess())
          console.log(res)
      } catch (error) {
          dispatch(signOutFailure(error.message))
          console.log('fail')
      }
  }
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        {currentUser.isAdmin ? <Link to='/dashboard?tab=dashboard'>
          <Sidebar.Item icon={HiChartPie} as = {"div"} active={tab === "dashboard"}>
            Dashboard
          </Sidebar.Item>
        </Link> : undefined }
        <Link to='/dashboard?tab=profile'>
          <Sidebar.Item icon={HiUser} as = {"div"} label="User" labelColor="dark">
            Profile
          </Sidebar.Item>
        </Link>
        <Link to='/signin'>
          <Sidebar.Item as = {"div"} icon={HiArrowSmRight} onClick = {handSignOut}>
            Sign Out
          </Sidebar.Item>
        </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
