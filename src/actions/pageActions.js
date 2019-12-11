import {
  SET_PAGE_ID,
} from '../constants/actionTypes';

export function setCurrentPageAction(pageId, pageUrl) {
  return dispatch => dispatch({
    type: SET_PAGE_ID,
    payload: {
      pageId,
      pageUrl,
    },
  });
}
