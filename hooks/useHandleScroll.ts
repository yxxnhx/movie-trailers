import { useEffect } from "react";

interface HandleScrollOptions {
  hasNextPage: boolean;
  fetchNextPage: () => Promise<void>;
  isFetchingNextPage: boolean;
}

export const useHandleScroll = ({
  hasNextPage,
  fetchNextPage,
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
  }, [fetchNextPage, hasNextPage]);
};
