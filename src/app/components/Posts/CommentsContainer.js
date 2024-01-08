import { CommentContainer } from "./CommentContainer";

export const CommentsContainer = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => {
        return <div key={comment.comment_id} className=" m-2 p-1 text-sm flex "><CommentContainer comment={comment} /></div>;
      })}
    </div>
  );
};
