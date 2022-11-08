import { useState } from "react";

export function FilterSection({
  genres,
  addFilter,
}: {
  genres: any[];
  addFilter: Function;
}) {
  const [filterColor, setFilterColor] = useState("white");

  return (
    <div className="flex sm:items-center mt-10 flex-col">
      <span className="font-bold text-sm uppercase mb-4 ">filter by:</span>

      <div className="sm:text-center flex flex-wrap gap-4 sm:px-8 sm:justify-center">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`px-4 py-2 bg-white rounded text-black font-bold hover:bg-gray-300`}
            onClick={() => {
              addFilter(genre.id);
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}
