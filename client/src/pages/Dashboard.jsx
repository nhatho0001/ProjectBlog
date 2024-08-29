import React from 'react'
import DashProfile from '../components/DashProfile'
import DashSidebar from '../components/DashSidebar'
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
    <div className='flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      {tab === 'profile' ? <div className='mx-auto'>
        <DashProfile />
      </div> : undefined }
      
    </div>
  )
}
