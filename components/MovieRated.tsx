import { useInfiniteQuery, InfiniteData } from "react-query";
import { useRouter } from "next/router";

import { fetchMovies } from "../api/index";

import useObserver from "../hooks/useObserver";
import { useHandleScroll } from "../hooks/useHandleScroll";

import MovieBox from "./MovieBox";

interface Movie {
  id?: number;
  title?: string;
  poster_path?: string;
  original_title?: string;
  vote_average?: number;
  limit?: number;
  pageParam?: number;
  pages?: [];
  pageParams?: [];
}

interface Page {
  items: Movie[];
  pageParam?: number;
  pages?: [];
}

export default function MovieRated(): JSX.Element {
  const router = useRouter();
  const movieDatas = ({ id, title }: { id: number; title: string }) => {
    router.push(`/movies/${title}/${id}`);
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<InfiniteData<Page>, Error>(
      "movie",
      ({ pageParam = 1 }) => fetchMovies({ limit: 10, pageParam }),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          return lastPage.items?.length !== 0 ? nextPage : undefined;
        },
      },
    );

  useHandleScroll(fetchNextPage, hasNextPage);

  const observerElement = useObserver(hasNextPage, fetchNextPage);

  console.log(data);

  return (
    <div>
      {isSuccess &&
        data.pages.map((page, i) => (
          <div key={i}>
            {page.props.results?.length ? (
              <MovieBox results={page.props.results} movieDatas={movieDatas} />
            ) : (
              <p>No result found</p>
            )}
          </div>
        ))}
      <div className="loader" ref={observerElement}>
        {isFetchingNextPage && hasNextPage ? "Loading..." : "No search left"}
      </div>
    </div>
  );
}
