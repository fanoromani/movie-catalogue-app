import { Header } from "../components/Header";
import { FilterSection } from "../components/FilterSection";
import { MoviePostersContainer } from "../components/MoviePostersContainer";
import axios from "axios";
import { useEffect, useState } from "react";

const genres = [
  "Ação",
  "Aventura",
  "Terror",
  "Comédia",
  "Animação",
  "Crime",
  "Documentário",
  "Fantasia",
  "Família",
  "Música",
  "Faroeste",
  "História",
  "Romance",
  "Guerra",
  "Thriller",
  "Drama",
  "Mistério",
];

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const callApi = async () => {
      const response = await axios(
        `https://api.themoviedb.org/3/movie/popular?api_key=6b121c5159d8b0bbc6a63fc1bb6f3fe0`
      );
      setMovies(response.data.results);
    };
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />

      <div className="bg-purple-900 text-white flex py-10 px-4 flex-1 h-fit justify-center items-center">
        <div className="max-w-screen-lg">
          <h1 className="text-2xl sm:text-5xl sm:text-center font-bold leading-tight mr-16">
            Milhões de filmes, séries e pessoas para descobrir.{" "}
            <span className="block sm:inline">Explore já.</span>
          </h1>

          <FilterSection genres={genres} />
        </div>
      </div>
      {movies.length > 0 && <MoviePostersContainer movies={movies} />}
    </div>
  );
}
