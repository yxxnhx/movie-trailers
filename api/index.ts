import axios from "axios";

export const fetchMovies = async (limit: number, page: number) => {
  const { results } = await axios
    .get(
      `https://movie-trailers-tau.vercel.app/api/top_rated?per_page=${limit}&page=${page}`,
    )
    .then((res) => res.data);

  results.map(
    (item: { poster_path: string }) =>
      (item.poster_path = `https://image.tmdb.org/t/p/w500${item.poster_path}`),
  );

  if (!results) {
    throw new Error("Failed to fetch movies");
  }

  return { props: { results } };
};
