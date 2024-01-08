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

  if (isLoading) return <div className="italic">Loading...</div>;

  return (
    <>
      <div>
        <img src="image.png" className="w-10 rounded-full mr-3"></img>
      </div>
      <div>
        <Link href={`/profile/${user.username}`} className="flex w-fit">
          <p className="italic opacity w-fit hover:underline">
            {user.username}
          </p>
        </Link>
        <p className="">{comment.body}</p>
      </div>
    </>
  );
};
