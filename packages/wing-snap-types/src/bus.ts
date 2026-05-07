import {
  BusDestinationSends,
  BusInputSection,
  EffectInsertSlot,
  MainSends,
  TMonSelection,
} from "./primitives";
import {
  ChannelDynamics,
  ChannelDynamicsCrossover,
  DynamicsSidechainFilter,
} from "./channel";
import type { MixStripDelay, MixStripEQ } from "./mix_strip";

/** @see {@link MixStripEQ} — same six-band strip EQ as matrix / mains. */
export type BusEQ = MixStripEQ;

export type BusDynamicsSidechain = DynamicsSidechainFilter & {
  src:
    | "SELF"
    | `AUX.${number}`
    | `MAIN.${number}`
    | `MTX.${number}`
    | `BUS.${number}`
    | `CH.${number}`;
  tap:
    | "IN"
    | "FILT"
    | "3"
    | "4"
    | "5"
    | "PFL"
    | "AFL"
    | "POST"
    | "BUS";
};

/** @see {@link MixStripDelay} */
export type BusDelay = MixStripDelay;

export type Bus = {
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
  dyn: ChannelDynamics;
  dynxo: ChannelDynamicsCrossover;
  dynsc: BusDynamicsSidechain;
  preins: EffectInsertSlot;
  main: MainSends;
  send: BusDestinationSends;
  postins: EffectInsertSlot;
  dly: MixStripDelay;
  tags: string;
};

export type BusConfig = {
  [key in `${number}`]: Bus;
};
