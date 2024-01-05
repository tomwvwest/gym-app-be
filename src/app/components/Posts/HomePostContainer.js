import { PostContainer } from "./PostContainer";

export const HomePostContainer = ({ posts }) => {
  return (
    <>
      {posts.map((post) => {
        return <div key={post.post_id} className="flex justify-center"><PostContainer post={post}/></div>;
      })}
    </>
  );
};
