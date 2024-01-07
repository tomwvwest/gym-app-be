export const BrowseSingleUserContainer = ({ user }) => {
  return (
    <div className="w-[80%] mb-4">
      <div className=" bg-LightPurple text-platinum rounded-2xl p-4 flex justify-between">
        <p className="font-bold">{user.username}</p>
      </div>
    </div>
  );
};
