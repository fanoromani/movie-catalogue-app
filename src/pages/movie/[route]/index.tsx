import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { MovieCast } from "../../../components/MovieCast";
import { MovieDetails } from "../../../components/MovieDetails";
import { Recomendations } from "../../../components/Recomendations";

const API_KEY = "?api_key=6b121c5159d8b0bbc6a63fc1bb6f3fe0&language=en-US";

export default function Movie() {
  const [movieData, setMovieData] = useState();
  const [creditsData, setCreditsData] = useState();
  const [recomendationsData, setRecomendationsData] = useState();
  const [trailerData, setTrailerData] = useState<any>();

  const router = useRouter();
  const { route } = router.query;
  console.log(route);

  useEffect(() => {
    const callApi = async () => {
      const { data: movieData } = await axios(
        `https://api.themoviedb.org/3/movie/${route}${API_KEY}`
      );
      setMovieData(movieData);
      const { data: creditsData } = await axios(
        `https://api.themoviedb.org/3/movie/${route}/credits${API_KEY}`
      );
      setCreditsData(creditsData);
      const { data: recomendationsData } = await axios(
        `https://api.themoviedb.org/3/movie/${route}/recommendations${API_KEY}&page=1`
      );
      setRecomendationsData(recomendationsData);
      const { data: trailerData } = await axios(
        `https://api.themoviedb.org/3/movie/${route}/videos${API_KEY}`
      );
      setTrailerData(trailerData);
    };
    if (route) {
      callApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);
  console.log(trailerData);

  return (
    <div className="bg-gray-100">
      <Header />
      {movieData && (
        <MovieDetails movieData={movieData} creditsData={creditsData} />
      )}
      <div className="px-28 pb-96">
        {creditsData && <MovieCast cast={creditsData} />}

        <div>
          <div className="text-2xl font-bold mb-6">Trailer</div>
          {trailerData && (
            <iframe
              id="ytplayer"
              width="900"
              height="500"
              src={`https://www.youtube.com/embed/${trailerData.results[0].key}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
              frameBorder="0"
            ></iframe>
          )}
        </div>
        {recomendationsData && (
          <Recomendations recomendationsData={recomendationsData} />
        )}
      </div>
    </div>
  );
}
