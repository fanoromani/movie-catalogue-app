import { Genre } from "../types";

export function FilterSection({
  genres,
  filters,
  addFilter,
}: {
  genres: Genre[];
  filters: number[];
  addFilter: Function;
}) {
  return (
    <div className="flex sm:items-center mt-10 flex-col">
      <span className="font-bold text-sm uppercase mb-4 ">filter by:</span>

      <div className="sm:text-center flex flex-wrap gap-4 sm:px-8 sm:justify-center">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`px-4 py-2 rounded font-bold hover:bg-gray-300 ${
              filters.includes(genre.id)
                ? "bg-highlight text-white"
                : "bg-white text-black"
            }`}
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
