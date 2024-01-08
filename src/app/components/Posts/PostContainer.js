import { useEffect, useState } from "react";
import { CommentsContainer } from "./CommentsContainer";

export const PostContainer = ({ post, isNotLastChild }) => {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(null);
  const [showComments, setShowComments] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
      });
  }, []);

  if (isLoading) {
    return;
  }

  function handleShowComments(e) {
    setShowComments(!showComments);
  }


  return (
    <div className="mb-5 min-w-[80%] max-w-[500px] ">
      <div className="flex items-center mb-3">
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <img src="image.png"></img>
        </div>
        <div className="ml-3 opacity-70 text-sm text-DeepPurple">
          <p className="italic">{user.username}</p>
          <p>6:30pm 11/12/23</p>
        </div>
      </div>

      <div className="bg-LightPurple text-platinum p-3 rounded-xl mb-5">
        <h1 className="font-bold pl-2 pt-1 text-xl">{post.session_name}</h1>
        <p className="pl-2 pt-1 pb-2 text">{post.description}</p>
        <hr className="mt-1 opacity-40" />
        <p className={`pl-2 pt-2 flex ${comments.length ? null : "italic"}`}>
          {comments.length ? `Comments (${comments.length})` : "No comments"}{" "}
          {comments.length ? (
            <img
              src="white-back-arrow.png"
              className={`rotate-180 ml-1 hover:cursor-pointer ${showComments ? '-rotate-90' : null}`}
              onClick={handleShowComments}
            ></img>
          ) : null}
        </p>
        {showComments ? <CommentsContainer comments={comments}/> : null}
      </div>

      {isNotLastChild ? <hr className="opacity-20" /> : null}
    </div>
  );
};
