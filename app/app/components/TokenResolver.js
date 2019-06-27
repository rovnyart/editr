import { useEffect } from 'react';

import api from '../utils/api';
import useNotifications from '../hooks/notifications';

export default function TokenResolver({ history, match: { params } }) {
  const showError = useNotifications('error');
  const showSuccess = useNotifications('success');
  const showInfo = useNotifications('info');

  useEffect(() => {
    const checkToken = async () => {
      try {
        const { data: { action } } = await api.get(`/api/tokens/${params.token}`);
        if (action === 'registration') showSuccess('Email confirmed');
        else showInfo('Thank you! Registration token deleted.');
      } catch (error) {
        showError(error.message);
      } finally {
        history.push('/');
      }
    };
    checkToken();
  }, [history, params, showError, showInfo, showSuccess]);

  return null;
}
