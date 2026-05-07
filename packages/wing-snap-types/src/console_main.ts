import {
  type AeMainKey,
  BusInputSection,
  EffectInsertSlot,
  MainToMatrixSends,
  TMonSelection,
} from "./primitives";
import { ChannelDynamicsCrossover } from "./channel";
import { BusDynamicsSidechain } from "./bus";
import type { MixStripDelay, MixStripEQ } from "./mix_strip";

/** Compressor dynamics used on main strips (distinct from channel {@link ChannelDynamics}). */
export type MainStripDynamics = {
  on: boolean;
  mdl: string;
  mix: number;
  gain: number;
  lon: boolean;
  lthr: number;
  lrec: string;
  lfast: boolean;
  con: boolean;
  cthr: number;
  ratio: number;
  crec: string;
  cfast: boolean;
  cgain: number;
};

export type MainStrip = {
  in: BusInputSection;
  col: number;
  name: string;
  icon: number;
  led: boolean;
  busmono: boolean;
  mute: boolean;
  fdr: number;
  pan: number;
  wid: number;
  mon: TMonSelection;
  eq: MixStripEQ;
  dyn: MainStripDynamics;
  dynxo: ChannelDynamicsCrossover;
  dynsc: BusDynamicsSidechain;
  preins: EffectInsertSlot;
  send: MainToMatrixSends;
  postins: EffectInsertSlot;
  dly: MixStripDelay;
  tags: string;
};

export type MainStripConfig = {
  [K in AeMainKey]: MainStrip;
};
