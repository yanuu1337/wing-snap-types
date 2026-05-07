import type { ChannelMode, Oscillator } from "./primitives";

export type ChannelKeys = {
  AUX: "mode" | "mute" | "pol" | "col" | "name" | "icon" | "tags";
  SC: "mode" | "mute" | "pol" | "col" | "name" | "icon" | "tags";
  USB: "mode" | "mute" | "pol" | "col" | "name" | "icon" | "tags";
  CRD: "mode" | "mute" | "pol" | "col" | "name" | "icon" | "tags";
  MOD: "mode" | "mute" | "pol" | "col" | "name" | "icon" | "tags";
  PLAY: "mode" | "mute" | "pol" | "col" | "name" | "icon" | "tags";
  AES: "mode" | "mute" | "pol" | "col" | "name" | "icon" | "tags";
  USR: "mode" | "mute" | "pol" | "col" | "name" | "icon" | "tags";
  OSC: "mode" | "mute" | "col" | "name" | "icon" | "tags" | "osc";
};

export type DefaultInputChannel = {
  mode: ChannelMode;
  g: number;
  vph: boolean;
  mute: boolean;
  pol: boolean;
  col: number;
  name: string;
  icon: number;
  tags: string;
  rmt: string;
  rcvc: boolean;
  osc: Oscillator;
};

export type OutputChannel = {
  grp:
    | "BUS"
    | "MAIN"
    | "MTX"
    | "MON"
    | "FX"
    | "USR"
    | "LCL"
    | "AUX"
    | "AES"
    | "A"
    | "B"
    | "C"
    | "SC"
    | "OSC"
    | "USB"
    | "CRD"
    | "MOD"
    | "PLAY"
    | "REC"
    | "OFF";
  in: number;
};

export type IoRouting = {
  altsw: boolean;
  autoaltovr: boolean;
  in: {
    LCL: { [key in `${number}`]: DefaultInputChannel };
    AUX: {
      [key in `${number}`]: Pick<DefaultInputChannel, ChannelKeys["AUX"]>;
    };
    SC: { [key in `${number}`]: Pick<DefaultInputChannel, ChannelKeys["SC"]> };
    USB: {
      [key in `${number}`]: Pick<DefaultInputChannel, ChannelKeys["USB"]>;
    };
    CRD: {
      [key in `${number}`]: Pick<DefaultInputChannel, ChannelKeys["CRD"]>;
    };
    MOD: {
      [key in `${number}`]: Pick<DefaultInputChannel, ChannelKeys["CRD"]>;
    };
    PLAY: {
      [key in "1" | "2" | "3" | "4"]: Pick<
        DefaultInputChannel,
        ChannelKeys["PLAY"]
      >;
    };
    AES: { [key in "1" | "2"]: Pick<DefaultInputChannel, ChannelKeys["AES"]> };
    USR: {
      [key in `${number}`]: Pick<DefaultInputChannel, ChannelKeys["USR"]>;
    };
    OSC: { [key in "1" | "2"]: Pick<DefaultInputChannel, ChannelKeys["OSC"]> };
  } & {
    [key in "A" | "B" | "C"]: {
      [channelNumber in `${number}`]: DefaultInputChannel;
    };
  };
  out: {
    [K in
      | "LCL"
      | "AUX"
      | "A"
      | "B"
      | "C"
      | "SC"
      | "USB"
      | "CRD"
      | "MOD"
      | "REC"
      | "AES"]: {
      [key in `${number}`]: OutputChannel;
    };
  };
};
