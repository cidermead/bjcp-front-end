import React from "react";
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';


const categories = [
  {
    id: 'Beer Tasting Exam',
    icon: <SettingsApplicationsIcon />,
    children: [
      { id: 'Ethics and Judging Process', url: '/questions/beer/ethics', icon: <SettingsApplicationsIcon />, active: true },
      { id: 'Wort Production', exam: 'beer', url: '/questions/beer/wort', icon: <SettingsApplicationsIcon /> },
      { id: 'Water', exam: 'beer', url: '/questions/beer/water', icon: <SettingsApplicationsIcon /> },
      { id: 'Malts and Adjuncts', exam: 'beer', url: '/questions/beer/malt', icon: <SettingsApplicationsIcon /> },
      { id: 'Hops', exam: 'beer', url: '/questions/beer/hops', icon: <SettingsApplicationsIcon /> },
      { id: 'Yeast and Fermentation', exam: 'beer', url: '/questions/beer/yeast', icon: <SettingsApplicationsIcon /> },
      { id: 'Troubleshooting', exam: 'beer', url: '/questions/beer/troubleshooting', icon: <SettingsApplicationsIcon /> },
      { id: 'Styles', exam: 'beer', url: '/questions/beer/styles', icon: <SettingsApplicationsIcon /> },
    ],
  },
  {
    id: 'Written Beer Exam',
    children: [
      { id: 'Fill in the Style', exam: 'written', url: '/range', icon: <SettingsApplicationsIcon /> },
      // { id: 'Classic Examples', icon: <PeopleIcon /> },
      // { id: 'Test Lab', icon: <PeopleIcon /> },
    ],
  },
  {
    id: 'Cider Tasting Exam',
    children: [
      { id: 'General', exam: 'cider', url: '/questions/cider/general', icon: <SettingsApplicationsIcon /> },
      { id: 'Apple Varieties', exam: 'cider', url: '/questions/cider/varieties', icon: <SettingsApplicationsIcon /> },
      { id: 'Balance in Cider', exam: 'cider', url: '/questions/cider/balance', icon: <SettingsApplicationsIcon /> },
      { id: 'Cider Faults', exam: 'cider', url: '/questions/cider/faults', icon: <SettingsApplicationsIcon /> },
      { id: 'Making Process', exam: 'cider', url: '/questions/cider/process', icon: <SettingsApplicationsIcon /> },
    ],
  },
  {
    id: 'Mead Tasting Exam',
    children: [
      // { id: 'Honey Variety', icon: <PeopleIcon /> },
      // { id: 'Special Ingridients', icon: <PeopleIcon /> },
    ],
  },
];

export default categories;
