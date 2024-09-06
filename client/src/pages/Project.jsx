import React from 'react'
import { Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

export default function Project() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen max-w-2xl gap-12 flex flex-col justify-center items-center mx-auto'>
      <h1 className='text-3xl font-serif font-black'>Technologies Used</h1>
      <div className='flex flex-wrap gap-6 justify-center'>
        <img className='w-20 h-20 rounded-full' src="https://techvccloud.mediacdn.vn/2018/11/23/js-15429579443112042672363-crop-1542957949936317424252.png" alt="javascripts" />
        <img className='w-20 h-20 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmSBIKnYCSnXEpjbOjjRc7JPjE2015ofHyjg&s" alt="html" />
        <img className='w-20 h-20 rounded-full' src="https://www.drupal.org/files/project-images/screenshot_361.png" alt="tailwind" />
        <img className='w-20 h-20 rounded-full' src="https://opensource.fb.com/img/projects/react.jpg" alt="React" />
        <img className='w-20 h-20 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbT3XP5MihcHcUVUKb764VxoZgcGHsAD_1VQ&s" alt="Mongodb" />
        <img className='w-20 h-20 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbSd9iLK6WvXyGT2L2P1x36yrhgQjLdjVANA&s" alt="express" />
        <img className='w-20 h-20 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwh-2btrw1P54k-yIKqG_lsB_SVc48vGzWZQ&s" alt="redux" />
        <img className='w-20 h-20 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe47gQSHtg9oUYA-BqcfeeEo8xP1q4qkQxng&s" alt="fire base" />
      </div>
      <Button gradientDuoTone="purpleToBlue" onClick={()=>{navigate('/')}}>Get Started</Button>
    </div>
  )
}
