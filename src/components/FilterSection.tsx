import { useState } from "react";
import { arrayBuffer } from "stream/consumers";

export function FilterSection({ genres }: { genres: any[] }) {
  /* const [filters, setFilters] = useState<any[]>([]);

  const addFilter = (newFilter: string) => {
    if (filters.includes(newFilter)) {
    }
    setFilters((arr) => [...arr, newFilter]);
  }; */

  return (
    <div className="flex sm:items-center mt-10 flex-col">
      <span className="font-bold text-sm uppercase mb-4 ">filter by:</span>

      <div className="sm:text-center flex flex-wrap gap-3 sm:justify-center">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className="px-4 py-2 bg-white rounded text-black font-bold hover:bg-gray-300"
            /*  onClick={() => setFilter(genre.name)} */
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}
