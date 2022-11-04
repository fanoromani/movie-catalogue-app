import { Header } from "../components/Header";
import { FilterSection } from "../components/FilterSection";
import { MoviePostersContainer } from "../components/MoviePostersContainer";
import arrowLeft from "../assets/Arrow-left.png";
import arrowRight from "../assets/Arrow-right.png";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const callApi = async () => {
      const response = await axios(
        `https://api.themoviedb.org/3/movie/popular?api_key=6b121c5159d8b0bbc6a63fc1bb6f3fe0`,
        {
          params: {
            page: currentPage,
          },
        }
      );
      setMovies(response.data.results);
    };
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    const callApi = async () => {
      const response = await axios(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=6b121c5159d8b0bbc6a63fc1bb6f3fe0&language=en-US`
      );
      setGenres(response.data.genres);
    };
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPages = () => {
    if (currentPage === 1) {
      return [1, 2, 3, 4, 5];
    }
    if (currentPage === 2) {
      return [1, 2, 3, 4, 5];
    }
    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  return (
    <div>
      <Header />

      <div className="bg-purple-900 text-white flex py-10 px-4 flex-1 h-fit justify-center items-center">
        <div className="max-w-screen-lg">
          <h1 className="text-2xl sm:text-5xl sm:text-center font-bold leading-tight mr-16">
            Millions of movies, shows and people to discover.{" "}
            <span className="block sm:inline">Explore now.</span>
          </h1>

          {genres.length > 0 && <FilterSection genres={genres} />}
        </div>
      </div>
      {movies.length > 0 && <MoviePostersContainer movies={movies} />}

      <div className="mb-5 sm:mb-40 flex justify-center">
        <button
          className="text-purple-400 px-4 py-2 font-bold hover:bg-slate-100 rounded-full"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <Image width={24} height={24} src={arrowLeft} alt="" />
        </button>
        {getPages().map((page) => (
          <button
            key={page}
            className={` px-4 py-2 font-bold rounded-full hover:bg-slate-100 ${
              currentPage === page
                ? "text-purple-900 bg-slate-100"
                : "text-purple-400"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="text-purple-400 px-4 py-2 font-bold hover:bg-slate-100 rounded-full"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <Image width={24} height={24} src={arrowRight} alt="" />
        </button>
      </div>
    </div>
  );
}
