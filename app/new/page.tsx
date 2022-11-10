"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Button from "components/button";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { createXlug } from "utils/create-xlug";
import type { XlugProps } from "components/xlug";

export default function Page() {
  const [state, setState] = useState<Partial<XlugProps>>({ description: "", destination: "", xlug: "" });

  const [isCreating, setCreating] = useState(false);

  const [error, setError] = useState<null | string>(null);

  return (
    <div className="container mx-auto px-4">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (isCreating) return;
          if (!state.destination) return setError("Destination is required, please fill this field");
          if (!state.xlug) return setError("Xlug is required, please fill this field");

          setCreating(true);
          try {
            await createXlug(state);
            toast.success("New Xlug created!");
            setError(null);
            setState({ description: "", destination: "", xlug: "" });
          } catch (error: any) {
            setError(error.message);
          } finally {
            setCreating(false);
          }
        }}
      >
        <div className="mb-5">
          <label htmlFor="url">Enter the URL here:</label>
          <input
            id="url"
            type="text"
            placeholder="https://"
            className="mt-2 outline-none rounded-md px-4 py-2 w-full focus:border-none bg-secondary text-white"
            value={state.destination}
            onChange={(e) => setState((state) => ({ ...state, destination: e.target.value }))}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="xlug">Custom slug:</label>
          <p className="text-gray-500">https://xlug.vercel.app/x/</p>
          <input
            id="xlug"
            type="text"
            placeholder="Custom slug"
            className="mt-2 outline-none rounded-md px-4 py-2 w-full focus:border-none bg-secondary text-white"
            value={state.xlug}
            onChange={(e) => setState((state) => ({ ...state, xlug: e.target.value }))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description">Description (optional):</label>
          <textarea
            id="description"
            className="mt-2 outline-none focus:border-white rounded-md px-4 py-2 w-full bg-secondary text-white"
            value={state.description}
            onChange={(e) => setState((state) => ({ ...state, description: e.target.value }))}
          />
        </div>
        <Button type="submit" className="bg-secondary">
          <RocketLaunchIcon className="mr-2 w-4 h-4" />
          Create your link
        </Button>
        {error && (
          <div className="flex my-4 text-sm text-rose-700 font-medium">
            {error || "Something went wrong, please try again"}
          </div>
        )}
      </form>
    </div>
  );
}
