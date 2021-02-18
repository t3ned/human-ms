import { regex, units } from "../constants";

/**
 * Converts human-readable text into milliseconds
 * @param text
 */
export function parseHuman(text: string, options: ParseHumanOptions = {}) {
  let ms = 0;

  text = text
    // Ignore commas & "and"
    .replace(/,|(and)/g, "")
    // Replace a/an with 1
    .replace(/\ban?\b/gi, "1")
    // Add times found
    .replace(regex, (_, value, unit) => {
      unit = units.get(unit) || 0;
      ms += Number(value) * unit;
      return "";
    });

  // If there is still text left after calculating the ms,
  // handle the output from the config
  // Remaining text allows other inputted text
  // to surround the valid time units
  // No remaining text means the input matches the time
  // units exactly
  if (text.trim() && !options.ignoreOtherText) return 0;

  return ms;
}

export interface ParseHumanOptions {
  ignoreOtherText?: boolean;
}
