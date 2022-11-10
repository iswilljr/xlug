/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
"use client";

import toast from "react-hot-toast";
import { Square2StackIcon } from "@heroicons/react/24/outline";

export interface XlugProps {
  created_at: string;
  description?: string;
  destination: string;
  id: number;
  xlug: string;
}

const Xlug = (props: XlugProps) => {
  const copyToClipboard = async (txt: string) => {
    try {
      const clipboardItem = new ClipboardItem({
        "text/plain": new Blob([txt], { type: "text/plain" }),
      });
      await navigator.clipboard.write([clipboardItem]);
    } catch (error) {
      await navigator.clipboard.writeText(txt);
    }
    toast.success("Copied to clipboard!");
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
      <p className="truncate text-gray-400 mb-2">{props.destination}</p>
      <p className="text-gray-500">{props.description || "No description provided"}</p>
    </div>
  );
};

export default Xlug;
