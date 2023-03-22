import { useCallback, useEffect, useRef } from "react";

function useObserver(
  hasNextPage: boolean,
  fetchNextPage: () => void,
): React.RefObject<HTMLElement> {
  const observerElement = useRef<HTMLElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    const element = observerElement.current!;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [fetchNextPage, hasNextPage, handleObserver]);

  return observerElement;
}

export default useObserver;
