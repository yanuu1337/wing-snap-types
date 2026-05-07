import {
  ChannelDynamics,
  ChannelEQ,
  DynamicsSidechainFilter,
} from "./channel";
import {
  EffectInsertSlot,
  InputSection,
  MainSends,
  SendSection,
  TMonSelection,
} from "./primitives";

export type AuxDynamicsSidechain = DynamicsSidechainFilter & {
  src:
    | "SELF"
    | `AUX.${number}`
    | `MAIN.${number}`
    | `MTX.${number}`
    | `BUS.${number}`;
  tap: "IN" | "FILT" | "3" | "4" | "5" | "PFL" | "AFL" | "POST";
};

export type AuxPreInsert = EffectInsertSlot;

export type AuxConfig = {
  [key in `${number}`]: {
    in: InputSection;

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
    tags: string;
    eq: ChannelEQ;
    dyn: ChannelDynamics;
    dynsc: AuxDynamicsSidechain;
    preins: AuxPreInsert;
    main: MainSends;
    send: SendSection;
  };
};
