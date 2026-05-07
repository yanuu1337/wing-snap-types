import {
  type AeKey8,
  BusInputSection,
  EffectInsertSlot,
  TMonSelection,
} from "./primitives";
import { ChannelDynamics, ChannelDynamicsCrossover } from "./channel";
import { BusDynamicsSidechain } from "./bus";
import type { MixStripDelay, MixStripEQ } from "./mix_strip";

export type MtxDir = {
  on: boolean;
  lvl: number;
  inv: boolean;
  in: "OFF" | string; //!?
};

export type Mtx = {
  in: BusInputSection;
  dir: MtxDir;
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
  dyn: ChannelDynamics;
  dynxo: ChannelDynamicsCrossover;
  dynsc: BusDynamicsSidechain;
  preins: EffectInsertSlot;
  postins: EffectInsertSlot;
  dly: MixStripDelay;
  tags: string;
};

export type MtxConfig = {
  [K in AeKey8]: Mtx;
};
