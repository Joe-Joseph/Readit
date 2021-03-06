import { useEffect, useState } from "react"
import Head from 'next/head'
import axios from "axios"
import Link from "next/link";
import moment from "moment"

import { Post } from "../types";


const Home = () => {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const posts = await axios.get('/posts')
      setPosts(posts.data.data)
      } catch (error) {
        console.log("Error>>>>>>", error)
      }
    }

    fetchPosts()
    
  }, [])
  return (
    <div className="pt-12">
      <Head>
        <title>Readit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex pt-4">
        {/* Posts starts from here */}
        <div className="w-160">
          {posts?.map(post => (
            <div key={post.identifier} className="flex mb-4 bg-white rounded">
               {/* Vote section */}
               <div className="w-10 text-center bg-gray-200 rounded-l">
                 <p>V</p>
               </div>

               {/* Post data section */}
               <div className="w-full p-2">
                 <div className="flex items-center">
                   <Link href={`/r/${post.subName}`}>
                     <>
                     <img
                      src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y"
                      className="w-6 h-6 mr-1 rounded-full cursor-pointer"
                    />
                    <a
                      href={`/r/${post.subName}`}
                      className="text-xs font-bold hover:underline">
                        {post.subName}
                    </a>
                    </>
                   </Link>

                   <p className="text-xs text-gray-600">
                     . posted by
                     <Link href={`/u/${post.username}`}>
                       <a className="mx-1 hover:underline">
                         {post.username} 
                       </a>
                     </Link>

                     <Link href={post.url}>
                       <a className="mx-1 hover:underline">
                         {moment(post.createdAt).fromNow()}
                       </a>
                     </Link>
                   </p>
                 </div>
                 <Link href={post.url}>
                   <a className="my-1 text-lg font-medium">{post.title}</a>
                 </Link>
                 {post.body && <p className="my-1 text-sm">{post.body}</p>}

                 <div className="flex">
                   <Link href={post.url}>
                     <a>
                       <div className="px-1 py-1 mr-2 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                         <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                         <span className="font-blod">20 Comments</span>
                       </div>
                     </a>
                   </Link>

                   <div className="px-1 py-1 mr-2 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                         <i className="mr-1 fas fa-share fa-xs"></i>
                         <span className="font-blod">Share</span>
                       </div>

                    <div className="px-1 py-1 mr-2 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                      <i className="mr-1 fas fa-bookmark fa-xs"></i>
                      <span className="font-blod">Save</span>
                    </div>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
