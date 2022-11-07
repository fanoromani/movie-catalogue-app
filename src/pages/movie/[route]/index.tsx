import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { MovieCast } from "../../../components/MovieCast";
import { MovieDetails } from "../../../components/MovieDetails";
import { Recomendations } from "../../../components/Recomendations";

const API_KEY = process.env.NEXT_PUBLIC_DB_API_KEY;

export default function Movie() {
  const [movieData, setMovieData] = useState();
  const [creditsData, setCreditsData] = useState();
  const [recomendationsData, setRecomendationsData] = useState<any>();
  const [trailerData, setTrailerData] = useState<any>();

  const router = useRouter();
  const { route } = router.query;
  console.log(route);

  useEffect(() => {
    const callApi = async () => {
      const { data: movieData } = await axios(
        `https://api.themoviedb.org/3/movie/${route}?api_key=${API_KEY}&language=en-US`
      );
      setMovieData(movieData);
      const { data: creditsData } = await axios(
        `https://api.themoviedb.org/3/movie/${route}/credits?api_key=${API_KEY}&language=en-US`
      );
      setCreditsData(creditsData);
      const { data: recomendationsData } = await axios(
        `https://api.themoviedb.org/3/movie/${route}/recommendations?api_key=${API_KEY}&language=en-US`
      );
      setRecomendationsData(recomendationsData);
      const { data: trailerData } = await axios(
        `https://api.themoviedb.org/3/movie/${route}/videos?api_key=${API_KEY}&language=en-US`
      );
      setTrailerData(trailerData);
    };
    if (route) {
      callApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);
  console.log(trailerData);

  const getTrailer = () => {
    if (!trailerData) return;
    const trailer = trailerData.results.find(
      (trailer: any) => trailer.name === "Official Trailer"
    );

    if (!trailer && trailerData.results[0]) {
      return trailerData.results[0].key;
    }

    if (!trailer) return;
    return trailer.key;
  };

  return (
    <div className="bg-gray-100">
      <Header />
      {movieData && (
        <MovieDetails movieData={movieData} creditsData={creditsData} />
      )}
      <div className="px-4 md:px-28 pb-96">
        {creditsData && <MovieCast cast={creditsData} />}

        <div>
          <div className="text-2xl font-bold mb-6">Trailer</div>
          {!getTrailer() && <p>Trailer is unavailable ☹</p>}
          {getTrailer() && (
            <iframe
              className="md:w-full h-96 lg:w-[900px] lg:h-[500px]"
              id="ytplayer"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${getTrailer()}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
              frameBorder="0"
            ></iframe>
          )}
        </div>
        {recomendationsData && (
          <Recomendations recomendationsData={recomendationsData} />
        )}
        {recomendationsData.results.length === 0 && (
          <p className="mt-8">No Recommendations ☹</p>
        )}
      </div>
    </div>
  );
}
