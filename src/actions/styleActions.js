import {
  FETCH_STYLE_RANGE_FAILED,
  FETCH_STYLE_RANGE_PENDING,
  FETCH_STYLE_RANGE_SUCCESS,

  SET_STYLE_RANGE_ANSWER,
  CHECK_STYLE_RANGE_ANSWER,
} from '../constants/actionTypes';


// example of a thunk using the redux-thunk middleware
export function fetchStyleRangePending() {
  return {
    type: FETCH_STYLE_RANGE_PENDING,
  };
}

export function fetchStyleRangeSuccess(style) {
  return {
    type: FETCH_STYLE_RANGE_SUCCESS,
    payload: style,
  };
}

export function fetchStyleRangeError(error) {
  return {
    type: FETCH_STYLE_RANGE_FAILED,
    error,
  };
}

export function checkRangeAnswerAction() {
  return dispatch => dispatch({
    type: CHECK_STYLE_RANGE_ANSWER,
  })
}

export function setUserRangeAction(name, value) {
  return dispatch => dispatch({
    type: SET_STYLE_RANGE_ANSWER,
    payload: {
      name,
      value,
    },
  })
}
