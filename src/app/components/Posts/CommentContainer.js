import Link from "next/link";
import { useEffect, useState } from "react";

export const CommentContainer = ({ comment }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${comment.user_id}`)
      .then((res) => {
        return res.json();
      })
      .then((userData) => {
        setUser(userData);
        setIsLoading(false);
      });
  }, []);

  function convertToDateString(str){
    const date = str.slice(8,10) + '/' + str.slice(5,7) + '/' + str.slice(0,4)
    const time = str.slice(11,16)
    
    return {time, date}
  }

  if (isLoading) return <div className="italic">Loading...</div>;

  return (
    <>
      <div>
        <img src={user.image_url} className="w-10 rounded-full mr-3"></img>
      </div>
      <div>
        <Link href={`/profile/${user.username}`} className="flex w-fit">
          <p className="italic opacity w-fit hover:underline">
            {user.username} | {convertToDateString(comment.completed_at).time} | {convertToDateString(comment.completed_at).date}
          </p>
        </Link>
        <p className="">{comment.body}</p>
      </div>
    </>
  );
};
