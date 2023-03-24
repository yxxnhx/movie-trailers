import { useInfiniteQuery, InfiniteData } from "react-query";
import { useRouter } from "next/router";

import useObserver from "../hooks/useObserver";
import { useHandleScroll } from "../hooks/useHandleScroll";

import MovieBox from "./MovieBox";
import { fetchMovies } from "../api";

export default function MovieRated(): JSX.Element {
  const router = useRouter();
  const movieDatas = ({ id, title }: { id: number; title: string }) => {
    router.push(`/movies/${title}/${id}`);
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery("movie", ({ pageParam = 1 }) => fetchMovies(pageParam), {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.items?.length !== 0 ? nextPage : undefined;
      },
    });

  useHandleScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  const observerElement = useObserver(fetchNextPage, hasNextPage);

  return (
    <div>
      {isSuccess &&
        data.pages.map((page, i) => (
          <div key={i}>
            {page.props.items?.length ? (
              <MovieBox results={page.props.items} movieDatas={movieDatas} />
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
