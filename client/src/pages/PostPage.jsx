import React ,{useEffect , useState} from 'react'
import { Spinner } from 'flowbite-react';
import {useParams , Link} from "react-router-dom"
import { Button } from 'flowbite-react';
import CommentSection from '../components/CommentSection';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';

export default function PostPage() {
    const {currentUser} = useSelector(state => state.user)
    const {postSlug} = useParams();
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [loading , setLoading] = useState(false)
    const [recentPosts, setRecentPosts] = useState(null);
    async function getData() {
        try {
            setLoading(true)
            const response = await fetch(`/api/post/getPost?slug=${postSlug}`)
            const res = await response.json();
            if(response.ok){
                setPost(res.posts[0]);
                setLoading(false)
                setError(false)
            }else{
                setError(true)
                setError(true);
            }
        } catch (error) {
            setLoading(false)
            console.log(error.message)
        }
    }
    useEffect(()=>{ getData();
    } , [postSlug])
    
  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getPost?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
    if(loading){
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl'/>
            </div>
        )
    }
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>
        <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
            <Button color='gray' pill size='xs'>{post && post.category}</Button>
        </Link>
        <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 400).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <CommentSection postId={post && post._id}/>
      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex min-w-max flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  )
}
