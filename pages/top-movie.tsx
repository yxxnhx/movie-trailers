import React from "react";
import Title from "../components/Title";
import Seo from "../components/Seo";
import MovieRated from "../components/MovieRated";

export default function movie() {
  return (
    <div>
      <Title title="Top Movie Rated" />
      <Seo title="Top Movie Rated" />
      <MovieRated />
    </div>
  );
}
