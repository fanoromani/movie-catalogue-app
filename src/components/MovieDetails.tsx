import Image from "next/image";
import { MovieType, Credits } from "../types";

function toHoursAndMinutes(totalMinutes: number) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${padTo2Digits(hours)}h ${padTo2Digits(minutes)}m`;
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

interface MovieDetailsProps {
  movieData: MovieType;
  creditsData: Credits;
}

export function MovieDetails({ movieData, creditsData }: MovieDetailsProps) {
  const getCrew = () => {
    if (!creditsData) return [];

    const producer = creditsData.crew.find(
      (crewMember: any) => crewMember.job === "Producer"
    );
    const director = creditsData.crew.find(
      (crewMember: any) => crewMember.job === "Director"
    );
    const screenPlay = creditsData.crew.find(
      (crewMember: any) => crewMember.job === "Screenplay"
    );
    const writer = creditsData.crew.find(
      (crewMember: any) => crewMember.job === "Writer"
    );
    const editor = creditsData.crew.find(
      (crewMember: any) => crewMember.job === "Editor"
    );
    return [producer, director, screenPlay, writer, editor].filter(
      (element) => element
    );
  };

  console.log(getCrew());

  return (
    <div className="bg-purple-900 text-white flex pt-8 md:pt-20 pb-4 px-4 lg:px-28 md:px-12">
      <div className="flex gap-8 pb-8 flex-col md:flex-row">
        <div className="md:mb-[-70px] m-auto">
          <Image
            loading="lazy"
            className="rounded-lg drop-shadow-2xl h-72 w-44 md:min-h-[576px] md:min-w-[384px]"
            width={383}
            height={474}
            src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
            alt=""
          />
        </div>
        <div className="max-w-2xl">
          <strong className="text-2xl">{movieData.title} •</strong>
          <span className="text-2xl">
            {" "}
            {movieData.release_date.substring(0, 4)}
          </span>
          <div>
            <div>
              {movieData.genres.map((genre: any, index: number) => (
                <span key={genre.id}>
                  {genre.name}
                  {index === movieData.genres.length - 1 ? "" : ", "}
                </span>
              ))}{" "}
              • {toHoursAndMinutes(movieData.runtime)}
            </div>
            <div className="flex items-baseline gap-3">
              <div
                className="mt-4  radial-progress bg-violet-900 text-[#14FF00]"
                style={
                  {
                    "--size": "60px",
                    "--value": `${movieData.vote_average * 10}`,
                  } as any
                }
              >
                {Math.round(movieData.vote_average * 10)}%
              </div>
              <span>Users Ratings</span>
            </div>
            <div>
              <h2 className="font-bold text-xl mt-8">Synopsis</h2>
              <p className="pt-2">{movieData.overview}</p>
            </div>
            <div className="flex flex-wrap gap-6 gap-x-14 mt-6">
              {getCrew().map((crewMember: any) => (
                <div key={crewMember.id} className="w-40">
                  <strong className="block">{crewMember.name}</strong>
                  <span>{crewMember.job}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
