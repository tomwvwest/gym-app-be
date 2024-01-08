import Link from "next/link";

export const BrowseSingleUserContainer = ({ user }) => {
  return (
    <div className="w-[80%] mb-4">
      <Link
        href={`/profile/${user.username}`}
      >
        <div className=" bg-LightPurple text-platinum rounded-2xl p-4 flex justify-between">
          <p className="italic ">{user.username}</p>
        </div>
      </Link>
    </div>
  );
};
