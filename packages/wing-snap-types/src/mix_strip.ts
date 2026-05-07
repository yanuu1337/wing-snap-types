/**
 * @description Shared 6-band + shelves + tilt EQ used on bus, matrix, and main strips.
 */
export type MixStripEQ = {
  on: boolean;
  mdl: "STD" | string;
  mix: number;
  lg: number;
  lf: number;
  lq: number;
  leq: "SHV" | "PEQ" | string;
  "1g": number;
  "1f": number;
  "1q": number;
  "2g": number;
  "2f": number;
  "2q": number;
  "3g": number;
  "3f": number;
  "3q": number;
  "4g": number;
  "4f": number;
  "4q": number;
  "5g": number;
  "5f": number;
  "5q": number;
  "6g": number;
  "6f": number;
  "6q": number;
  hg: number;
  hf: number;
  hq: number;
  heq: "SHV" | "PEQ" | string;
  tilt: number;
};

export type MixStripDelay = {
  on: boolean;
  mode: string;
  dly: number;
};
