import React , { useEffect , useState }  from 'react'
import { Sidebar } from "flowbite-react";
import { useLocation } from 'react-router-dom'
import { HiArrowSmRight, HiChartPie, HiInbox, HiAnnotation ,HiShoppingBag, HiTable, HiUser, HiDocumentText , HiOutlineUserGroup, } from "react-icons/hi";
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
        <Link to='/dashboard?tab=profile'>
          <Sidebar.Item icon={HiUser} as = {"div"} label={currentUser.isAdmin ? "Admin" : "User"} labelColor="dark">
            Profile
          </Sidebar.Item>
        </Link>
        {currentUser.isAdmin ? <Link to='/dashboard?tab=dash'>
          <Sidebar.Item icon={HiChartPie} as = {"div"} active={tab === "dash" || !tab}>
            Dashboard
          </Sidebar.Item>
        </Link> : undefined }
        {currentUser.isAdmin ? <Link to='/dashboard?tab=post'>
          <Sidebar.Item icon={HiDocumentText} as = {"div"} active={tab === "post"}>
            Posts
          </Sidebar.Item>
        </Link> : undefined }
        {currentUser.isAdmin ? <Link to='/dashboard?tab=users'>
          <Sidebar.Item icon={HiOutlineUserGroup} as = {"div"} active={tab === "users"}>
            Users
          </Sidebar.Item>
        </Link> : undefined }
        {currentUser.isAdmin ? <Link to='/dashboard?tab=comments'>
          <Sidebar.Item icon={HiAnnotation } as = {"div"} active={tab === "comments"}>
            Comment
          </Sidebar.Item>
        </Link> : undefined }
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
