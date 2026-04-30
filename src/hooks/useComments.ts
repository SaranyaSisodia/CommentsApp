import { useState, useEffect, useCallback } from 'react';
import { fetchComments, Comment, PAGE_LIMIT } from '../api/comments';

interface UseCommentsReturn {
  comments: Comment[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  retry: () => void;
}

const useComments = (): UseCommentsReturn => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadComments = useCallback(async (pageToLoad: number) => {
    if (pageToLoad === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);
    try {
      const newComments = await fetchComments(pageToLoad);
      if (pageToLoad === 1) {
        setComments(newComments);
      } else {
        setComments(prev => [...prev, ...newComments]);
      }
      if (newComments.length < PAGE_LIMIT) {
        setHasMore(false);
      }
    } catch (err) {
      setError('Failed to load comments. Please try again.');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadComments(1);
  }, [loadComments]);

  useEffect(() => {
    if (page > 1) {
      loadComments(page);
    }
  }, [page, loadComments]);

  const loadMore = useCallback(() => {
    if (!isLoading && !isLoadingMore && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [isLoading, isLoadingMore, hasMore]);

  const retry = useCallback(() => {
    setHasMore(true);
    setPage(1);
    setComments([]);
    loadComments(1);
  }, [loadComments]);

  return {
    comments,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    retry,
  };
};

export default useComments;