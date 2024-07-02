import { useState, useEffect } from "react";
import { authorizedApi } from "../utils/api";

const useGet = (url, config, page, perPage) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
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
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [page, perPage]);

  return { data, loading, error, refetch };
};

export default useGet;
