import { NOTLOADED } from '../constants/stateStatusTypes';
import { NEUTRAL } from '../constants/answerOptionsTypes';

import { rangeEmpty } from '../constants/configs';

export default {
  fuelSavings: {
    newMpg: '',
    tradeMpg: '',
    newPpg: '',
    tradePpg: '',
    milesDriven: '',
    milesDrivenTimeframe: 'week',
    displayResults: false,
    dateModified: null,
    necessaryDataIsProvidedToCalculateSavings: false,
    savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0,
    },
  },

  pageState: {
    pageId: '',
    pageUrl: '',
  },

  questionState: {
    question: {
      question: '',
      options: [],
      topic: '',
      exam: '',
      answer: '',
    },
    result: NEUTRAL,
    status: NOTLOADED,
    error: null,
  },

  styleRangeState: {
    id: '',
    error: null,
    name: '',
    question: {
      text: '',
      topic: '',
      exam: '',
    },
    result: NEUTRAL,
    status: NOTLOADED,
    styleRange: rangeEmpty,
    userRange: {
      abv: { value: '', result: NEUTRAL },
      fg: { value: '', result: NEUTRAL },
      ibu: { value: '', result: NEUTRAL },
      og: { value: '', result: NEUTRAL },
      srm: { value: '', result: NEUTRAL },
    },
    wrongFields: [],
  },

  style: {},
};
