import {
  SET_PAGE_ID,
} from '../constants/actionTypes';

import initialState from './initialState';

const getPageState = ({ pageState }) => pageState;

export default function questionReducer(state = getPageState(initialState), action) {
  const { payload, type } = action;

  switch (type) {
    case SET_PAGE_ID: {
      const { pageId, pageUrl } = payload;
      return {
        ...state,
        pageId,
        pageUrl,
      };
    }

    default:
      return state;
  }
}

// export const getPageId = state => getPageState(state).pageId;

export const getPageUrl = state => getPageState(state).pageUrl;
