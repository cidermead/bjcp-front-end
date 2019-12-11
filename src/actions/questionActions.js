import {
  FETCH_QUESTION_PENDING,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILED,

  CHECK_QUESTION_ANSWER,
  REQUEST_QUESTION_HINT,
} from '../constants/actionTypes';

// example of a thunk using the redux-thunk middleware
export function fetchQuestionPending() {
  return {
    type: FETCH_QUESTION_PENDING,
  };
}

export function fetchQuestionSuccess(question) {
  return {
    type: FETCH_QUESTION_SUCCESS,
    payload: question,
  };
}

export function fetchQuestionError(error) {
  return {
    type: FETCH_QUESTION_FAILED,
    error,
  };
}

export function checkAnswerAction(userAnswer) {
  return dispatch => dispatch({
      type: CHECK_QUESTION_ANSWER,
      payload: { userAnswer }
    }
  )
}

export function questionHintRequestAction() {
  return dispatch => {
    return dispatch({
        type: REQUEST_QUESTION_HINT,
      }
    );
  }
}


