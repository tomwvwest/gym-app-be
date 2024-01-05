import { PostContainer } from "./PostContainer";

export const HomePostContainer = ({ posts }) => {
  return (
    <>
      {posts.map((post, index, array) => {
        const isNotLastChild = index !== array.length-1 ? true : false;
        return <div key={post.post_id} className="flex justify-center"><PostContainer post={post} isNotLastChild={isNotLastChild}/></div>;
      })}
    </>
  );
};
