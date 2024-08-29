import React , {useState , useEffect}from 'react'
import { Button, TextInput , Label , Spinner } from "flowbite-react";
import { BiLogoGmail , BiLock , BiLogoGoogle , BiSolidUserCircle} from "react-icons/bi";
import { Link , useNavigate} from 'react-router-dom';
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData , setFormData] = useState({email : '' , password : ''})
  const {loading  , error : messenger} = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handChange(event){
    const {id , value} = event.target;
    setFormData(prevalue => {
      return {
        ...prevalue ,
        [id] : value.trim()
      }
    })
  }
  async function handSubmit(event){
    event.preventDefault();
    dispatch(signInStart())
    try {
      const response = await fetch('/api/auth/sigin' , 
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
      }
      )
      const res = await response.json();
      if(res.success === false){
        dispatch(signInFailure('Password is not correct!'))
      }
      if(response.ok){
        dispatch(signInSuccess(res))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
    
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex max-w-3xl gap-5 mx-auto flex-col md:flex-row md:items-center'>
        <div className='flex-1 grid justify-items-center'>
            <img src="./img/Logo.png" className="w-20 sm:h-20" alt="Flowbite React Logo" />
            <p className='text-sm mt-5 text-center'>
            Give your blog the perfect home. Get a blogspot.com domain or buy a custom domain with just a few clicks.
            </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-5' onSubmit={handSubmit}>
          {messenger ? <Alert color= "failure" icon={HiInformationCircle}>
                        <span className="font-medium">Failure!</span> {messenger}
                      </Alert> : undefined}
              <div className='mx-5 md:mx-0'>
                <Label value = 'Email'/>
                <TextInput onChange={handChange} id='email' type='email' placeholder='123@gamil.com' rightIcon={BiLogoGmail} className='min-w-72'></TextInput>
              </div>
              <div className='mx-5 mb-2 md:mx-0'>
                <Label value='Your password' />
                <TextInput
                  type='password'
                  placeholder='**********'
                  id='password'
                  rightIcon={BiLock}
                  onChange={handChange}
                />
              </div>
              <div className='flex flex-col mx-5 md:mx-0'>
                <Button type='submit' className='mr-1 mb-3' outline gradientDuoTone="purpleToPink" disabled={loading}>
                      {loading ? <>
                        <Spinner size='sm' />
                        <span className='pl-3'>Loading...</span>
                      </> : "Sign In"}
                </Button>
                <OAuth></OAuth>
                <div className='flex gap-2 text-sm'>
                  <span>Don't have an account?</span>
                  <Link to='/signUp' className='text-blue-500'>
                    Sign Up
                  </Link>
                </div>
              </div>
          </form>
            
        </div>
        
      </div>
    </div>
    
  )
}
