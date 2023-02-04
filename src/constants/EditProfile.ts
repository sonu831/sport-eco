import moment from 'moment';

export const GENDER_OPTIONS = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
];

export const CITY_OPTIONS = [
  {label: 'Ghaziabad', value: 'gzb'},
  {label: 'Meerut', value: 'meerut'},
  {label: 'Muzaffarnagar', value: 'mzf'},
  {label: 'Hapur', value: 'hapur'},
];

export const STATE_OPTIONS = [
  {label: 'Uttar Pradesh', value: 'up'},
  {label: 'Maharastra', value: 'mh'},
  {label: 'Punjab', value: 'pb'},
  {label: 'Gujarat', value: 'gj'},
];

export const DATE_OPTIONS = () =>
  Array.from({length: 31}).map((_, i) => {
    const value = `${i + 1}`;
    const formattedValue = value.length === 1 ? `0${value}` : value;

    return {
      label: formattedValue,
      value: formattedValue,
    };
  });

export const MONTH_OPTIONS = () =>
  Array.apply(0, Array(12)).map((_, i) => ({
    label: moment().month(i).format('MMM'),
    value: moment().month(i).format('MMM'),
  }));
