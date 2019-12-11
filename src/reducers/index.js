import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import questionReducer from './questionsReducer';
import stylesReducer from './stylesReducer';
import pageReducer from './pageReducer';



import { connectRouter } from 'connected-react-router'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  fuelSavings,
  pageState: pageReducer,
  questionState: questionReducer,
  styleRangeState: stylesReducer,
});

export default rootReducer;
