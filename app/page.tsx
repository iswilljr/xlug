import Link from "components/link";
import { RocketLaunchIcon, StarIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="text-center flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-r transition-all duration-100">
      <h1 className="text-3xl md:text-6xl mb-2 md:mb-5">Open Source Link Shortener</h1>
      <h3 className="text-2xl mb-6 text-gray-400">unlimited links & custom slugs</h3>
      <div className="flex">
        <Link href="/profile">
          <RocketLaunchIcon className="mr-2 w-4 h-4" />
          Getting Started
        </Link>
        <a
          href="https://github.com/iswilljr/xlug"
          target="_blank"
          rel="noreferrer"
          className="flex items-center hover:text-secondary duration-200 transition-all ml-6"
        >
          <StarIcon className="mr-2 w-4 h-4" />
          Star on GitHub
        </a>
      </div>
    </div>
  );
}
