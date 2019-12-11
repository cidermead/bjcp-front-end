import { fetchMiddleware } from '../utils/middleware';
import {
  fetchQuestionPending,
  fetchQuestionSuccess,
  fetchQuestionError
} from '../actions/questionActions';

import { API_URL } from '../constants/configs';

export const fetchQuestionAction = ({ category, topic }) => {
  let path = (category === 'beer' && topic === 'styles')
    ? ['styles', 'question']
    : ['questions', category, topic];

  const options = { method: 'GET' };

  return fetchMiddleware(
    fetchQuestionPending,
    fetchQuestionSuccess,
    fetchQuestionError,
    [API_URL, ...path].join('/'),
    options,
  );
};


