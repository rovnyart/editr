import { useEffect, useCallback } from 'react';

import api from '../utils/api';
import useNotifications from '../hooks/notifications';

export default function TokenResolver({ history, match: { params } }) {
  const showError = useNotifications('error');
  const showSuccess = useNotifications('success');
  const showInfo = useNotifications('info');

  const checkToken = useCallback(
    async () => {
      try {
        if (params.action === 'destroy') {
          await api.delete(`/api/tokens/${params.token}`);
          showInfo('Thank you! Registration token deleted.');
          return;
        }
        const { data: { action } } = await api.get(`/api/tokens/${params.token}`);
        if (action === 'registration') showSuccess('Email confirmed');
      } catch (error) {
        showError(error.message);
      } finally {
        history.push('/');
      }
    }, [history, params.action, params.token, showError, showInfo, showSuccess]
  );

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return null;
}
