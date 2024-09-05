import React from 'react'
import DashProfile from '../components/DashProfile'
import DashSidebar from '../components/DashSidebar'
import DashPost from '../components/DashPost'
import DashUser from '../components/DashUsers'
import DashComments from '../components/DashComments'
import DashboardComp from '../components/DashboardComp'
import { useEffect , useState } from 'react'
import { useLocation } from 'react-router-dom'


export default function Dashboard() {
  const location = useLocation();
  const [tab , setTab] = useState('')
  useEffect(() => {
    const urlParagram = new URLSearchParams(location.search)
    const urlTab = urlParagram.get('tab');
    if(urlTab) setTab(urlTab)
  } , [location.search])
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      {tab === 'profile' ? <div className='mx-auto'>
        <DashProfile />
      </div> : undefined }
      {tab === 'post' ? <DashPost></DashPost> : undefined}
      {tab === 'users'? <DashUser></DashUser> : undefined}
      {tab === 'comments' && <DashComments />}
      {tab === 'dash' || !tab ? <DashboardComp /> : undefined}
      
    </div>
  )
}
