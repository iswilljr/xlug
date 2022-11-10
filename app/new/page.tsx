"use client";

import { useState } from "react";
import Button from "components/button";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";

export default function Page() {
  const [destination, setDestination] = useState("");
  const [xlug, setXlug] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="container mx-auto px-4">
      <form>
        <div className="mb-5">
          <label htmlFor="url">Enter the URL here:</label>
          <input
            id="url"
            type="text"
            placeholder="https://"
            className="mt-2 outline-none rounded-md px-4 py-2 w-full focus:border-none bg-secondary text-white"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="xlug">Custom slug:</label>
          <p className="text-gray-500">https://xlug.vercel.app/x/</p>
          <div className="flex items-center justify-between mt-1">
            <input
              id="xlug"
              type="text"
              placeholder="Custom slug"
              className="mt-2 outline-none rounded-md px-4 py-2 w-full focus:border-none bg-secondary text-white"
              value={xlug}
              onChange={(e) => setXlug(e.target.value)}
            />
            <Button className="ml-2 bg-secondary">Random</Button>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description">Description (optional):</label>
          <textarea
            id="description"
            className="mt-2 outline-none focus:border-white rounded-md px-4 py-2 w-full bg-secondary text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button type="submit" className="bg-secondary">
          <RocketLaunchIcon className="mr-2 w-4 h-4" />
          Create your link
        </Button>
      </form>
    </div>
  );
}
