/** Small shared types and reusable aliases (sends, trims, inserts, keyed indices). */
export type TFaderListenType = "AFL" | "PFL";
export type TTapType = "PRE" | "POST";
export type ChannelMode = "M" | "ST" | "M/S";
export type TMonSelection = "A" | "B";
export type EqParams = {
  on: boolean;
  lsg: number;
  lsf: number;
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
  hsg: number;
  hsf: number;
};

export type Oscillator = {
  lvl: number;
  mode: "SINE" | "PINK" | "WHITE";
  f: number;
};

export type MainSend = {
  on: boolean;
  lvl: number;
  pre: boolean;
};

/**
 * Effect slot used for pre/post insert paths where only on + FX selection apply.
 * (Distinct from full channel post-insert which adds mode and wet.)
 */
export type EffectInsertSlot = {
  on: boolean;
  ins: `FX${number}` | "NONE";
};

/**
 * Destination sends from a bus to mix buses / matrix (on / level / pre).
 * Same shape as {@link MainSend} per destination; distinct from {@link SendSection}
 * (channel bus sends with tap / pan / etc.).
 */
export type BusDestinationSends = {
  [K in
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"
    | "MX1"
    | "MX2"
    | "MX3"
    | "MX4"
    | "MX5"
    | "MX6"
    | "MX7"
    | "MX8"]: MainSend;
};

export type SendTap = "PRE" | "POST" | "GRP";

export type MainSends = {
  [K in "1" | "2" | "3" | "4"]: MainSend;
};

/** Standard 1–8 index within engine blocks (mtx, mgrp, …). */
export type AeKey8 = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

/** Standard 1–16 index (fx slots, dca groups, …). */
export type AeKey16 =
  | AeKey8
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16";

/** Main L/R/Center/… strip index (four mains). */
export type AeMainKey = "1" | "2" | "3" | "4";

/**
 * Matrix sends from a main strip (MX1–MX8 only); same fields as {@link MainSend}.
 */
export type MainToMatrixSends = {
  [K in "MX1" | "MX2" | "MX3" | "MX4" | "MX5" | "MX6" | "MX7" | "MX8"]: MainSend;
};

export type BusSend = {
  on: boolean;
  lvl: number;
  pon: boolean;
  mode: SendTap;
  plink: -1 | 0 | 1;
  pan: number;
};

export type BusSends1to16 = {
  [K in
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12"
    | "13"
    | "14"
    | "15"
    | "16"]: BusSend;
};

export type MatrixSends = {
  [K in "MX1" | "MX2" | "MX3" | "MX4" | "MX5" | "MX6" | "MX7" | "MX8"]: BusSend;
};

export type SendSection = BusSends1to16 & MatrixSends;

export type InputBlock = {
  srcauto: boolean;
  altsrc: boolean;
  inv: boolean;
  trim: number;
  bal: number;
  dlymode: "M" | "FT" | "MS" | "SMP";
  dly: number;
  dlyon: boolean;
  $g: number;
  $vph: number;
};

/** Input trim block used on bus input paths (subset of {@link InputBlock}). */
export type InputTrimSet = Pick<InputBlock, "inv" | "trim" | "bal">;

export type BusInputSection = {
  set: InputTrimSet;
};

export type InputPatch = {
  grp: string;
  in: number;
  altgrp: string;
  altin: number;
};

export type InputSection = {
  set: InputBlock;
  conn: InputPatch;
};
