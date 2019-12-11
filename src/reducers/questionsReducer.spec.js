import {
  FETCH_QUESTION_PENDING,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILED,

  CHECK_QUESTION_ANSWER,
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
} from '../constants/stateStatusTypes';

import initialState from './initialState';

import reducer from './questionsReducer';

describe('Reducers::PageSettings', () => {
  const getInitialState = () => initialState.questionState;

  const getQuestion = () => ({
    question: {
      question: 'Is NEIPA hazy and juicy?',
      topic: 'styles',
      exam: 'beer',
      answer: 'a',
      options: [
        { key: 'a', text: 'True', status: NEUTRAL },
        { key: 'b', text: 'False', status: NEUTRAL },
      ],
    },
    status: LOADED,
    result: NEUTRAL,
    error: null,
  });

  const error = new Error('It got broken by itself');

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle pending question fetch', () => {
    const action = {
      type: FETCH_QUESTION_PENDING,
    };

    const expected = {
      ...getQuestion(),
      status: LOADING,
    };

    expect(reducer(getQuestion(), action)).toEqual(expected);
  });


  it('should handle failed question fetch', () => {
    const action = {
      type: FETCH_QUESTION_FAILED,
      error,
    };

    const expecteds = {
      ...getQuestion(),
      status: LOADED,
      error,
    };

    expect(reducer(getQuestion(), action)).toEqual(expecteds);
  });


  it('should handle correct CHECK_QUESTION_ANSWER', () => {
    const action = {
      type: CHECK_QUESTION_ANSWER,
      payload: {
        userAnswer: 'a',
      },
    };

    const expected = {
      ...getQuestion(),
      question: {
        ...getQuestion().question,
        options: [
          { key: 'a', text: 'True', status: CORRECT },
          { key: 'b', text: 'False', status: DISABLED },
        ],
      },
      status: ANSWERED,
      result: CORRECT,
    };

    expect(reducer(getQuestion(), action)).toEqual(expected);
  });

  it('should handle wrong FETCH_QUESTION_SUCCESS', () => {
    const action = {
      type: FETCH_QUESTION_SUCCESS,
      payload: {
        question: 'Is beer good?',
        options: [ 'Yes', 'No' ],
        topic: 'general',
        exam: 'beer',
        answer: 0,
      },
    };

    const expecteds = {
      ...getQuestion(),
      question: {
        question: 'Is beer good?',
        topic: 'General',
        exam: 'Beer',
        answer: 'A',
        options: [
          { key: 'A', text: 'Yes', status: NEUTRAL },
          { key: 'B', text: 'No', status: NEUTRAL },
        ],
      },
      status: LOADED,
      result: NEUTRAL,
    };

    expect(reducer(getQuestion(), action)).toEqual(expecteds);
  });

  it('should handle successful question fetch reducer', () => {
    const action = {
      type: CHECK_QUESTION_ANSWER,
      payload: {
        userAnswer: 'b',
      },
    };

    const expecteds = {
      ...getQuestion(),
      question: {
        ...getQuestion().question,
        options: [
          { key: 'a', text: 'True', status: CORRECT },
          { key: 'b', text: 'False', status: WRONG },
        ],
      },
      status: ANSWERED,
      result: WRONG,
    };

    expect(reducer(getQuestion(), action)).toEqual(expecteds);
  });
});
