import { useEffect, useState } from "react";
import { CommentsContainer } from "./CommentsContainer";
import Link from "next/link";
import axios from 'axios'

export const PostContainer = ({ post, isNotLastChild }) => {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComments] = useState('')
  const [showAddComments, setShowAddComments] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`/api/users/${post.user_id}`),
      fetch(`/api/posts/${post.post_id}/comments`),
    ])
      .then(([res, res2]) => {
        return Promise.all([res.json(), res2.json()]);
      })
      .then(([userData, commentsData]) => {
        setUser(userData);
        setComments(commentsData);
        setIsLoading(false);
        if(sessionStorage.getItem('user_id')){
          setShowAddComments(true)
        }
      });
  }, []);

  if (isLoading) {
    return;
  }

  function handleShowComments(e) {
    setShowComments(!showComments);
  }

  function convertToDateString(str){
    const date = str.slice(8,10) + '/' + str.slice(5,7) + '/' + str.slice(0,4)
    const time = str.slice(11,16)
    
    return {time, date}
  }

  function handleNewComment(e){
    setNewComments(e.target.value)
  } 

  function handleSubmit(e) {
    e.preventDefault()
    const commentData = {
      post_id: post.post_id,
      body: newComment,
      user_id: parseInt(sessionStorage.getItem('user_id'))
    }
    setComments((prevVals) => [...prevVals, commentData])
    axios.post('/api/comments', commentData).then((res)=>{
      setNewComments('')
    })
  }

  return (
    <div className="mb-5 min-w-[80%] max-w-[500px] ">
      <div className="flex items-center mb-3">
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <img src="image.png"></img>
        </div>
        <div className="ml-3 opacity-50 text-sm text-DeepPurple">
          <Link href={`/profile/${user.username}`} className="flex w-fit">
            <p className="italic hover:underline">{user.username}</p>
          </Link>
          <p>{convertToDateString(post.completed_at).time} | {convertToDateString(post.completed_at).date}</p>
        </div>
      </div>

      <div className="bg-LightPurple text-platinum p-3 rounded-xl mb-5">
        <h1 className="font-bold pl-2 pt-1 text-xl">{post.session_name}</h1>
        <p className="pl-2 pt-1 pb-2 text">{post.description}</p>
        <hr className="mt-1 opacity-40" />
        {showAddComments ? 
        <form onSubmit={handleSubmit} className='flex justify-center items-center pt-3'>
          <input type="text" className='text-DeepPurple p-1 rounded-lg w-full' name="comment" id="comment" value={newComment} onChange={handleNewComment} placeholder='New Comment...'/>
          <button><img
              src="white-back-arrow.png"
              className={`ml-1 -rotate-180`}/></button>
        </form> : null
        }
        <p className={`pl-2 pt-2 flex ${comments.length ? null : "italic"}`}>
          {comments.length ? `Comments (${comments.length})` : "No comments"}{" "}
          {comments.length ? (
            <img
              src="white-back-arrow.png"
              className={`ml-1 hover:cursor-pointer transition-[0.15s] ${
                showComments ? "-rotate-90" : "-rotate-180"
              }`}
              onClick={handleShowComments}
            ></img>
          ) : null}
        </p>
        {showComments ? <CommentsContainer comments={comments} /> : null}
      </div>

      {isNotLastChild ? <hr className="opacity-20" /> : null}
    </div>
  );
};
