import { ParseMSOptions } from "./index";

// Time units converted to milliseconds
export const timeInMS = {
  year: 1000 * 60 * 60 * 24 * 365.25,
  month: 1000 * 60 * 60 * 24 * (365.25 / 12),
  week: 1000 * 60 * 60 * 24 * 7,
  day: 1000 * 60 * 60 * 24,
  hour: 1000 * 60 * 60,
  minute: 1000 * 60,
  second: 1000,
  millisecond: 1
};

// Mapped long unit to short unit names
export const longToShortUnit = new Map([
  ["year", "y"],
  ["week", "w"],
  ["day", "d"],
  ["hour", "h"],
  ["day", "d"],
  ["minute", "m"],
  ["second", "s"]
]);

// Default options for undefined options
export const defaultParseMSOptions: ParseMSOptions = {
  // joinWith: option is determined based on other options
  short: false,
  replaceLastCommaWithAnd: true
};

// Time unit aliases converted to milliseconds
export const units = new Map([
  ["years", timeInMS.year],
  ["year", timeInMS.year],
  ["yrs", timeInMS.year],
  ["yr", timeInMS.year],
  ["y", timeInMS.year],

  ["months", timeInMS.month],
  ["month", timeInMS.month],
  ["b", timeInMS.month],

  ["weeks", timeInMS.week],
  ["week", timeInMS.week],
  ["wks", timeInMS.week],
  ["wk", timeInMS.week],
  ["w", timeInMS.week],

  ["days", timeInMS.day],
  ["day", timeInMS.day],
  ["d", timeInMS.day],

  ["hours", timeInMS.hour],
  ["hour", timeInMS.hour],
  ["hrs", timeInMS.hour],
  ["hr", timeInMS.hour],
  ["h", timeInMS.hour],

  ["minutes", timeInMS.minute],
  ["minute", timeInMS.minute],
  ["mins", timeInMS.minute],
  ["min", timeInMS.minute],
  ["m", timeInMS.minute],

  ["seconds", timeInMS.second],
  ["second", timeInMS.second],
  ["secs", timeInMS.second],
  ["sec", timeInMS.second],
  ["s", timeInMS.second],

  ["milliseconds", timeInMS.millisecond],
  ["millisecond", timeInMS.millisecond],
  ["ms", timeInMS.millisecond]
]);

// Regex for matching units
const valueRegex = `(-?\\d*\\.?\\d+(?:e[-+]?\\d+)?)\\s*`;
const unitRegex = `(${[...units.keys()].join("|")})`;
export const regex = new RegExp(valueRegex + unitRegex, "gi");
