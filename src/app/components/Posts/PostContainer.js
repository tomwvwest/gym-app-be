export const PostContainer = ({ post, isNotLastChild }) => {
  console.log(post);
  return (
    <div className="mb-5 min-w-[80%] max-w-[500px]">
      <div className="flex items-center mb-3">
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <img src="image.png"></img>
        </div>
        <div className="ml-3 opacity-70 text-sm text-DeepPurple">
          <p>Jacob Garner</p>
          <p>6:30pm 11/12/23</p>
        </div>
      </div>

      <div className="bg-LightPurple text-platinum p-3 rounded-xl mb-5">
        <h1 className="font-bold pl-2 pt-1 text-lg">{post.session_name}</h1>
        <p className="pl-2 pt-1 pb-2 text-sm">{post.description}</p>
        <hr className="mt-1 opacity-40" />
        <p className="pl-2 pt-2 flex">
          Comments (2) <img src="white-back-arrow.png" className="rotate-180 ml-1"></img>
        </p>
      </div>

      {isNotLastChild ? <hr className="opacity-20" /> : null}
    </div>
  );
};
