import {
  FETCH_QUESTION_PENDING,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILED,

  CHECK_QUESTION_ANSWER,
  REQUEST_QUESTION_HINT,
} from '../constants/actionTypes';

import {
  fetchQuestionPending,
  fetchQuestionSuccess,
  fetchQuestionError,
  checkAnswerAction,
  questionHintRequestAction,
} from './questionActions';

describe('Question Actions', () => {
  const userAnswer = 10;
  const question = {
    question: 'Is cider worth it?',
    options: [true, false],
    answer: 0,
  };
  const error = new Error('Nothing works');

  it('should create an action to check the user\'s answer', () => {
    const dispatch = jest.fn();
    const expected = {
      type: CHECK_QUESTION_ANSWER,
      payload: { userAnswer },
    };

    // we expect this to return a function since it is a thunk
    expect(typeof (checkAnswerAction(userAnswer))).toEqual('function');
    // then we simulate calling it with dispatch as the store would do
    checkAnswerAction(userAnswer)(dispatch);
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).toBeCalledWith(expected);
  });

  it('should create an action to get the hint', () => {
    const dispatch = jest.fn();
    const expected = { type: REQUEST_QUESTION_HINT };

    // we expect this to return a function since it is a thunk
    expect(typeof (questionHintRequestAction())).toEqual('function');
    // then we simulate calling it with dispatch as the store would do
    questionHintRequestAction()(dispatch);
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).toBeCalledWith(expected);
  });


  it('should create an action to get the hint', () => {
    const dispatch = jest.fn();

    const expected = { type: REQUEST_QUESTION_HINT };

    // we expect this to return a function since it is a thunk
    expect(typeof (questionHintRequestAction())).toEqual('function');
    // then we simulate calling it with dispatch as the store would do
    questionHintRequestAction()(dispatch);
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).toBeCalledWith(expected);
  });

  it('should create an action to a pending question request', () => {
    const actual = fetchQuestionPending();
    const expected = {
      type: FETCH_QUESTION_PENDING,
    };
    expect(actual).toEqual(expected);
  });

  it('should create an action to successful question request', () => {
    const actual = fetchQuestionSuccess(question);
    const expected = {
      type: FETCH_QUESTION_SUCCESS,
      payload: question,
    };

    expect(actual).toEqual(expected);
  });

  it('should create an action to faulty question request', () => {
    const actual = fetchQuestionError(error);
    const expected = {
      type: FETCH_QUESTION_FAILED,
      error,
    };

    expect(actual).toEqual(expected);
  });
});
