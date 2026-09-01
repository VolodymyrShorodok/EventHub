import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useCatalogUrlState() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') ?? '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  useEffect(() => {
    setQuery(searchParams.get('search') ?? '');
    setPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(1);
    setSearchParams(value ? { search: value } : {}, { replace: true });
  };

  const updatePage = (nextPage: number, totalPages: number) => {
    const safePage = Math.max(1, Math.min(nextPage, totalPages));
    setPage(safePage);
    setSearchParams(
      { ...(query ? { search: query } : {}), ...(safePage > 1 ? { page: String(safePage) } : {}) },
      { replace: true },
    );
  };

  return { query, page, updateQuery, updatePage };
}
