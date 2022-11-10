import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "./icons";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full py-4 bg-primary duration-300">
      <div className="flex container pl-4 pr-4 items-center justify-between mx-auto">
        <Link href="/">
          <div className="flex items-center cursor-pointer text-white hover:text-gray-300 transition-all">
            <Image src="/logo.png" alt="Logo" className="w-8 h-8" />
            <h1 className="text-xl ml-2 mr-2">xlug</h1>
          </div>
        </Link>
        <div className="flex items-center">
          <a
            href="https://github.com/iswilljr/xlug"
            rel="noreferrer"
            target="_blank"
            className="hover:transform hover:scale-110 transition duration-200 ease-in-out"
          >
            <GithubIcon width={28} height={28} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
