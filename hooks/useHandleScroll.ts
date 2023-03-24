import { useEffect } from "react";
import { InfiniteQueryObserverResult } from "react-query";

interface HandleScrollOptions {
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}

export const useHandleScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: HandleScrollOptions) => {
  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: Event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
};
