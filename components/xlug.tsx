"use client";

import { Square2StackIcon } from "@heroicons/react/24/outline";

interface CardProps {
  url: string;
  xlug: string;
  description: string;
}

const Xlug = (props: CardProps) => {
  const copyToClipboard = async (txt: string) => {
    try {
      const clipboardItem = new ClipboardItem({
        "text/plain": new Blob([txt], { type: "text/plain" }),
      });
      await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
      await navigator.clipboard.writeText(txt);
    }
  };

  return (
    <div className="bg-primary border border-light rounded-lg  hover:shadow-lg transition-all p-4 mt-3 hover:bg-secondary">
      <div className="flex items-center">
        <a
          className="text-gray-100 text-xl hover:text-gray-300 transition-all"
          target="_blank"
          rel="noreferrer"
          href={`https://xlug.vercel.app/x/${props.xlug}`}
        >
          /x/{props.xlug}
        </a>
        <button
          className="p-1 ml-1 text-gray-500 hover:text-gray-200 transition-colors duration-200"
          onClick={() => copyToClipboard(`https://xlug.vercel.app/x/${props.xlug}`)}
        >
          <Square2StackIcon className="mr-2 w-4 h-4" />
        </button>
      </div>
      <p className="truncate text-gray-400 mb-2">{props.url}</p>
      <p className="text-gray-500">{props.description}</p>
    </div>
  );
};

export default Xlug;
