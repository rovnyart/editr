import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

const options = { anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, autoHideDuration: 1000 };

export default function (type) {
  const { enqueueSnackbar } = useSnackbar();
  const show = useCallback((messgae) => {
    enqueueSnackbar(messgae, { variant: type, ...options });
  }, [enqueueSnackbar, type]);
  return show;
}
