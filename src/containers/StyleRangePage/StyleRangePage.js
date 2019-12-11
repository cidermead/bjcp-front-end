import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  checkRangeAnswerAction,
  setUserRangeAction,
} from '../../actions/styleActions';

import {
  getStyleRange,
  getStyleRangeAnswered,
  getStyleRangeNotLoaded,
  getStyleRangeQuestion,
  getStyleRangeResult,
  getStyleRangeWrongFields,
  getUserRange,
} from '../../reducers/stylesReducer';

import {
  fetchStyleRangeAction,
} from '../../api/fetchStyle';

import {
  setCurrentPageAction,
} from '../../actions/pageActions';

import RangeView from '../../components/RangeView';

import { styleRangeType, userRangeType } from '../../types';
import { CORRECT, NEUTRAL, WRONG } from '../../constants/answerOptionsTypes';
import { rangeEmpty } from '../../constants/configs';

class StyleRange extends Component {
  state = {
    loading: false,
    prevUrl: null,
  };

  static getDerivedStateFromProps(props, state) {
    const {
      fetchStyleRange,
      match: {
        params: { category, topic },
        url,
      },
      setCurrentPage,
      shouldLoadStyleRange,
    } = props;

    const { prevUrl } = state;
    const newState = {};

    if (shouldLoadStyleRange || prevUrl != url) {
      fetchStyleRange();
      setCurrentPage(`${category }-${topic}`, url);

      return {
        prevUrl: url,
      };
    }

    return {
      ...newState,
      prevUrl: url,
    }
  }

  constructor(props) {
    super(props);

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  shouldComponentRender() {
    const { loading } = this.props;

    if(!loading === false) {
      return false;
    }
    return true;
  }

  onRangeFieldChange = ({ target: { name, value } }) => {
    this.props.setUsersRange(name, value);
  };

  newStyleRangeRequest = () => {
    this.props.fetchStyleRange();
  };

  render() {
    const {
      isAnswered,
      checkRangeAnswer,
      question,
      styleRange,
      styleRangeResult,
      styleRangeWrongFields,
      userRange,
    } = this.props;

    return (
      <RangeView
        checkRangeAnswer={checkRangeAnswer}
        isAnswered={isAnswered}
        onRangeFieldChange={this.onRangeFieldChange}
        newStyleRangeRequest={this.newStyleRangeRequest}
        question={question}
        styleRange={isAnswered ? styleRange : rangeEmpty}
        styleRangeResult={styleRangeResult}
        styleRangeWrongFields={styleRangeWrongFields}
        userRange={userRange}
      />
    );
  }
}

StyleRange.propTypes = {
  match: PropTypes.object.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  checkRangeAnswer: PropTypes.func.isRequired,
  fetchStyleRange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  question: PropTypes.object.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setUsersRange: PropTypes.func.isRequired,
  shouldLoadStyleRange: PropTypes.bool.isRequired,
  styleRange: styleRangeType.isRequired,
  styleRangeResult: PropTypes.oneOf([CORRECT, NEUTRAL, WRONG]).isRequired,
  styleRangeWrongFields: PropTypes.arrayOf(
    PropTypes.oneOf(['ABV', 'FG', 'IBU', 'OG', 'SRM'])
  ).isRequired,
  userRange: userRangeType.isRequired,
};

const mapStateToProps = (state) => ({
  isAnswered: getStyleRangeAnswered(state),
  question: getStyleRangeQuestion(state),
  shouldLoadStyleRange: getStyleRangeNotLoaded(state),
  styleRange: getStyleRange(state),
  styleRangeResult: getStyleRangeResult(state),
  styleRangeWrongFields: getStyleRangeWrongFields(state),
  userRange: getUserRange(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    checkRangeAnswer: checkRangeAnswerAction,
    fetchStyleRange: fetchStyleRangeAction,
    setUsersRange: setUserRangeAction,
    setCurrentPage: setCurrentPageAction,
  }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyleRange);
