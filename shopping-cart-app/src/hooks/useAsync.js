import { useEffect, useState } from 'react';

export const useAsync = (asyncFn, dependencies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    asyncFn()
      .then(response => {
        setData(response);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, dependencies);

  return { data, loading, error };
};