import type {
  AuxConfig,
  Channel,
  ChannelDynamics,
  ChannelDynamicsCrossover,
  ChannelDynamicsSidechain,
  ChannelEQ,
  ChannelFilterSection,
  ChannelGate,
  ChannelGateSidechain,
  ChannelPeq3,
  ChannelPostInsert,
  MainSends,
  SendSection,
  TMonSelection,
} from "wing-snap-types";
import { StripInput } from "./strip_input.js";

/** Scribble-strip / bay controls. */
export class ChannelStripSurface {
  constructor(private readonly ch: Channel) {}

  get name(): string {
    return this.ch.name;
  }

  get mute(): boolean {
    return this.ch.mute;
  }

  get fader(): number {
    return this.ch.fdr;
  }

  get pan(): number {
    return this.ch.pan;
  }

  get width(): number {
    return this.ch.wid;
  }

  get soloSafe(): boolean {
    return this.ch.solosafe;
  }

  get monitor(): TMonSelection {
    return this.ch.mon;
  }

  get color(): number {
    return this.ch.col;
  }

  get icon(): number {
    return this.ch.icon;
  }

  get clipLed(): boolean {
    return this.ch.led;
  }

  get link(): boolean {
    return this.ch.clink;
  }

  get tags(): string {
    return this.ch.tags;
  }
}

/** Gate / EQ / dynamics stack. */
export class ChannelStripProcessing {
  constructor(private readonly ch: Channel) {}

  get filter(): ChannelFilterSection {
    return this.ch.flt;
  }

  get parametricEq(): ChannelPeq3 {
    return this.ch.peq;
  }

  get gate(): ChannelGate {
    return this.ch.gate;
  }

  get gateSidechain(): ChannelGateSidechain {
    return this.ch.gatesc;
  }

  get eq(): ChannelEQ {
    return this.ch.eq;
  }

  get dynamics(): ChannelDynamics {
    return this.ch.dyn;
  }

  get dynamicsCrossover(): ChannelDynamicsCrossover {
    return this.ch.dynxo;
  }

  get dynamicsSidechain(): ChannelDynamicsSidechain {
    return this.ch.dynsc;
  }

  get order(): string {
    return this.ch.proc;
  }

  /** Processing tap routing label from snapshot. */
  get tapHint(): string {
    return this.ch.ptap;
  }
}

/** Pre/post inserts, mains, buses. */
export class ChannelStripRouting {
  constructor(private readonly ch: Channel) {}

  get preInsert() {
    return this.ch.preins;
  }

  get postInsert(): ChannelPostInsert {
    return this.ch.postins;
  }

  get mains(): MainSends {
    return this.ch.main;
  }

  get sends(): SendSection {
    return this.ch.send;
  }

  get tapWidth(): number {
    return this.ch.tapwid;
  }
}

/**
 * Readable channel strip over raw {@link Channel}. Prefer this over dereferencing `.raw`
 * unless you need fields not surfaced here yet.
 */
export class ChannelStripView {
  private _surface?: ChannelStripSurface;
  private _processing?: ChannelStripProcessing;
  private _routing?: ChannelStripRouting;
  private _input?: StripInput;

  constructor(readonly strip: Channel) {}

  /** Same object the console JSON uses (`ae_data.ch[n]`). */
  get raw(): Channel {
    return this.strip;
  }

  /** Input trim + patch (was `strip.in`). */
  get input(): StripInput {
    this._input ??= new StripInput(this.strip.in);
    return this._input;
  }

  get surface(): ChannelStripSurface {
    this._surface ??= new ChannelStripSurface(this.strip);
    return this._surface;
  }

  get processing(): ChannelStripProcessing {
    this._processing ??= new ChannelStripProcessing(this.strip);
    return this._processing;
  }

  get routing(): ChannelStripRouting {
    this._routing ??= new ChannelStripRouting(this.strip);
    return this._routing;
  }
}

export type AuxStripPayload = AuxConfig[keyof AuxConfig];

/** Basic bay controls on an aux strip. */
export class AuxStripSurface {
  constructor(private readonly a: AuxStripPayload) {}

  get name(): string {
    return this.a.name;
  }

  get mute(): boolean {
    return this.a.mute;
  }

  get fader(): number {
    return this.a.fdr;
  }

  get pan(): number {
    return this.a.pan;
  }

  get color(): number {
    return this.a.col;
  }
}

/** AUX path with **`input`** (settings + source) like channel strips. */
export class AuxStripView {
  private _surface?: AuxStripSurface;

  constructor(readonly aux: AuxStripPayload) {}

  get raw(): AuxStripPayload {
    return this.aux;
  }

  get input(): StripInput {
    return new StripInput(this.aux.in);
  }

  get surface(): AuxStripSurface {
    this._surface ??= new AuxStripSurface(this.aux);
    return this._surface;
  }
}