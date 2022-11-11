import { Genre } from "../types";

interface FilterSectionProps {
  genres: Genre[];
  filters: number[];
  addFilter: Function;
}

export function FilterSection({
  genres,
  filters,
  addFilter,
}: FilterSectionProps) {
  return (
    <div className="flex sm:items-center mt-10 flex-col">
      <span className="font-bold text-sm uppercase mb-4 ">filter by:</span>

      <div className="sm:text-center flex flex-wrap gap-4 sm:px-8 sm:justify-center">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`px-4 py-2 rounded font-bold ${
              filters.includes(genre.id)
                ? "bg-highlight-500 text-white hover:bg-highlight-700"
                : "bg-white text-black hover:bg-gray-300"
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
