// Centralized propType definitions
import PropTypes, { shape, number, bool, string, arrayOf, oneOf, oneOfType } from 'prop-types';
import { CORRECT, DISABLED, NEUTRAL, WRONG } from "../constants/answerOptionsTypes";

export const fuelSavings = shape({
  newMpg: oneOfType([number,string]),
  tradeMpg: oneOfType([number,string]),
  newPpg: oneOfType([number,string]),
  tradePpg: oneOfType([number,string]),
  milesDriven: oneOfType([number,string]),
  milesDrivenTimeframe: string,
  displayResult: bool,
  dateModified: string,
  necessaryDataIsProvidedToCalculateSavings: bool,
  savings: savings
});

export const savings = shape({
  monthly: oneOfType([number,string]),
  annual: oneOfType([number,string]),
  threeYear: oneOfType([number,string]),
});



export const optionType = arrayOf(PropTypes.shape({
  key: string,
  text: string,
  status: oneOf([CORRECT, DISABLED, NEUTRAL, WRONG]),
}));

export const questionType = shape({
  options: optionType,
  question: string,
  exam: string,
  topic: string,
});

export const styleRangeFieldType = PropTypes.shape({
  low: PropTypes.string,
  high: PropTypes.string,
});

export const userRangeFieldType = PropTypes.shape({
  value: PropTypes.string,
  result: PropTypes.oneOf([CORRECT, NEUTRAL, WRONG]),
});

export const styleRangeType = PropTypes.shape({
  abv: styleRangeFieldType,
  ibu: styleRangeFieldType,
  fg: styleRangeFieldType,
  og: styleRangeFieldType,
  srm: styleRangeFieldType,
});

export const userRangeType = PropTypes.shape({
  abv: userRangeFieldType,
  ibu: userRangeFieldType,
  fg: userRangeFieldType,
  og: userRangeFieldType,
  srm: userRangeFieldType,
});
