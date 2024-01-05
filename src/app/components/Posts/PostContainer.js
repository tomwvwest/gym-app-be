export const PostContainer = ({ post }) => {
  console.log(post);
  return (
    <div className="border mb-5">

      <div className="flex items-center">
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <img src="image.png"></img>
        </div>
        <div className="ml-3 opacity-70 text-sm text-DeepPurple">
          <p>Jacob Garner</p>
          <p>6:30pm 11/12/23</p>
        </div>
      </div>

      <div>
        
      </div>

    </div>
  );
};
