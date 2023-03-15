import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Seo from "../components/Seo";

interface Movies {
  datas: {
    results: any;
  };
}

const Upcoming = ({ datas: { results } }: Movies) => {
  const router = useRouter();
  const movieDatas = ({ id, title }: { id: number; title: string }) => {
    router.push(`/movies/${title}/${id}`);
  };

  return (
    <div>
      <h1 className="title">Upcoming Movies</h1>
      <div className="container">
        <Seo title="Upcoming Movies" />
        {results?.map((movie: any) => (
          <div
            onClick={() =>
              movieDatas({ id: movie.id, title: movie.original_title })
            }
            className="movie"
            key={movie.id}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={"Movie Img"}
            />
            <h4>
              <Link
                href={`/movies/${movie.original_title}/${movie.id}`}
                legacyBehavior
              >
                <a>{movie.title}</a>
              </Link>
            </h4>
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        h1.title {
          text-align: center;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          height: 560px;
          object-fit: cover;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export const getServerSideProps = async () => {
  const data = await (
    await axios.get(`http://localhost:3000/api/upcoming`)
  ).data;
  return {
    props: {
      datas: data,
    },
  };
};

export default Upcoming;
