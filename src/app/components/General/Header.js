"use client";

import Link from "next/link";
import { useUserContext } from "@/app/contexts/userContext";

export const Header = () => {
  const { user, setUser } = useUserContext();

  return (
    <div className="border-b border-black flex justify-between w-full py-2 bg-DeepPurple items-center fixed z-[1000] px-10">
      <Link href="/">
        <img src="../Logo.png" className="w-14"></img>
      </Link>
      <div className="flex items-center">
        <p className="text-platinum pr-4 italic">{user.username}</p>
        {user.username ? (
          <div className="w-11 h-11 rounded-full overflow-hidden">
            <Link href={`/profile/${user.username}`}>
              <img src={user.image_url}></img>
            </Link>
          </div>
        ) : (
          <Link href="/login" className="text-platinum">
            <h1>Login</h1>
          </Link>
        )}
      </div>
    </div>
  );
};
