import type { AeKey16, TMonSelection } from "./primitives";

export type DcaGroup = {
  name: string;
  col: number;
  icon: number;
  led: boolean;
  mute: boolean;
  fdr: number;
  mon: TMonSelection;
};

export type DcaConfig = {
  [K in AeKey16]: DcaGroup;
};
