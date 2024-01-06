import Link from "next/link";

export const Header = () => {
  return (
    <div className="border-b border-black flex justify-between w-full py-2 bg-DeepPurple items-center fixed z-10 px-10">
      <Link href="/">
        <img src="../Logo.png" className="w-14"></img>
      </Link>
      <div className="w-11 h-11 rounded-full overflow-hidden">
        <img src="../image.png"></img>
      </div>
    </div>
  );
};
