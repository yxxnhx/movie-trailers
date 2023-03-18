import Image from "next/image";

interface MovieBoxProps {
  results: {
    id?: number;
    poster_path?: string;
    title?: string;
    original_title?: string;
    vote_average?: number;
  }[];
  movieDatas?: (data: { id: number; title: string }) => void;
}

export default function MovieBox({ results, movieDatas }: MovieBoxProps) {
  return (
    <div className="container">
      {results.map((movie) => (
        <div
          onClick={() =>
            movieDatas?.({ id: movie.id!, title: movie.original_title! })
          }
          className="movieBox"
          key={movie.id}
        >
          <div className="moviePoster">
            <Image
              src={movie.poster_path!}
              alt={`${movie.title} image`}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p className="movieTitle">{movie.title}</p>
          <p className="movieRate">{movie.vote_average!.toFixed(1)}</p>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }

        .movieBox {
          position: relative;
        }

        .moviePoster {
          position: relative;
          max-width: 500px;
          height: 560px;
          cursor: pointer;
          transition: transform 0.2s ease-in-out;
        }

        .moviePoster img {
          width: 500px;
          height: 560px;
          object-fit: cover;
          box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
        }

        .moviePoster:hover {
          transform: scale(1.05) translateY(-10px);
        }

        .movieTitle {
          font-size: 18px;
          text-align: center;
          padding: 10px 20px;
        }

        .movieRate {
          position: absolute;
          top: 0px;
          left: 20px;
          background-color: #af1f37;
          display: inline-block;
          width: 50px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border-radius: 25px;
          font-size: 16px;
          color: #fff;
        }
      `}</style>
    </div>
  );
}
