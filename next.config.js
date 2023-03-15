/** @type {import('next').NextConfig} */
const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"],
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`,
      },
      {
        source: "/api/playing",
        destination: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR`,
      },
      {
        source: "/api/upcoming",
        destination: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}&language=ko-KR`,
      },
      {
        source: "/api/movies/detail/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}&language=ko-KR`,
      },
    ];
  },
};

module.exports = nextConfig;
