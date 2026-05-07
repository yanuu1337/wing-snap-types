import type {
  AeDataPlaySection,
  AeDataRecSection,
  AeDataConfig,
  AudioEngineData,
  Channel,
  DefaultInputChannel,
  DcaConfig,
  FxEngineConfig,
  IoRouting,
  MainStripConfig,
  MuteGroupConfig,
  MtxConfig,
  AeCards,
} from "wing-snap-types";
import {
  AuxStripView,
  ChannelStripView,
  type AuxStripPayload,
} from "./views/channel_strip.js";

/**
 * Thin wrapper around {@link AudioEngineData} (`ae_data`) for navigation helpers.
 */
export class ConsoleEngine {
  private _io?: ConsoleIo;

  constructor(readonly aeData: AudioEngineData) {}

  get io(): ConsoleIo {
    this._io ??= new ConsoleIo(this.aeData.io, this);
    return this._io;
  }

  get cfg(): AeDataConfig {
    return this.aeData.cfg;
  }

  get fx(): FxEngineConfig {
    return this.aeData.fx;
  }

  get cards(): AeCards {
    return this.aeData.cards;
  }

  get aux(): AudioEngineData["aux"] {
    return this.aeData.aux;
  }

  get bus(): AudioEngineData["bus"] {
    return this.aeData.bus;
  }

  get main(): MainStripConfig {
    return this.aeData.main;
  }

  get mtx(): MtxConfig {
    return this.aeData.mtx;
  }

  get dca(): DcaConfig {
    return this.aeData.dca;
  }

  get mgrp(): MuteGroupConfig {
    return this.aeData.mgrp;
  }

  get play(): AeDataPlaySection {
    return this.aeData.play;
  }

  get rec(): AeDataRecSection {
    return this.aeData.rec;
  }

  /**
   * Readable channel strip (`ae_data.ch`).
   * Raw JSON shape: {@link ChannelStripView.raw}.
   */
  getChannel(id: number | string): ChannelStripView {
    return new ChannelStripView(this.requireChannelRaw(id));
  }

  getChannels(): ChannelStripView[] {
    return this.listChannelKeys().map((k) =>
      this.getChannel(k),
    );
  }

  /** Raw `ae_data.ch` object (escape hatch). */
  getChannelRaw(id: number | string): Channel {
    return this.requireChannelRaw(id);
  }

  iterChannelEntries(): IterableIterator<readonly [string, ChannelStripView]> {
    function* iter(self: ConsoleEngine) {
      for (const id of self.listChannelKeys()) {
        yield [id, self.getChannel(id)] as const;
      }
    }
    return iter(this);
  }

  /** Readable aux strip (`ae_data.aux`). */
  getAuxStrip(id: number | string): AuxStripView {
    return new AuxStripView(this.requireAuxPayload(id));
  }

  private requireChannelRaw(id: number | string): Channel {
    const key = String(id) as keyof typeof this.aeData.ch;
    const strip = this.aeData.ch[key];
    if (strip === undefined) {
      throw new RangeError(
        `No ae_data.ch[${JSON.stringify(key)}] in this snapshot`,
      );
    }
    return strip;
  }

  private requireAuxPayload(id: number | string): AuxStripPayload {
    const key = String(id) as keyof typeof this.aeData.aux;
    const row = this.aeData.aux[key];
    if (row === undefined) {
      throw new RangeError(
        `No ae_data.aux[${JSON.stringify(key)}] in this snapshot`,
      );
    }
    return row;
  }

  private listChannelKeys(): string[] {
    return Object.keys(this.aeData.ch).sort(
      (a, b) => Number(a) - Number(b),
    );
  }
}

/** Thin wrapper around {@link IoRouting} plus channel strip access. */
export class ConsoleIo {
  constructor(
    readonly routing: IoRouting,
    private readonly engine: ConsoleEngine,
  ) {}

  /** Top-of-tree flags from `ae_data.io`. */
  get routingFlags(): Readonly<{
    alternateSourceSwitch: boolean;
    autoAlternateOverride: boolean;
  }> {
    const { altsw, autoaltovr } = this.routing;
    return {
      alternateSourceSwitch: altsw,
      autoAlternateOverride: autoaltovr,
    } as const;
  }

  /** Same as {@link ConsoleEngine#getChannels}. */
  getChannels(): ChannelStripView[] {
    return this.engine.getChannels();
  }

  getChannel(id: number | string): ChannelStripView {
    return this.engine.getChannel(id);
  }

  /** `routing.in.LCL` keyed entries (string slot numbers as in JSON). */
  localInputs(): readonly {
    readonly index: string;
    readonly cfg: DefaultInputChannel;
  }[] {
    const lcl = this.routing.in?.LCL;
    if (!lcl || typeof lcl !== "object") return [];
    const items = Object.keys(lcl).map((idx) => {
      const cfg = (lcl as Record<string, DefaultInputChannel | undefined>)[idx];
      if (cfg === undefined) return undefined;
      return { index: idx, cfg } as const;
    });
    return items.filter(Boolean) as {
      index: string;
      cfg: DefaultInputChannel;
    }[];
  }
}
