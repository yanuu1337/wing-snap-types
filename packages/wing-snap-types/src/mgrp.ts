import type { AeKey8 } from "./primitives";

export type MuteGroup = {
  name: string;
  mute: boolean;
};

export type MuteGroupConfig = {
  [K in AeKey8]: MuteGroup;
};
