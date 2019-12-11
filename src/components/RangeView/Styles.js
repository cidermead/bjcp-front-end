import {green, grey, red} from "@material-ui/core/colors";

const Styles = theme => ({
  paper: {
    maxWidth: 880,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },

  option: {

    marginBottom: '1em',
    border: '1px #eee solid',
    borderRadius: '0.25em',
    width: '100%',
  },

  optionPaper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(1),
    cursor: 'pointer',
  },

  CORRECT: {
    backgroundColor: green[500],
    color: green[100],
  },
  WRONG: {
    backgroundColor: red[500],
    color: red[100],
  },
  DISABLED: {
    backgroundColor: grey[300],
    color: grey[100],
  },

  greenAvatar: {
    color: green[100],
    backgroundColor: green[800],
  },
  redAvatar: {
    color: red[100],
    backgroundColor: red[800],
  },

  Control: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },


  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    ':disabled': {
      backgroundColor: '#c0c0c0',
    },
    // width: 200,
  },
  userField: {
  },

  disabled: {
    backgroundColor: '#c0c0c0',
  },
  readOnly: {

  },
  correct: {
    backgroundColor: theme.palette.primary.main,

  },
  wrong: {
    backgroundColor: theme.palette.error.main,

  },
  rangeField: {
    ':disabled': {
      backgroundColor: '#c0c0c0',
    },
  },
});

export default Styles;
