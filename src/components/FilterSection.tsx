export function FilterSection({ genres }: { genres: any[] }) {
  return (
    <div className="flex sm:items-center mt-10 flex-col">
      <span className="font-bold text-sm uppercase mb-4 ">filter by:</span>

      <div className="sm:text-center flex flex-wrap gap-3 sm:justify-center">
        {genres.map((genre) => (
          <button
            key={genre.name}
            className="px-4 py-2 bg-white rounded text-black font-bold hover:bg-gray-300"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}
