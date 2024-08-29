import React , {useState ,useEffect ,useRef}from 'react'
import { useSelector } from 'react-redux'
import { Label, TextInput , Modal } from "flowbite-react";
import { Button } from "flowbite-react";
import { getStorage } from "firebase/storage";
import { app } from '../Firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Alert } from 'flowbite-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { upDate , deleteAccountSuccess , deleteAccountFailuer, deleteAccountStart , signOutSuccess, signOutFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function DashProfile() {
    const storage = getStorage(app)
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const {currentUser} = useSelector(state => state.user);
    const [imageFile , setImgFile] = useState(null)
    const [imageUrl , setImgUrl] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [openDelete , setOpenDelete] = useState(false)
    const [formData , setInfo] = useState({})
    const filePickerRef = useRef();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function handChange(event){
        const {id , value} = event.target;
        setInfo(prevalue => {
            return {
                ...prevalue,
                [id] : value
            }
        })
    }
    function changeImg(event){
        const file = event.target.files[0];
        if(file){
            setImgFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
    useEffect(() => {
        if (imageFile) {
            uploadImg();
        }
      }, [imageFile]);
    function uploadImg(){
        const namefile = currentUser.username + new Date().getTime() + imageFile.name
        const storageRef = ref(storage, `files/${namefile}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on("state_changed",
            (snapshot) => {
              const progress =
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setImageFileUploadProgress(progress.toFixed(0));
            },(error) => {
                setImageFileUploadError('Could not upload image (File must be less than 2MB)');
                setImageFileUploadProgress(null);
                setImgUrl(null);
                imageFileUrl(null)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setImgUrl(downloadURL)
                  setInfo(prevalue => {
                    return {
                        ...prevalue,
                        photoURL : downloadURL
                    }
                  })
                });
            }
        )
    }
    async function updateData(event){
        event.preventDefault();
        setImageFileUploadProgress(null)
        const data = formData
        if(Object.keys(data).length === 0) return;
        try {
            const result = await fetch(`/api/user/upload/${currentUser._id}` , {
                method : 'PUT',
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
            );
            const res =  await result.json()
            console.log(res)
            if(res.success === false) {setImageFileUploadError(res.message);}
            if(result.ok) {
                dispatch(upDate(res)) ;
            }
        } catch (error) {;
            setImageFileUploadError("Error when update data")
        }
        
        
    }
    function handOpenDeleteModel(){
        dispatch(deleteAccountStart());
        setOpenDelete(true)
    }
    async function deleteAccount() {
        setOpenDelete(false);
        try {
            const response = await fetch(`/api/user/delete/${currentUser._id}`,{
                method : 'DELETE'
            });
            console.log(response)
            dispatch(deleteAccountSuccess())
            navigate('/signin')
        } catch (error) {
            dispatch(deleteAccountFailuer())
        }
    }

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
        <div className='py-20 mx-auto min-w-96 gap-4 max-w-xl'>
            <h1 className='text-5xl text-center'>Profile</h1>
           <div className='relative flex justify-center'> 
                <input type="file" name="avartarImg" accept="image/*" onChange={changeImg} ref = {filePickerRef} hidden/>
                <div className='w-32 h-32'>
                    {imageFileUploadProgress && (
                            <CircularProgressbar
                            value={imageFileUploadProgress || 0}
                            text={`${imageFileUploadProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                },
                                path: {
                                stroke: `rgba(62, 152, 199, ${
                                    imageFileUploadProgress / 100
                                })`,
                                },
                            }}
                            />
                        )}
                    <img src={imageFileUrl? imageFileUrl : currentUser.photoURL} alt="Avatar" className={`w-full h-full rounded-full border-8 border-[lightgray] ${imageFileUploadProgress&& imageFileUploadProgress<100&&'opacity-60'}`} onClick={() => {filePickerRef.current.click()}} />
                </div> 
           </div>
           {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}
            <form className="flex min-w-md flex-col gap-4" onSubmit={updateData}>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="username" value="User name" />
                    </div>
                    <TextInput id="username" type="text" sizing="sm" defaultValue={currentUser.username} onChange={handChange}/>
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput id="email" type="text" sizing="sm" defaultValue={currentUser.email} onChange={handChange}/>
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="password" value="Password" />
                    </div>
                    <TextInput id="password" type="text" sizing="sm" />
                </div>
                <Button type='submit' outline gradientDuoTone="purpleToPink">
                    Update
                </Button>
            </form>
            <Modal show={openDelete} onClose={()=>{setOpenDelete(false)}}>
                <Modal.Header>Delete account</Modal.Header>
                <Modal.Body>
                    <p>Are you sure?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={()=>{setOpenDelete(false)}}>
                        Cancel
                    </Button>
                    <Button color="failure" onClick={deleteAccount} > Delete</Button>
                </Modal.Footer>
            </Modal>
            <div className='flex justify-between text-red-600'>
                <span onClick={handOpenDeleteModel} className='cursor-pointer'>Delete Acoount</span>
                <span onClick={handSignOut} className='cursor-pointer'>Sign out</span>
            </div>
        </div>
  )
}
