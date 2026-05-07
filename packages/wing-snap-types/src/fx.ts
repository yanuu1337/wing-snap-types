import type { AeKey16 } from "./primitives";

type FxWet = {
  fxmix: number;
};

export type FxSlotNone = FxWet & { mdl: "NONE" };

/**
 * @description VSS3 Reverb
 */
export type FxSlotVSS3 = FxWet & {
  mdl: "VSS3";
  preset: string;
  load: boolean;
  erpdly: number;
  ertype: string;
  ersize: string;
  erpos: string;
  erbal: number;
  erlc: number;
  ercol: number;
  erlvl: number;
  rvtype: string;
  rvwid: string;
  rvpdly: number;
  dcy: number;
  diff: number;
  rvbal: number;
  rvlvl: number;
  ldcy: number;
  lmdcy: number;
  hmdcy: number;
  hdcy: number;
  hsoft: number;
  lxo: number;
  mxo: number;
  hxo: number;
  lshv: number;
  lsdmp: number;
  hcut: number;
  mtype: string;
  mrate: number;
  mwid: number;
  view: boolean;
};

/**
 * @description Double Vocal
 */
export type FxSlotDouble = FxWet & {
  mdl: "DOUBLE";
  mode: string;
  mix: number;
  sprd: number;
};

/**
 * @description Plate Reverb
 */
export type FxSlotPlate = FxWet & {
  mdl: "PLATE";
  pdel: number;
  size: number;
  dcy: number;
  mult: number;
  damp: number;
  lc: number;
  hc: number;
  att: number;
  sprd: number;
  diff: number;
  spin: number;
  ecl: number;
  ecr: number;
  efl: number;
  efr: number;
};

/**
 * @description Stereo Delay
 */
export type FxSlotStereoDelay = FxWet & {
  mdl: "ST-DL";
  time: number;
  mode: string;
  fact: string;
  pat: string;
  offs: number;
  feed: number;
  flc: number;
  fhc: number;
  lc: number;
  hc: number;
};

/**
 * @description Exciter
 */
export type FxSlotExciter = FxWet & {
  mdl: "EXCITER";
  tune: number;
  peak: number;
  zero: number;
  tmb: number;
  hrm: number;
  mix: number;
  solo: boolean;
};

/**
 * @description Bus Channel (Warm/Eq/Dynamics)
 */
export type FxSlotBusProcessor = FxWet & {
  mdl: "*BUS*";
  w_drv: number;
  w_hrm: number;
  w_col: number;
  w_trim: number;
  w_mix: number;
  w_on: boolean;
  eq_on: boolean;
  g: number;
  lf: string;
  lg: number;
  mf: string;
  mg: number;
  mq: string;
  hf: string;
  hg: number;
  mix: number;
  d_thr: number;
  d_ratio: number;
  d_att: number;
  d_rel: string;
  d_gain: number;
  d_on: boolean;
};

/**
 * @description Psycho Bass
 */
export type FxSlotPBass = FxWet & {
  mdl: "P-BASS";
  int: number;
  bass: number;
  xf: number;
  solo: boolean;
};

/**
 * @description Generic FX engine slot - I haven't tested all of the effects yet, so I'm providing a generic slot for now.
 */
export type GenericFxEngineSlot = FxWet & {
  mdl: string;
  [key: string]: unknown;
};

/**
 * @description FX engine slot - union of all possible FX engine slots
 */
export type FxEngineSlot =
  | FxSlotNone
  | FxSlotVSS3
  | FxSlotDouble
  | FxSlotPlate
  | FxSlotStereoDelay
  | FxSlotExciter
  | FxSlotBusProcessor
  | FxSlotPBass;

export type FxEngineConfig = {
  [K in AeKey16]: FxEngineSlot | GenericFxEngineSlot;
};
