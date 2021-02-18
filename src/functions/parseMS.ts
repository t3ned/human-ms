import { defaultParseMSOptions, timeInMS, longToShortUnit } from "../constants";

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
  // Only replace the last comma if the times are joined with commas
  if (joinWith !== ",") return text;
  const regex = /,\s([^,]+)$/;
  return text.replace(regex, " and $1");
}

export interface ParseMSOptions {
  short?: boolean;
  joinWith?: string;
  replaceLastCommaWithAnd?: boolean;
}
