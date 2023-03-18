import axios from "axios";
import Seo from "../../components/Seo";
import { MdManageSearch } from "react-icons/md";
import MovieBox from "../../components/MovieBox";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface Props {
  results: Movie[];
  params: string;
}

export default function Home({ results, params }: Props) {
  return (
    <div>
      <Seo title={params} />
      <h1>Results of &lsquo;{params}&rsquo;</h1>
      {results.length ? (
        <MovieBox results={results} />
      ) : (
        <div>
          <MdManageSearch />
          <p>No result found</p>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context: {
  query: { query: string };
}): Promise<{ props: Props }> {
  const params = context.query.query as string;
  const { results }: { results: Movie[] } = await axios
    .get(
      `https://movie-trailers-tau.vercel.app/api/search?query=${params}&language=ko-KR`,
    )
    .then((res) => res.data);

  results.map(
    (item) =>
      (item.poster_path = `https://image.tmdb.org/t/p/w500${item.poster_path}`),
  );

  return { props: { results, params } };
}
