// Time units converted to milliseconds
const timeInMS = {
  year: 1000 * 60 * 60 * 24 * 365.25, // 31557600000
  week: 1000 * 60 * 60 * 24 * 7, // 604800000
  day: 1000 * 60 * 60 * 24, // 86400000
  hour: 1000 * 60 * 60, // 3600000
  minute: 1000 * 60, // 60000
  second: 1000
};

// Mapped long unit to short unit
const longToShortUnit = new Map([
  ["year", "y"],
  ["week", "w"],
  ["day", "d"],
  ["hour", "h"],
  ["day", "d"],
  ["minute", "m"],
  ["second", "s"]
]);

// Default options for undefined options
const defaultParseMSOptions: ParseMSOptions = {
  // Default joinWith option is used based on other options
  short: false,
  replaceLastCommaWithAnd: true
};

/**
 * Converts milliseconds into human-readable text
 * @param ms
 * @param options
 */
export function parseMS(ms: number, options: ParseMSOptions = {}) {
  options = { ...defaultParseMSOptions, ...options };
  options.joinWith ??= options.short ? "" : ", ";

  const { floor } = Math;

  const converted = {
    year: floor(ms / timeInMS.year),
    week: floor(ms / timeInMS.week) % 52,
    day: floor(ms / timeInMS.day) % 7,
    hour: floor(ms / timeInMS.hour) % 24,
    minute: floor(ms / timeInMS.minute) % 60,
    second: floor(ms / timeInMS.second) % 60
  };

  const entries = Object.entries(converted).filter(([, value]) => value !== 0);
  const humanized = entries.map(([unit, value]) => {
    if (options.short) return `${value}${longToShortUnit.get(unit)}`;
    return `${value} ${unit + pluralize(value)}`;
  });

  let text = humanized.join(options.joinWith);
  if (options.replaceLastCommaWithAnd)
    text = replaceLastComma(text, options.joinWith.trim());
  return text;
}

/**
 * Returns an "s" if the word should be pluralized
 * @param count
 */
function pluralize(count: number) {
  return count === 1 ? "" : "s";
}

/**
 * Replaces the last comma with "and"
 * @param text
 * @param joinWith
 */
function replaceLastComma(text: string, joinWith: string) {
  if (joinWith !== ",") return text;
  const regex = /,\s([^,]+)$/;
  return text.replace(regex, " and $1");
}

export interface ParseMSOptions {
  short?: boolean;
  joinWith?: string;
  replaceLastCommaWithAnd?: boolean;
}
