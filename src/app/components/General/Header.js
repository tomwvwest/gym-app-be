"use client";

import Link from "next/link";
import { useUserContext } from "@/app/contexts/userContext";

export const Header = () => {
  const { user, setUser } = useUserContext();

  return (
    <div className="border-b border-black flex justify-between w-full py-2 bg-DeepPurple items-center fixed z-10 px-10">
      <Link href="/">
        <img src="../Logo.png" className="w-14"></img>
      </Link>
      {user.username ? (
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <Link href={`/profile/${user.username}`}>
            <img src="../image.png"></img>
          </Link>
        </div>
      ) : (
        <Link href="/login" className="text-white">
          <h1>Login</h1>
        </Link>
      )}
    </div>
  );
};
