import {
  FETCH_STYLE_RANGE_PENDING,
  FETCH_STYLE_RANGE_SUCCESS,
  FETCH_STYLE_RANGE_FAILED,

  CHECK_STYLE_RANGE_ANSWER,
  SET_STYLE_RANGE_ANSWER,
} from '../constants/actionTypes';

import {
  CORRECT, WRONG
} from '../constants/answerOptionsTypes';

import {
  LOADED, LOADING, ANSWERED
} from '../constants/stateStatusTypes';

import initialState from './initialState';

import reducer from './stylesReducer';

describe('Reducers::PageSettings', () => {
  const getInitialState = () => initialState.styleRangeState;

  const getStyleRange = () => ({
    id: 'X5',
    error: null,
    name: 'Albanian Farmhouse Ale',
    question: {
      text: '',
      topic: 'styles',
      exam: 'beer',
    },
    result: CORRECT,
    status: LOADED,
    styleRange: {
      abv: { low: '2', high: '3.5' },
      fg: { low: '1.000', high: '1.005' },
      ibu: { low: '0', high: '5' },
      og: { low: '1.020', high: '1.033' },
      srm: { low: '3', high: '7' },
    },
    userRange: {
      abv: { value: '3.6', result: WRONG },
      fg: { value: '1.003', result: CORRECT },
      ibu: { value: '1', result: CORRECT },
      og: { value: '1.030', result: CORRECT },
      srm: { value: '5', result: CORRECT },
    },
    wrongFields: [],
  });

  const error = new Error('It got broken by itself');

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle CHECK_STYLE_RANGE_ANSWER', () => {
    const action = {
      type: CHECK_STYLE_RANGE_ANSWER,
    };

    const expecteds = {
      ...getStyleRange(),
      status: ANSWERED,
      wrongFields: ['ABV'],
    };

    expect(reducer(getStyleRange(), action)).toEqual(expecteds);
  });

  it('should handle SET_STYLE_RANGE_ANSWER', () => {
    const action = {
      type: SET_STYLE_RANGE_ANSWER,
      payload: {
        name: 'fg',
        value: 1.006,
      },
    };

    const expecteds = {
      ...getStyleRange(),
      userRange: {
        ...getStyleRange().userRange,
        fg: { value: 1.006, result: WRONG },
      },
    };

    expect(reducer(getStyleRange(), action)).toEqual(expecteds);
  });


  it('should handle pending style range fetch', () => {
    const action = {
      type: FETCH_STYLE_RANGE_PENDING,
    };

    const expecteds = {
      ...getStyleRange(),
      status: LOADING,
    };

    expect(reducer(getStyleRange(), action)).toEqual(expecteds);
  });

  it('should handle failed style range fetch', () => {
    const action = {
      type: FETCH_STYLE_RANGE_FAILED,
      error,
    };

    const expecteds = {
      ...getStyleRange(),
      status: LOADED,
      error,
    };

    expect(reducer(getStyleRange(), action)).toEqual(expecteds);
  });

  it('should handle successful style range fetch', () => {
    const action = {
      type: FETCH_STYLE_RANGE_SUCCESS,
      payload: {
        styleId: '21C',
        name: 'Moldavian IPA',
        stats: {
          abv: { low: '1', high: '2' },
          fg: { low: '1', high: '2' },
          ibu: { low: '1', high: '2' },
          og: { low: '1', high: '2' },
          srm: { low: '1', high: '2' },
        }
      }
    };

    const expecteds = {
      ...getStyleRange(),
      id: '21C',
      name: 'Moldavian IPA',
      question: {
        ...getStyleRange().question,
        text: 'Define the vital statistics for Moldavian IPA (21C) to your best knowledge:',
      },
      styleRange: {
        abv: { low: '1', high: '2' },
        fg: { low: '1', high: '2' },
        ibu: { low: '1', high: '2' },
        og: { low: '1', high: '2' },
        srm: { low: '1', high: '2' },
      },
      userRange: initialState.styleRangeState.userRange,
      status: LOADED,
    };

    expect(reducer(getStyleRange(), action)).toEqual(expecteds);
  });

});
