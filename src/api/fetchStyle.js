import { fetchMiddleware } from '../utils/middleware';
import {
  fetchStyleRangePending,
  fetchStyleRangeSuccess,
  fetchStyleRangeError
} from '../actions/styleActions';

import { API_URL } from '../constants/configs';

export const fetchStyleRangeAction = () => {
  const path = ['styles', 'range'];
  const options = { method: 'GET' };

  return fetchMiddleware(
    fetchStyleRangePending,
    fetchStyleRangeSuccess,
    fetchStyleRangeError,
    [API_URL, ...path].join('/'),
    options,
  );
};


