import Image from "next/image";

export function MoviePostersContainer({ movies }: any) {
  return (
    <div className="mt-8 px-2 sm:px-28 flex justify-center gap-4 sm:gap-8 flex-wrap">
      {movies.map((movie: any) => (
        <div key={movie.id} className="flex flex-col mt-2 sm:m-0">
          <Image
            width={176}
            height={264}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
          />
          <strong className="mt-2 max-w-[176px] truncate">{movie.title}</strong>
          <span className="text-gray-200 text-sm font-bold">
            {movie.release_date}
          </span>
        </div>
      ))}
    </div>
  );
}
