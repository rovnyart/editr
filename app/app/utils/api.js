import axios from 'axios';
import qs from 'qs';
import moment from 'moment';

const ax = axios.create({
  headers: { 'Cache-Control': 'no-cache' },
  paramsSerializer: (params) => qs.stringify(params, {
    filter: (prefix, value) => {
      switch (true) {
        case value === null: return '';
        case moment.isMoment(value): return value.toJSON();
        default: return value;
      }
    },
  }),
});

const handleError = (error) => {
  let err;
  const fallbackError = new Error('При выполнении подзапроса возникла ошибка, попробуйте повторить операцию');

  if (error.response) { // The request was made and the server responded with a status code that falls out of the range of 2xx
    err = (error.response.data && error.response.data.message)
      ? error.response.data
      : new Error(`requested url returned error: ${error.response.status} ${error.response.statusText}`);
  } else if (error.request) { // The request was made but no response was received `error.request` is an instance of XMLHttpRequest
    err = new Error('При выполнении запроса к серверу произошла ошибка. Проверьте соединение с Интернетом и повторите операцию.'); //eslint-disable-line
    console.log('error.request', error.request); // eslint-disable-line no-console
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('api request Error', error.message); // eslint-disable-line no-console
  }

  return Promise.reject(err || (error.message && error) || fallbackError);
};

ax.interceptors.request.use((config) => config, handleError);
ax.interceptors.response.use((config) => config, handleError);

export default ax;
