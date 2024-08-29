import React , { useEffect , useState }  from 'react'
import { Sidebar } from "flowbite-react";
import { useLocation } from 'react-router-dom'
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link } from 'react-router-dom';

export default function DashSidebar() {
    const location = useLocation();
    const [tab , setTab] = useState('')
    useEffect(() => {
      const urlParagram = new URLSearchParams(location.search)
      const urlTab = urlParagram.get('tab');
      if(urlTab) setTab(urlTab)
    } , [location.search])
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Link to='/dashboard?tab=dashboard'>
          <Sidebar.Item icon={HiChartPie} as = {"div"} active={tab === "dashboard"}>
            Dashboard
          </Sidebar.Item>
        </Link>
        <Link to='/dashboard?tab=profile'>
          <Sidebar.Item icon={HiUser} as = {"div"} label="User" labelColor="dark">
            Profile
          </Sidebar.Item>
        </Link>
        <Link to='/signin'>
          <Sidebar.Item as = {"div"} icon={HiArrowSmRight}>
            Sign Out
          </Sidebar.Item>
        </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
