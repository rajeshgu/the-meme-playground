import { useState, useEffect } from 'react';
import { getAllMemes } from '../api/memes';

const useMemes = (params = {}) => {
  const [memes, setMemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemes = async () => {
      setIsLoading(true);
      try {
        const data = await getAllMemes(params);
        setMemes(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemes();
  }, []);
//params
  return { memes, isLoading, error };
};

export default useMemes;