import React , {useEffect , useState} from 'react'
import { useSelector } from 'react-redux';
import { Button, Table , Label, TextInput , Modal } from "flowbite-react";
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPost() {
    const {currentUser} = useSelector((state)=> state.user);
    const [postData , setPostData] = useState([]);
    const [showMore , setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');
    async function getData() {
        if(currentUser.isAdmin){
            try {
                const response = await fetch(`/api/post/getPost?userId=${currentUser._id}` , {
                    method: 'GET'
                });
                const res = await response.json()
                if(response.ok){
                    setPostData(res.posts);
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
      const startIndex = postData.length;
      try {
        const response = await fetch(`/api/post/getPost?userId=${currentUser._id}&startIndex=${startIndex}`);
        const res = await response.json();
        if(response.ok){
          setPostData((prevalue)=> {
            return [...prevalue , ...res.posts]
          })
          if(res.posts.length <= 9){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    async function handleDeletePost() {
      try {
        const reponse = await fetch(`/api/post/delete/${postIdToDelete}`, {
          method: 'DELETE'
        });
        if(reponse.ok){
          setPostData(prevalue => {
            return prevalue.filter((post)=> post._id !== postIdToDelete)
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
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>{currentUser.isAdmin> 0 && postData.length > 0 &&
            <Table hoverable className='shadow-md'>
                <Table.Head>
                    <Table.HeadCell>Date update</Table.HeadCell>
                    <Table.HeadCell>Post image</Table.HeadCell>
                    <Table.HeadCell>Post title</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                {
                    postData.map(post => {
                        return <Table.Body key={post._id} className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                          <Table.Cell>
                            {new Date(post.updatedAt).toLocaleDateString()}
                          </Table.Cell>
                          <Table.Cell>
                            <Link to={`/post/${post.slug}`}>
                              <img
                                src={post.image}
                                alt={post.title}
                                className='w-20 h-10 object-cover bg-gray-500'
                              />
                            </Link>
                          </Table.Cell>
                          <Table.Cell>
                            <Link
                              className='font-medium text-gray-900 dark:text-white'
                              to={`/post/${post.slug}`}
                            >
                              {post.title}
                            </Link>
                          </Table.Cell>
                          <Table.Cell>{post.category}</Table.Cell>
                          <Table.Cell>
                            <span
                              onClick={() => {
                                setShowModal(true);
                                setPostIdToDelete(post._id);
                              }}
                              className='font-medium text-red-500 hover:underline cursor-pointer'
                            >
                              Delete
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            <Link
                              className='text-teal-500 hover:underline'
                              to={`/update-post/${post._id}`}
                            >
                              <span>Edit</span>
                            </Link>
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
                  Are you sure you want to delete this post?
                </h3>
                <div className='flex justify-center gap-4'>
                  <Button color='failure' onClick={()=> {handleDeletePost() ; setShowModal(false)}}>
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
