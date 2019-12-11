import {
  SET_PAGE_ID,
} from '../constants/actionTypes';

import { setCurrentPageAction } from './pageActions';

describe('Actions', () => {
  const pageState = {
    pageId: 'wine-chardonnay',
    pageUrl: '/questions/wine/chardonnay',
  };

  it('should create an action to update the page', () => {
    const dispatch = jest.fn();

    const expected = {
      type: SET_PAGE_ID,
      payload: pageState,
    };

    // we expect this to return a function since it is a thunk
    expect(typeof (setCurrentPageAction(pageState.pageId, pageState.pageUrl))).toEqual('function');
    // then we simulate calling it with dispatch as the store would do
    setCurrentPageAction(pageState.pageId, pageState.pageUrl)(dispatch);
    // finally assert that the dispatch was called with our expected action

    //console.log(dispatch)
    expect(dispatch).toBeCalledWith(expected);
  });
});
