import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/Help';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Avatar from '@material-ui/core/Avatar';

import styles from './Styles';
import { CORRECT, NEUTRAL, WRONG } from '../../constants/answerOptionsTypes';

import { questionType } from '../../types';

const QuestionView = (props) => {
  const {
    answerResult,
    canRequestHint,
    classes,
    isAnswered,
    newQuestionRequest,
    onSelect,
    question,
    questionHintRequest,
  } = props;

  const resultMessage = answerResult === CORRECT
    ? 'Good job! You\'re correct!'
    : 'Wrong. Don\'t worry, you\'ll get it next time.';

  const buildBottomPanel = (message, button) => (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={7} sm={8} lg={10} align="left">
        <Typography color="textSecondary" >
          { message }
        </Typography>
      </Grid>

      <Grid item xs={5} sm={4} lg={2} align="right">
        { button }
      </Grid>
    </Grid>
  );

  const requestForHelp = canRequestHint ? buildBottomPanel(
    'A little bit hard? Remove few options.',
    (<Button
      className={classes.button}
      color="secondary"
      endIcon={<HelpIcon />}
      onClick={questionHintRequest}
      variant="contained"
    >Hint</Button>)
  ) : null;

  const nextQuestion = buildBottomPanel(
    resultMessage,
    (<Button
      className={classes.button}
      color="primary"
      endIcon={<ArrowForwardIosIcon />}
      onClick={newQuestionRequest}
      variant="contained"
    >Next</Button>)
  );

  return (
    <div>
      <Paper className={classes.paper}>
        <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Typography color="textSecondary" align="left">
                  { `Exam: ${question.exam}` }
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography color="textSecondary" align="right">
                  { `Topic: ${question.topic}` }
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Typography variant="body1">
            { question.question }
          </Typography>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={1}
          >
            {
              question.options.map(({key, text, status}) => {
                let avatarClass = '';

                if (status === 'CORRECT') {
                  avatarClass = 'greenAvatar';
                } else if (status === 'WRONG') {
                  avatarClass = 'redAvatar';
                }

                const onClick = status === NEUTRAL ? onSelect.bind(this, key) : null;

                return (
                  <Grid item xs={12} md={6} key={key}>
                    <Paper className={clsx(classes.optionPaper, classes[status])} onClick={onClick}>
                      <Grid container wrap="nowrap" alignItems="center" spacing={2}>
                        <Grid item>
                          <Avatar className={classes[avatarClass]}>{key}</Avatar>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="body2">{text}</Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                )
              })
            }
          </Grid>
        </div>
        <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
          <Toolbar>
            { isAnswered ? nextQuestion : requestForHelp }
          </Toolbar>
        </AppBar>
      </Paper>
    </div>
  );
};


QuestionView.propTypes = {
  answerResult: PropTypes.oneOf([CORRECT, NEUTRAL, WRONG]).isRequired,
  canRequestHint: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  newQuestionRequest: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  question: questionType.isRequired,
  questionHintRequest: PropTypes.func.isRequired,
};

export default withStyles(styles)(QuestionView);
