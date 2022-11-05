import Image from "next/image";
import { useRouter } from "next/router";

function toHoursAndMinutes(totalMinutes: number) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${padTo2Digits(hours)}h ${padTo2Digits(minutes)}m`;
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export function MovieDetails({ movieData, creditsData }: any) {
  return (
    <div className="bg-purple-900 text-white flex pt-20 px-28 flex-1 h-fit justify-center items-center">
      <div className="flex-1 flex gap-8 mb-[-48px]">
        <Image
          className="rounded-lg drop-shadow-2xl"
          width={383}
          height={474}
          src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
          alt=""
        />
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
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="mr-20">
                <strong className="block">Rob Liefeld</strong>
                <span>Characters</span>
              </div>
              <div className="mr-20">
                <strong className="block">Rob Liefeld</strong>
                <span>Characters</span>
              </div>
              <div className="mr-20">
                <strong className="block">Rob Liefeld</strong>
                <span>Characters</span>
              </div>
              <div className="mr-20">
                <strong className="block">Rob Liefeld</strong>
                <span>Characters</span>
              </div>
              <div className="mr-20">
                <strong className="block">Rob Liefeld</strong>
                <span>Characters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
