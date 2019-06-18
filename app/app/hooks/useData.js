import { useEffect, useState, useCallback } from 'react';

import api from '../utils/api';
import { upperCaseFirst } from '../utils/helpers';

import useNotification from './notifications';

const loadFunctions = {
  loadNote: async (id) => {
    const { data } = await api.get(`/api/notes/${id}`);
    return data;
  },
};

export function useData({ dataType, options, shouldInitialLoad = true }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(null);
  const showError = useNotification('error');

  const load = useCallback(async () => {
    setLoading(true);
    setLoaded(false);
    try {
      const result = await loadFunctions[`load${upperCaseFirst(dataType)}`](options);
      setData(result);
    } catch (err) {
      showError(err.message);
      setError(err.message);
    }
    setLoading(false);
    setLoaded(true);
  }, [dataType, options, showError]);

  useEffect(() => {
    if (!shouldInitialLoad) return;
    load();
  }, [dataType, load, options, shouldInitialLoad]);

  return [loading, loaded, data, load, error];
}
