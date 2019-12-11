import {
  FETCH_STYLE_RANGE_PENDING,
  FETCH_STYLE_RANGE_SUCCESS,
  FETCH_STYLE_RANGE_FAILED,

  CHECK_STYLE_RANGE_ANSWER,
  SET_STYLE_RANGE_ANSWER,
} from '../constants/actionTypes';

import { CORRECT, WRONG } from '../constants/answerOptionsTypes';

import {
  LOADED, LOADING, NOTLOADED, ANSWERED
} from '../constants/stateStatusTypes';

import initialState from './initialState';

const getStyleRangeState = ({ styleRangeState = {} }) => styleRangeState;

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function styleRangeReducer(state = getStyleRangeState(initialState), action) {
  const { payload, error, type } = action;
  switch (type) {

    case FETCH_STYLE_RANGE_PENDING:
      return {...state, status: LOADING};

    case FETCH_STYLE_RANGE_SUCCESS: {
      const { styleId: id, name, stats: styleRange} = payload;
      return {
        ...state,
        id,
        name,
        question: {
          ...state.question,
          text: `Define the vital statistics for ${name} (${id}) to your best knowledge:`,
        },
        styleRange,
        userRange: getUserRange(initialState),
        status: LOADED,
      };
    }

    case FETCH_STYLE_RANGE_FAILED:
      return {
        ...state,
        status: LOADED,
        error,
      };

    case SET_STYLE_RANGE_ANSWER: {
      const { name, value } = payload;
      const { low, high } = state.styleRange[name];

      const result = (value >= Number(low) && value <= Number(high))
        ? CORRECT
        : WRONG;

      return {
        ...state,
        userRange: {
          ...state.userRange,
          [name]: { value, result },
        },
      };
    }

    case CHECK_STYLE_RANGE_ANSWER: {
      const wrongFields = Object
        .keys(state.userRange)
        .filter((key) => state.userRange[key].result !== CORRECT)
        .map(field => field.toUpperCase());

      const correctFields = Object
        .values(state.userRange)
        .filter(({ result }) => result === CORRECT).length;

      return {
        ...state,
        result: correctFields >= 4 ? CORRECT : WRONG,
        status: ANSWERED,
        wrongFields,
      };
    }

    default:
      return state;
  }
}

// export const getStyleRangeLoaded = state => getStyleRangeState(state).status === LOADED;

export const getStyleRangeNotLoaded = state => getStyleRangeState(state).status === NOTLOADED;

// export const getStyleRangeLoading = state => getStyleRangeState(state).status === LOADING;

export const getStyleRangeAnswered = state => getStyleRangeState(state).status === ANSWERED;

export const getStyleRange = state => getStyleRangeState(state).styleRange;

export const getUserRange = state => getStyleRangeState(state).userRange;

export const getStyleRangeResult = state => getStyleRangeState(state).result;

// export const getStyleRangeError = state => getStyleRangeState(state).error;

export const getStyleRangeWrongFields = state => getStyleRangeState(state).wrongFields;

export const getStyleRangeQuestion = state => getStyleRangeState(state).question;
