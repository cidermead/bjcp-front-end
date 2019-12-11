import {
  FETCH_QUESTION_PENDING,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILED,

  CHECK_QUESTION_ANSWER,
  REQUEST_QUESTION_HINT,
} from '../constants/actionTypes';

import {
  CORRECT,
  DISABLED,
  NEUTRAL,
  WRONG,
} from '../constants/answerOptionsTypes';

import {
  ANSWERED,
  LOADED,
  LOADING,
  NOTLOADED,
} from '../constants/stateStatusTypes';

import { capitalize, numToChar, getRandom } from '../utils/libs';

import initialState from './initialState';

const getQuestionState = ({ questionState }) => questionState;

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function questionReducer(state = getQuestionState(initialState), action) {
  const { payload, error, type } = action;
  switch (type) {

    case FETCH_QUESTION_PENDING:
      return {
        ...state,
        status: LOADING,
      };

    case FETCH_QUESTION_SUCCESS: {
      const { question, options, topic, exam, answer } = payload;

      return {
        ...state,
        question: {
          question,
          topic: capitalize(topic),
          exam: capitalize(exam),
          answer: numToChar(answer),
          options: options.map((option, index) => ({
              key: numToChar(index),
              text: capitalize(option),
              status: NEUTRAL,
            })
          ),
        },
        status: LOADED,
        result: NEUTRAL,
      };
    }

    case FETCH_QUESTION_FAILED:
      return {
        ...state,
        status: LOADED,
        error,
      };


    case CHECK_QUESTION_ANSWER: {
      const { userAnswer } = payload;
      const result = userAnswer === state.question.answer ? CORRECT : WRONG;

      const options = state.question.options.map(option => {
        if (option.key === userAnswer) {
          return {...option, status: result};
        }

        if (option.key === state.question.answer) {
          return {...option, status: CORRECT};
        }
        return {...option, status: DISABLED};
      });


      return {
        ...state,
        question: { ...state.question, options },
        result,
        status: ANSWERED,
      };
    }

    case REQUEST_QUESTION_HINT: {
      const { options, answer } = state.question;

      const filteredOut = options.map(({ key }) => key).filter(key => key !== answer);

      const randomRemove = Math.ceil(filteredOut.length / 2);

      const removingItems = getRandom(filteredOut, randomRemove);

      if (options.length <= 2) {
        return state;
      }

      return {
        ...state,
        question: {
          ...state.question,
          options: options.map(option => {
            if ( removingItems.includes(option.key) ) {
              return { ...option, status: DISABLED }
            }
            return option;
          }),
        },
      }
    }

    default:
      return state;
  }
}

// export const getQuestionLoaded = state => getQuestionState(state).status === LOADED;

export const getQuestionNotLoaded = state => getQuestionState(state).status === NOTLOADED;

export const getQuestionLoading = state => getQuestionState(state).status === LOADING;

export const getQuestionAnswered = state => getQuestionState(state).status === ANSWERED;

export const getQuestion = state => getQuestionState(state).question;

export const getCanRequestHint = state => getQuestionState(state)
  .question.options.filter(({ status }) => status === NEUTRAL).length > 2;

export const getAnswerResult = state => getQuestionState(state).result;

export const getQuestionError = state => getQuestionState(state).error;
