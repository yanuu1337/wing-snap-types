import {
  EffectInsertSlot,
  InputSection,
  MainSends,
  SendSection,
  TMonSelection,
} from "./primitives";

export type ChannelFilterSection = {
  lc: boolean;
  lcf: number;
  lcs: string;
  hc: boolean;
  hcf: number;
  hcs: string;
  tf: boolean;
  mdl: "TILT" | "MAX" | "AP1" | "AP2";
  tilt: number;
};

export type ChannelPeq3 = {
  on: boolean;
  "1g": number;
  "1f": number;
  "1q": number;
  "2g": number;
  "2f": number;
  "2q": number;
  "3g": number;
  "3f": number;
  "3q": number;
};

export type ChannelGate = {
  on: boolean;
  mdl: string;
  mix: number;
  gain: number;
  thr: number;
  range: number;
  att: number;
  hld: number;
  rel: number;
  acc: number;
  ratio: "gate" | string;
};

export type DynamicsSidechainFilter = {
  type: "BP" | "LP12" | "HP12" | "NOTCH" | "OFF";
  f: number;
  q: number;
};

export type ChannelGateSidechain = DynamicsSidechainFilter & {
  src: "SELF" | string;
  tap: "IN" | string;
};

export type ChannelEQ = {
  on: boolean;
  mdl: "STD" | string;
  mix: number;
  lg: number;
  lf: number;
  lq: number;
  leq: "SHV" | "PEQ";
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
  hg: number;
  hf: number;
  hq: number;
  heq: "SHV" | "PEQ";
};

export type ChannelDynamics = {
  on: boolean;
  mdl: string;
  mix: number;
  gain: number;
  thr: number;
  ratio: number;
  knee: number;
  det: "RMS" | "PEAK";
  att: number;
  hld: number;
  rel: number;
  env: "LIN" | "LOG";
  auto: boolean;
};

export type ChannelDynamicsCrossover = {
  depth: number;
  type: "S6" | "LO" | "HI" | "S12" | "PEAK" | "OFF";
  f: number;
  q: number;
};

export type ChannelDynamicsSidechain = DynamicsSidechainFilter & {
  src: "SELF" | `CH.${number}`;
  tap: "IN" | "FILT" | "3" | "4" | "5" | "PFL" | "AFL" | "POST";
};

export type ChannelPreInsert = EffectInsertSlot;

export type ChannelPostInsert = {
  on: boolean;
  mode: "FX" | string;
  ins: `FX${number}` | "NONE";
  w: number;
};

export type Channel = {
  in: InputSection;
  flt: ChannelFilterSection;
  clink: boolean;
  col: number;
  name: string;
  icon: number;
  led: boolean;
  mute: boolean;
  fdr: number;
  pan: number;
  wid: number;
  solosafe: boolean;
  mon: TMonSelection;
  // Processing Order - Gate, EQ, Dynamics, Insert
  proc: "GEDI" | string;
  ptap: string;
  peq: ChannelPeq3;
  gate: ChannelGate;
  gatesc: ChannelGateSidechain;
  eq: ChannelEQ;
  dyn: ChannelDynamics;
  dynxo: ChannelDynamicsCrossover;
  dynsc: ChannelDynamicsSidechain;
  preins: ChannelPreInsert;
  main: MainSends;
  send: SendSection;
  tapwid: number;
  postins: ChannelPostInsert;
  tags: string;
};
