import React , {useState , useEffect}from 'react'
import { Button, TextInput , Label , Spinner } from "flowbite-react";
import { BiLogoGmail , BiLock , BiLogoGoogle , BiSolidUserCircle} from "react-icons/bi";
import { Link , useNavigate} from 'react-router-dom';
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

export default function SignIn() {
  const [formData , setFormData] = useState({username : '' , email : '' , password : ''})
  const [checkPost , setCheckpost] = useState(true);
  const [messenger , setMess] = useState('')
  const [loading , setLoading]= useState(false)
  const navigate = useNavigate()
  function handChange(event){
    const {id , value} = event.target;
    setFormData(prevalue => {
      return {
        ...prevalue ,
        [id] : value
      }
    })
  }
  async function handSubmit(event){
    setLoading(true)
    console.log(formData)
    event.preventDefault();
    try {
      const response = await fetch('/api/auth/signup' , {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })
    const res = await response.json()
    if(res.success === false){
      setCheckpost(false)
      setMess(res.message)
    }
    if(response.ok){
      navigate('/signin')
    }
    setLoading(false)
  } catch (error) {
    setLoading(false)
    setMess(error.message)
  }
  }

  return (
    <div className='min-h-screen mt-24'>
      <div className='flex max-w-4xl gap-10 mx-auto flex-col md:flex-row md:items-center'>
        <div className='flex-1 grid justify-items-center'>
            <img src="./img/Logo.png" className="w-24 h-30 pt-5" alt="Flowbite React Logo" />
            <p className='text-sm mt-5 text-center'>
            Give your blog the perfect home. Get a blogspot.com domain or buy a custom domain with just a few clicks.
            </p>
        </div>
        <div className='flex-1'>
          {!checkPost ? <Alert color= "failure" icon={HiInformationCircle}>
                        <span className="font-medium">Failure!</span> {messenger}
                      </Alert> : undefined}
          <form className='flex flex-col gap-1' onSubmit={handSubmit}>
          <div className='mb-5 mx-5 md:mx-0'>
              <Label value='Username' />
              <TextInput
                type='text'
                placeholder='User name'
                id='username'
                rightIcon={BiSolidUserCircle}
                onChange={handChange}
              />
            </div>
            <div className='mb-5 mx-5 md:mx-0'>
              <Label value = 'Email'/>
              <TextInput onChange={handChange} id='email' type='email' placeholder='123@gamil.com' rightIcon={BiLogoGmail} className='min-w-72'></TextInput>
            </div>
            <div className='mb-5 mx-5 md:mx-0'>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                rightIcon={BiLock}
                onChange={handChange}
              />
            </div>
            <div className='flex flex-col mb-5 mx-5 md:mx-0'>
                <Button type='submit' className='mr-1' outline gradientDuoTone="purpleToPink" disabled={loading}>
                    {loading ? <>
                      <Spinner size='sm' />
                      <span className='pl-3'>Loading...</span>
                    </> : "Sign Up"}
              </Button>
              <div className='flex gap-2 text-sm'>
                <span>Have an account?</span>
                <Link to='/signIn' className='text-blue-500'>
                  Sign In
                </Link>
              </div>
            </div>
            <div className='flex flex-col mx-5 md:mx-0'>
              <Button gradientMonochrome="failure">
                <BiLogoGoogle size={20}/> 
              </Button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
    
  )
}
