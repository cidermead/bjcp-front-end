import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QuestionView from '../../components/QuestionView';

import {
  fetchQuestionAction,
} from '../../api/fetchQuestion';

import {
  checkAnswerAction,
  questionHintRequestAction,
} from '../../actions/questionActions';

import {
  setCurrentPageAction,
} from '../../actions/pageActions';

import {
  getQuestionError,
  getQuestion,
  getQuestionNotLoaded,
  getQuestionLoading,
  getQuestionAnswered,
  getAnswerResult,
  getCanRequestHint,
} from '../../reducers/questionsReducer';
import {CORRECT, NEUTRAL, WRONG} from "../../constants/answerOptionsTypes";
import {questionType} from "../../types";

export class Question extends Component {
  state = {
    horizontal: 'center',
    loading: false,
    open: false,
    prevUrl: null,
    vertical: 'top',
  };

  static getDerivedStateFromProps(props, state) {
    const {
      fetchQuestion,
      isLoading,
      match: {
        params: { category, topic },
        url,
      },
      setCurrentPage,
      shouldLoadQuestion,
    } = props;

    const { prevUrl } = state;
    const newState = {};

    if (shouldLoadQuestion || prevUrl != url) {
      fetchQuestion({category, topic});
      setCurrentPage(`${category }-${topic}`, url);

      return {
        prevUrl: url,
      };
    }

    if (isLoading) {
      newState.loading = true;
    }

    return {
      ...newState,
      prevUrl: url,
    };
  }

  constructor(props) {
    super(props);

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  handleClick = newState => {
    this.setState({ open: true, ...newState });
  };

  shouldComponentRender() {
    const { loading } = this.props;

    if(!loading === false) {
      return false;
    }
    return true;
  }

  onSelect = (key, e) => {
    e.preventDefault();
    const { checkAnswer, isAnswered } = this.props;
    if (!isAnswered) {
      checkAnswer(key);

      this.handleClick({ vertical: 'bottom', horizontal: 'right' });
    }
  };

  questionHintRequest = () => {
    this.props.questionHintRequest();
  };

  newQuestionRequest = () => {
    const {
      fetchQuestion,
      match: {
        params: { category, topic }
      },
    } = this.props;

    fetchQuestion({category, topic});
  };

  render() {
    const {
      answerResult,
      canRequestHint,
      isAnswered,
      question,
    } = this.props;

    return (
      <QuestionView
        answerResult={answerResult}
        canRequestHint={canRequestHint}
        isAnswered={isAnswered}
        newQuestionRequest={this.newQuestionRequest}
        onSelect={this.onSelect}
        question={question}
        questionHintRequest={this.questionHintRequest}

      />
    );
  }
}

Question.propTypes = {
  answerResult: PropTypes.oneOf([CORRECT, NEUTRAL, WRONG]).isRequired,
  canRequestHint: PropTypes.bool.isRequired,
  checkAnswer: PropTypes.func,
  fetchQuestion: PropTypes.func.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  question: questionType.isRequired,
  questionHintRequest: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  shouldLoadQuestion: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  answerResult: getAnswerResult(state),
  canRequestHint: getCanRequestHint(state),
  error: getQuestionError(state),
  isAnswered: getQuestionAnswered(state),
  isLoading: getQuestionLoading(state),
  question: getQuestion(state),
  shouldLoadQuestion: getQuestionNotLoaded(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    checkAnswer: checkAnswerAction,
    fetchQuestion: fetchQuestionAction,
    questionHintRequest: questionHintRequestAction,
    setCurrentPage: setCurrentPageAction,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);




