import React , {useEffect , useState} from 'react'
import { useSelector } from 'react-redux';
import { Button, Table , Label, TextInput , Modal } from "flowbite-react";
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUser() {
    const {currentUser} = useSelector((state)=> state.user);
    const [userData , setuserData] = useState([]);
    const [showMore , setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setuserIdToDelete] = useState('');
    async function getData() {
        if(currentUser.isAdmin){
            try {
                const response = await fetch(`/api/user/getUses` , {
                    method: 'GET'
                });
                const res = await response.json()
                if(response.ok){
                    setuserData(res.users);
                }else{
                    console.log('Get data error');
                }
            } catch (error) {
                console.log(error.message)
            }
        }else{
            console.log("Sorry! you don't allow access data")
        }
    }
    async function handShowMore() {
      const startIndex = userData.length;
      try {
        const response = await fetch(`/api/user/getUses?startIndex=${startIndex}`);
        const res = await response.json();
        if(response.ok){
          setuserData((prevalue)=> {
            return [...prevalue , ...res.users]
          })
          if(res.users.length <= 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    async function handleDeleteUser() {
      try {
        const reponse = await fetch(`/api/user/delete/${userIdToDelete}`, {
          method: 'DELETE'
        });
        if(reponse.ok){
          setuserData(prevalue => {
            return prevalue.filter((post)=> post._id !== userIdToDelete)
          })
        }else{
          console.log(reponse.message)
        }
      } catch (error) { 
        console.log(error.message)
      }
    }
    useEffect(()=>{getData()} , []);
    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>{currentUser.isAdmin> 0 && userData.length > 0 &&
            <Table hoverable className='shadow-md'>
                <Table.Head>
                    <Table.HeadCell>Date create</Table.HeadCell>
                    <Table.HeadCell>User image</Table.HeadCell>
                    <Table.HeadCell>User name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Admin</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {
                    userData.map(user => {
                        return <Table.Body key={user._id} className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                          <Table.Cell>
                            {new Date(user.updatedAt).toLocaleDateString()}
                          </Table.Cell>
                          <Table.Cell>
                              <img
                                src={user.photoURL}
                                alt={user.username}
                                className='w-10 rounded-full h-10 object-cover bg-gray-500'
                              />
                          </Table.Cell>
                          <Table.Cell className='font-medium text-gray-900 dark:text-white'>
                              {user.username}
                          </Table.Cell>
                          <Table.Cell>{user.email}</Table.Cell>
                          <Table.Cell>{user.isAdmin ? (
                                <FaCheck className='text-green-500' />
                              ) : (
                                <FaTimes className='text-red-500' />
                              )}</Table.Cell>
                          <Table.Cell>
                            <span
                              onClick={() => {
                                setShowModal(true);
                                setuserIdToDelete(user._id);
                              }}
                              className='font-medium text-red-500 hover:underline cursor-pointer'
                            >
                              Delete
                            </span>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    })
                }
            </Table>}
            {showMore && <button onClick={handShowMore} className='w-full self-center text-sm py-7 text-teal-200'>Show more</button> }
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              popup
              size='md'
            >
            <Modal.Header />
            <Modal.Body>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                  Are you sure you want to delete this user?
                </h3>
                <div className='flex justify-center gap-4'>
                  <Button color='failure' onClick={()=> {handleDeleteUser() ; setShowModal(false)}}>
                    Yes, I'm sure
                  </Button>
                  <Button color='gray' onClick={() => setShowModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
    )
}
