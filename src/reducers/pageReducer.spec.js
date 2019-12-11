import { SET_PAGE_ID } from '../constants/actionTypes';
import reducer from './pageReducer';

describe('Reducers::PageSettings', () => {
  const getInitialState = () => {
    return {
      pageId: '',
      pageUrl: '',
    };
  };

  const getPageUrl = () => {
    return {
      pageId: 'wine-zin',
      pageUrl: '/question/wine/zin',
    };
  };

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle CALCULATE_FUEL_SAVINGS', () => {
    const action = {
      type: SET_PAGE_ID,
      payload: getPageUrl(),
    };

    const expecteds = {
      pageId: 'wine-zin',
      pageUrl: '/question/wine/zin',
    };

    expect(reducer(getInitialState(), action)).toEqual(expecteds);
  });
});
