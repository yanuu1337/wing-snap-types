import type { TMonSelection } from "./primitives";
import type { AudioEngineData } from "./audio_engine_data";

export type TalkbackSettings = {
  assign: "CH40" | "AUX8" | "OFF";
  lvl: number;
} & {
  [K in TMonSelection]: {
    mode: "AUTO" | "PUSH" | "LATCH";
    mondim: number;
    busdim: number;
    indiv: boolean;
    B1: boolean;
    B2: boolean;
    B3: boolean;
    B4: boolean;
    B5: boolean;
    B6: boolean;
    B7: boolean;
    B8: boolean;
    B9: boolean;
    B10: boolean;
    B11: boolean;
    B12: boolean;
    B13: boolean;
    B14: boolean;
    B15: boolean;
    B16: boolean;
    MX1: boolean;
    MX2: boolean;
    MX3: boolean;
    MX4: boolean;
    MX5: boolean;
    MX6: boolean;
    MX7: boolean;
    MX8: boolean;
    M1: boolean;
    M2: boolean;
    M3: boolean;
    M4: boolean;
  };
};

export type SnapshotFile = {
  type: string;
  creator_fw: string;
  creator_sn: string;
  creator_model: string;
  creator_version: string;
  creator_name: string;
  created: Date;
  active_show: string;
  active_scene: `I:/${string}.snap`;
  ae_data: AudioEngineData;
};
