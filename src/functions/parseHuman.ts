// Time unit aliases converted to milliseconds
const tokens = new Map([
  ["milliseconds", 1],
  ["millisecond", 1],
  ["ms", 1],

  ["seconds", 1000],
  ["second", 1000],
  ["secs", 1000],
  ["sec", 1000],
  ["s", 1000],

  ["minutes", 1000 * 60],
  ["minute", 1000 * 60],
  ["mins", 1000 * 60],
  ["min", 1000 * 60],
  ["m", 1000 * 60],

  ["hours", 1000 * 60 * 60],
  ["hour", 1000 * 60 * 60],
  ["hrs", 1000 * 60 * 60],
  ["hr", 1000 * 60 * 60],
  ["h", 1000 * 60 * 60],

  ["days", 1000 * 60 * 60 * 24],
  ["day", 1000 * 60 * 60 * 24],
  ["d", 1000 * 60 * 60 * 24],

  ["weeks", 1000 * 60 * 60 * 24 * 7],
  ["week", 1000 * 60 * 60 * 24 * 7],
  ["wks", 1000 * 60 * 60 * 24 * 7],
  ["wk", 1000 * 60 * 60 * 24 * 7],
  ["w", 1000 * 60 * 60 * 24 * 7],

  ["months", 1000 * 60 * 60 * 24 * (365.25 / 12)],
  ["month", 1000 * 60 * 60 * 24 * (365.25 / 12)],
  ["b", 1000 * 60 * 60 * 24 * (365.25 / 12)],

  ["years", 1000 * 60 * 60 * 24 * 365.25],
  ["year", 1000 * 60 * 60 * 24 * 365.25],
  ["yrs", 1000 * 60 * 60 * 24 * 365.25],
  ["yr", 1000 * 60 * 60 * 24 * 365.25],
  ["y", 1000 * 60 * 60 * 24 * 365.25]
]);

const tokenKeys = [...tokens.keys()].join("|");
const regex = new RegExp(
  `(-?\\d*\\.?\\d+(?:e[-+]?\\d+)?)\\s*(${tokenKeys})`,
  "gi"
);
const commaRegex = /,/g;
const aAnRegex = /\ban?\b/gi;

/**
 * Converts human-readable text into milliseconds
 * @param text
 */
export function parseHuman(text: string, options: ParseHumanOptions = {}) {
  let ms = 0;

  text = text
    // ignore commas
    .replace(commaRegex, "")
    // a / an = 1
    .replace(aAnRegex, "1")
    // Add times found
    .replace(regex, (_, value, units) => {
      units = tokens.get(units) || 0;
      value = Number(value);
      ms += Number(value) * units;
      return "";
    });

  if (text.trim() && !options.ignoreOtherText) return 0;

  return ms;
}

export interface ParseHumanOptions {
  ignoreOtherText?: boolean;
}
