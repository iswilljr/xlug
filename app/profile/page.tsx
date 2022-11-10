"use client";

import { useState, useEffect } from "react";
import Xlug, { XlugProps } from "components/xlug";
import Link from "components/link";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [xlugs, setXlugs] = useState<XlugProps[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("xlugs");
    if (data) {
      const xlugs = JSON.parse(data);
      if (Array.isArray(xlugs)) setXlugs(xlugs);
    }
    setLoading(false);
  }, []);

  return (
    <>
      {(loading || xlugs.length === 0) && (
        <div className="text-center flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-r transition-all duration-100">
          <h1 className="text-3xl md:text-6xl mb-2 md:mb-5">
            {loading ? "Loading your xlugs..." : "You don't have any xlug yet"}
          </h1>
          {!loading && (
            <div className="flex">
              <Link href="/new" className="text-3xl mt-3 p-4">
                Create your first one here
              </Link>
            </div>
          )}
        </div>
      )}
      {xlugs.length > 0 && xlugs.map((xlug) => <Xlug key={xlug.xlug} {...xlug} />)}
    </>
  );
}
