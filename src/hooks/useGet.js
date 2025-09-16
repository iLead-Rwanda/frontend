import { useState, useEffect, useCallback, useRef } from "react";
import { authorizedApi } from "../utils/api";

const useGet = (url, config, page, perPage) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevParamsRef = useRef(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = { ...config?.params };
      if (page !== undefined && perPage !== undefined) {
        params.page = page;
        params.perPage = perPage;
      }
      const response = await authorizedApi.get(url, {
        ...config,
        params,
      });
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [url, config, page, perPage]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const currentParams = JSON.stringify({
      url,
      config,
      page,
      perPage
    });
    
    // Only fetch if parameters have actually changed
    if (prevParamsRef.current !== currentParams) {
      prevParamsRef.current = currentParams;
      fetchData();
    }
  }, [url, config, page, perPage, fetchData]);

  return { data, loading, error, refetch };
};

export default useGet;
