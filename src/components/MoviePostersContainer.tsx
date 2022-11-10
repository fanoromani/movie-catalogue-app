import Image from "next/image";
import Link from "next/link";
import { MovieType } from "../types";

export function MoviePostersContainer({ movies }: { movies: MovieType[] }) {
  return (
    <div className="mt-8 px-2 sm:px-28 flex justify-center gap-4 mb-10 sm:gap-8 flex-wrap">
      {movies.map((movie: any) => (
        <div key={movie.id} className="flex flex-col sm:m-0">
          <Link
            href={{
              pathname: `/movie/[route]`,
              query: { route: movie.id },
            }}
          >
            <Image
              loading="lazy"
              width={176}
              height={264}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
            />
          </Link>
          <strong className="mt-2 max-w-[176px] truncate">{movie.title}</strong>
          <span className="text-gray-200 text-sm font-bold">
            {movie.release_date}
          </span>
        </div>
      ))}
    </div>
  );
}
