import { Bus } from "./bus";
import { Channel } from "./channel";
import type { AeCards } from "./cards";
import type { DcaConfig } from "./dca";
import type { FxEngineConfig } from "./fx";
import { IoRouting } from "./io";
import type { MainStripConfig } from "./console_main";
import type { MuteGroupConfig } from "./mgrp";
import type { MtxConfig } from "./mtx";
import type { EqParams, TFaderListenType, TTapType } from "./primitives";
import { TalkbackSettings } from "./snapshot";
import { AuxConfig } from "./auxiliary";

/** USB / SD recorder “play” subsection under `ae_data` (compact console snapshot shape). */
export type AeDataPlaySection = {
  repeat: boolean;
};

/** USB / SD recorder “rec” subsection under `ae_data`. */
export type AeDataRecSection = {
  resolution: string;
  channels: string;
};

export type AudioEngineData = {
  cfg: AeDataConfig;
  io: IoRouting;
  ch: {
    [key in `${number}`]: Channel; // 1-40
  };
  aux: AuxConfig;
  bus: {
    [key in `${number}`]: Bus;
  };
  main: MainStripConfig;
  mtx: MtxConfig;
  dca: DcaConfig;
  mgrp: MuteGroupConfig;
  fx: FxEngineConfig;
  cards: AeCards;
  play: AeDataPlaySection;
  rec: AeDataRecSection;
};

export type AeDataConfig = {
  mainlink: "OFF" | string;
  dcamgrp: boolean;
  mon: {
    [key in "1" | "2"]: {
      lvl: number;
      inv: boolean;
      pan: number;
      wid: number;
      eq: EqParams;
      lim: number;
      dly: { on: boolean; m: number };
      dim: number;
      pfldim: number;
      eqbdtrim: number;
      srclvl: number;
      srcmix: number;
      src:
        | `AUX.${number}`
        | `BUS.${number}`
        | `MTX.${number}`
        | `MAIN.${number}`
        | "OFF";
      dirin:
        | `CH.${number}`
        | `AUX.${number}`
        | `BUS.${number}`
        | `MTX.${number}`
        | `MAIN.${number}`
        | "OFF";
    };
  };
  solo: {
    mode: "LIVE" | "STUDIO" | "SIP";
    mon: "PH" | "PH+SPK" | "SPK";
    mute: boolean;
    chtap: TFaderListenType;
    bustap: TFaderListenType;
    maintap: TFaderListenType;
    mtxtap: TFaderListenType;
    srcsolo: "OFF" | "CH39" | "AUX7";
  };
  rta: {
    rtasrc: number;
    rtatap: string; // ! PRE POST ("IN")
    rtadecay: "SLOW" | "MED" | "FAST";
    rtadet: "PEAK" | "RMS" | "AVG";
    rtarange: 30 | 60;
    rtagain: number; // RTA Gain (0 when rtaauto is enabled)
    rtaauto: boolean; // RTA AutoGain
    eqdecay: "SLOW" | "MED" | "FAST";
    eqdet: "PEAK" | "RMS" | "AVG";
    eqrange: number;
    eqgain: number;
    eqauto: boolean;
  };
  mtr: {
    scopesrc: number;
    scopetap: "IN" | "PRE" | "POST";
    mtrsfc: { [key in "in" | "bus" | "main" | "mtx" | "dca"]: TTapType };
    mtrpage: { [key in "in" | "bus" | "main" | "mtx" | "dca"]: TTapType };
    mainmtr: string;
    mainpos: string;
  };
  talk: TalkbackSettings;
  amix: { x: boolean; y: boolean };
};
