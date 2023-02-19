import moment from "moment";

export const GENDER_OPTIONS = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
  { label: "Other", value: "O" },
];

export const CITY_OPTIONS = [
  { label: "Ghaziabad", value: "Ghaziabad" },
  { label: "Meerut", value: "Meerut" },
  { label: "Muzaffarnagar", value: "Muzaffarnagar" },
  { label: "Hapur", value: "Hapur" },
];

export const STATE_OPTIONS = [
  { label: "Uttar Pradesh", value: "up" },
  { label: "Maharastra", value: "mh" },
  { label: "Punjab", value: "pb" },
  { label: "Gujarat", value: "gj" },
];

export const DATE_OPTIONS = () =>
  Array.from({ length: 31 }).map((_, i) => {
    const value = `${i + 1}`;
    const formattedValue = value.length === 1 ? `0${value}` : value;

    return {
      label: formattedValue,
      value: formattedValue,
    };
  });

export const MONTH_OPTIONS = () =>
  Array.apply(0, Array(12)).map((_, i) => ({
    label: moment().month(i).format("MMM"),
    value: moment().month(i).format("MMM"),
  }));

export const ROLE_OPTIONS = ["player", "coach", "parent"];
