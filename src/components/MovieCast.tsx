import Image from "next/image";

export function MovieCast({ cast }: any) {
  return (
    <div className="mt-20 mb-20">
      <h1 className="text-2xl font-bold">Original Cast</h1>
      <div className="flex gap-6 mt-8 max-w-full overflow-x-scroll pb-6">
        {cast.cast.map((castMember: any) => (
          <div
            key={castMember.cast_id}
            className="flex flex-col bg-white p-2 drop-shadow-lg rounded"
          >
            <Image
              className="min-w-[176px] h-56 rounded drop-shadow-lg"
              width={176}
              height={224}
              src={`https://image.tmdb.org/t/p/original${castMember.profile_path}`}
              alt=""
            />
            <strong className="mt-4 mb-2">{castMember.name}</strong>
            <span>{castMember.character}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
