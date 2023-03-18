import { useRouter } from "next/router";
import axios from "axios";
import Seo from "../components/Seo";
import Title from "../components/Title";
import MovieBox from "../components/MovieBox";

interface Movie {
  id?: number;
  title?: string;
  poster_path?: string;
  original_title?: string;
  vote_average?: number;
}

const Upcoming = ({ results }: { results?: Movie[] }) => {
  const router = useRouter();
  const movieDatas = ({ id, title }: { id: number; title: string }) => {
    router.push(`/movies/${title}/${id}`);
  };

  return (
    <div>
      <Title title="Upcoming Movies" />
      <div>
        <Seo title="Upcoming" />
        {results?.length ? (
          <MovieBox results={results} movieDatas={movieDatas} />
        ) : (
          <div>
            <p>No result found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const { results }: { results: Movie[] } = await axios
    .get(`http://localhost:3000/api/upcoming`)
    .then((res) => res.data);

  results.map(
    (item: Movie) =>
      (item.poster_path = `https://image.tmdb.org/t/p/w500${item.poster_path}`),
  );

  return { props: { results } };
};

export default Upcoming;
