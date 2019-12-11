import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';

import styles from './Styles';
import { CORRECT, NEUTRAL, WRONG } from "../../constants/answerOptionsTypes";
import { styleRangeType, userRangeType } from '../../types';

const RangeView = (props) => {
  const {
    checkRangeAnswer,
    classes,
    isAnswered,
    onRangeFieldChange,
    newStyleRangeRequest,
    question,
    styleRange: {
      abv: styleABV,
      fg: styleFG,
      ibu: styleIBU,
      og: styleOG,
      srm: styleSRM,
    },
    styleRangeResult,
    styleRangeWrongFields,
    userRange: {
      abv: userABV,
      fg: userFG,
      ibu: userIBU,
      og: userOG,
      srm: userSRM,
    },
  } = props;

  let wrongFieldsMsg;

  if (styleRangeWrongFields.length === 0) {
    wrongFieldsMsg = '';
  } else if (styleRangeWrongFields.length === 1) {
    wrongFieldsMsg = `However, you got ${styleRangeWrongFields[0]} wrong.`
  } else {
    wrongFieldsMsg = `You got following fields wrong: ${styleRangeWrongFields.join(', ')}.`
  }

  const resultMessage = styleRangeResult === 'CORRECT'
    ? `Good job! You're correct! ${wrongFieldsMsg}`
    : `${wrongFieldsMsg} Practice more, and you'll get it next time.`;

  const buildBottomPanel = (message = '', button = '') => (
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

  const checkTheAnswer = buildBottomPanel(
    'Fill in the style into the middle column.',
    (<Button
      className={classes.button}
      color="primary"
      endIcon={<LiveHelpIcon />}
      onClick={checkRangeAnswer}
      variant="contained"
    >Check!</Button>)
  );

  const nextQuestion = buildBottomPanel(
    resultMessage,
    (<Button
      className={classes.button}
      color="primary"
      endIcon={<ArrowForwardIosIcon />}
      onClick={newStyleRangeRequest}
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
            { question.text }
          </Typography>

          <Grid
            alignItems="stretch"
            container
            direction="row"
            justify="center"
            spacing={1}
          >
            <Grid item xs={4}>
              <TextField
                className={clsx(classes.textField)}
                disabled
                id="og-low"
                label="OG Low"
                margin="normal"
                name="og-low"
                InputLabelProps={{
                  shrink: isAnswered,
                }}
                type="number"
                value={styleOG.low}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                error={isAnswered && userOG.result !== CORRECT}
                id="оg-user"
                name="og"
                value={userOG.value}
                onChange={onRangeFieldChange}
                className={clsx(classes.textField, classes.userField)}
                label="og"
                margin="normal"
                variant="outlined"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  max: 1.210,
                  min: 0.900,
                  readOnly: isAnswered,
                  step: 0.001,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="og-high"
                name="og-high"
                value={styleOG.high}
                className={clsx(classes.textField)}
                label="OG High"
                margin="normal"
                type="number"
                disabled
                InputLabelProps={{
                  shrink: isAnswered,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={1}
          >
            <Grid item xs={4}>
              <TextField
                id="fg-low"
                name="fg-low"
                className={classes.textField}
                label="FG Low"
                margin="normal"
                type="number"
                disabled
                value={styleFG.low}
                InputLabelProps={{
                  shrink: isAnswered,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                error={isAnswered && userFG.result !== CORRECT}
                id="fg-user"
                name="fg"
                value={userFG.value}
                onChange={onRangeFieldChange}
                className={clsx(classes.textField, classes.userField)}
                label="FG"
                margin="normal"
                variant="outlined"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  min: 0.900,
                  max: 1.210,
                  readOnly: isAnswered,
                  step: 0.001,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="fg-high"
                name="fg-high"
                className={clsx(classes.textField)}
                label="FG High"
                margin="normal"
                type="number"
                disabled
                value={styleFG.high}
                InputLabelProps={{
                  shrink: isAnswered,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={1}
          >
            <Grid item xs={4}>
              <TextField
                id="ibu-low"
                name="ibu-low"
                className={classes.textField}
                label="IBU Low"
                margin="normal"
                type="number"
                disabled
                value={styleIBU.low}
                InputLabelProps={{
                  shrink: isAnswered,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                error={isAnswered && userIBU.result !== CORRECT}
                id="ibu-user"
                name="ibu"
                value={userIBU.value}
                onChange={onRangeFieldChange}
                className={clsx(classes.textField, classes.userField)}
                label="IBU"
                margin="normal"
                variant="outlined"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  min: 0.900,
                  max: 1.210,
                  step: 0.001,
                  readOnly: isAnswered,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="ibu-high"
                name="ibu-high"
                className={clsx(classes.textField)}
                label="IBU High"
                margin="normal"
                type="number"
                disabled
                value={styleIBU.high}
                InputLabelProps={{
                  shrink: isAnswered,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={1}
          >
            <Grid item xs={4}>
              <TextField
                id="srm-low"
                mane="srm-low"
                className={clsx(classes.textField)}
                label="SRM Low"
                margin="normal"
                type="number"
                disabled
                value={styleSRM.low}
                InputLabelProps={{
                  shrink: isAnswered,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                error={isAnswered && userSRM.result !== CORRECT}
                id="srm-user"
                name="srm"
                value={userSRM.value}
                onChange={onRangeFieldChange}
                className={clsx(classes.textField, classes.userField)}
                label="SRM"
                margin="normal"
                variant="outlined"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  min: 0.900,
                  max: 1.210,
                  step: 0.001,
                  readOnly: isAnswered,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="srm-high"
                name="srm-high"
                className={clsx(classes.textField)}
                label="SRM High"
                margin="normal"
                type="number"
                disabled
                value={styleSRM.high}
                InputLabelProps={{
                  shrink: isAnswered,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={1}
          >
            <Grid item xs={4}>
              <TextField
                id="abv-low"
                name="abv-low"
                className={clsx(classes.textField)}
                label="ABV Low"
                margin="normal"
                type="number"
                disabled
                value={styleABV.low}
                InputLabelProps={{
                  shrink: isAnswered,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                error={isAnswered && userABV.result !== CORRECT}
                id="abv-user"
                name="abv"
                value={userABV.value}
                onChange={onRangeFieldChange}
                className={clsx(classes.textField, classes.userField)}
                label="ABV"
                margin="normal"
                variant="outlined"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  min: 0.900,
                  max: 1.210,
                  step: 0.001,
                  readOnly: isAnswered,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="abv-high"
                name="abv-high"
                className={clsx(classes.textField)}
                label="ABV High"
                margin="normal"
                type="number"
                disabled
                value={styleABV.high}
                InputLabelProps={{
                  shrink: isAnswered,
                }}
              />
            </Grid>
          </Grid>
        </div>
        <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
          <Toolbar>
            { isAnswered ? nextQuestion : checkTheAnswer }
          </Toolbar>
        </AppBar>
      </Paper>
    </div>
  );
};

RangeView.propTypes = {
  checkRangeAnswer: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  newStyleRangeRequest: PropTypes.func.isRequired,
  onRangeFieldChange: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  styleRange: styleRangeType.isRequired,
  styleRangeResult: PropTypes.oneOf([CORRECT, NEUTRAL, WRONG]).isRequired,
  styleRangeWrongFields: PropTypes.arrayOf(
    PropTypes.oneOf(['ABV', 'FG', 'IBU', 'OG', 'SRM'])
  ).isRequired,
  userRange: userRangeType.isRequired,
};

export default withStyles(styles)(RangeView);
