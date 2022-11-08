export interface Genre {
  id: number;
  name: string;
}
export interface MovieType {
  title: string;
  release_date: string;
  poster_path: string;
  genres: Genre[];
  runtime: number;
  vote_average: number;
  overview: string;
}

export interface CrewProps {
  id: number;
  name: string;
  job: string;
}
export interface CastProps {
  id: number;
  profile_path: string;
  name: string;
  character: string;
}
export interface Credits {
  crew: CrewProps[];
  cast: CastProps[];
}

export interface Recomendation {
  results: {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
  }[];
}

export interface Trailer {
  results: {
    name: string;
    key: string;
  }[];
}
