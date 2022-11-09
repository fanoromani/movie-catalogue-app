import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { MovieCast } from "../../../components/MovieCast";
import { MovieDetails } from "../../../components/MovieDetails";
import { Recomendations } from "../../../components/Recomendations";
import { MovieType, Credits, Recomendation, Trailer } from "../../../types";
import { api } from "../../../lib/axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Movie() {
  const [movieData, setMovieData] = useState<MovieType>();
  const [creditsData, setCreditsData] = useState<Credits>();
  const [recomendationsData, setRecomendationsData] = useState<Recomendation>();
  const [trailerData, setTrailerData] = useState<Trailer>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>();

  const router = useRouter();
  const { route } = router.query;

  useEffect(() => {
    const callApi = async () => {
      setLoading(true);
      setError(false);
      try {
        const [
          movieDataResponse,
          creditsDataResponse,
          recomendationsDataResponse,
          trailerDataResponse,
        ] = await Promise.all([
          api.get(`${route}?api_key=${API_KEY}&language=en-US`),
          api.get(`${route}/credits?api_key=${API_KEY}&language=en-US`),
          api.get(`${route}/recommendations?api_key=${API_KEY}&language=en-US`),
          api.get(`${route}/videos?api_key=${API_KEY}&language=en-US`),
        ]);
        setMovieData(movieDataResponse.data);
        setCreditsData(creditsDataResponse.data);
        setRecomendationsData(recomendationsDataResponse.data);
        setTrailerData(trailerDataResponse.data);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (route) {
      callApi();
    }
  }, [route]);

  /* setLoading(true);
setError(false);
try {
  const resp =  await axios.get('/');
  setData(resp.data)
} catch (e) {
  setError(true);
} finally {
  setLoading(false);
} */

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
      {movieData && creditsData && (
        <MovieDetails
          movieData={movieData}
          creditsData={creditsData}
          loading={loading}
        />
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
              src={`https://www.youtube.com/embed/${getTrailer()}?autoplay=0&origin=http://example.com&controls=1&rel=1`}
              frameBorder="0"
            ></iframe>
          )}
        </div>
        {recomendationsData && (
          <Recomendations recomendationsData={recomendationsData} />
        )}
        {recomendationsData && recomendationsData.results.length === 0 && (
          <p className="mt-8">No Recommendations ☹</p>
        )}
      </div>
    </div>
  );
}
