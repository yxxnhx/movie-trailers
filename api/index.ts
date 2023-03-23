import axios from "axios";

// export const fetchMovies = async (page: number) => {
//   const limit = 10;
//   const { results } = await axios
//     .get(
//       // `https://movie-trailers-tau.vercel.app/api/top_rated?per_page=${limit}&page=${page}`,
//       `http://localhost:3000/api/top_rated?per_page=${limit}&page=${page}`,
//     )
//     .then((res) => res.data);

//   results.map(
//     (item: { poster_path: string }) =>
//       (item.poster_path = `https://image.tmdb.org/t/p/w500${item.poster_path}`),
//   );

//   if (!results) {
//     throw new Error("Failed to fetch movies");
//   }

//   return { props: { items: results } };
// };
interface MovieData {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface MoviePage {
  items?: any;
  props: {
    items: MovieData[];
  };
}

export const fetchMovies = async (page: number): Promise<MoviePage> => {
  const limit = 10;
  const { results } = await axios
    .get(
      `https://movie-trailers-tau.vercel.app/api/top_rated?per_page=${limit}&page=${page}`,
    )
    .then((res) => res.data);

  const items = results.map(
    (item: {
      vote_average: any;
      poster_path: string;
      id: number;
      title: string;
    }) => ({
      id: item.id,
      title: item.title,
      poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      vote_average: item.vote_average,
    }),
  );

  if (!items) {
    throw new Error("Failed to fetch movies");
  }

  return { props: { items } };
};
