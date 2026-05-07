import type { AudioEngineData, SnapshotFile } from "wing-snap-types";
import {
  readEnvelopeSnapshotFile,
  parseEnvelopeSnapshotData,
  parseEnvelopeSnapshotJson,
  type ParseSnapshotFileOptions,
} from "./envelope.js";
import { ConsoleEngine } from "./engine.js";
import type { ChannelStripView } from "./views/channel_strip.js";

/**
 * Snapshot handle: **`snap.ae`** is the {@link ConsoleEngine}; **`snap.getChannel`**
 * returns a grouped {@link ChannelStripView}.
 */
export class WingSnapshot {
  private _audioEngine?: ConsoleEngine;

  private constructor(readonly file: SnapshotFile) {}

  static fromTrusted(file: SnapshotFile): WingSnapshot {
    return new WingSnapshot(file);
  }

  static parseEnvelope(raw: unknown): WingSnapshot {
    const f = parseEnvelopeSnapshotData(raw);
    return new WingSnapshot(f);
  }

  static parseEnvelopeJson(json: string): WingSnapshot {
    const f = parseEnvelopeSnapshotJson(json);
    return new WingSnapshot(f);
  }

  static async open(
    path: string,
    options: ParseSnapshotFileOptions = {},
  ): Promise<WingSnapshot> {
    const file = await readEnvelopeSnapshotFile(path, options);
    return new WingSnapshot(file);
  }

  get snapshot(): SnapshotFile {
    return this.file;
  }

  get ae(): ConsoleEngine {
    this._audioEngine ??= new ConsoleEngine(this.file.ae_data as AudioEngineData);
    return this._audioEngine;
  }

  getChannel(id: number | string): ChannelStripView {
    return this.ae.getChannel(id);
  }
}

/** @alias {@link WingSnapshot.parseEnvelopeJson} */
export function parseSnapshotJson(json: string): WingSnapshot {
  return WingSnapshot.parseEnvelopeJson(json);
}

/** @alias {@link WingSnapshot.open} */
export function parseSnapshotFile(
  path: string,
  options?: ParseSnapshotFileOptions,
): Promise<WingSnapshot> {
  return WingSnapshot.open(path, options);
}

/** @alias {@link WingSnapshot.parseEnvelope} */
export function parseSnapshotData(raw: unknown): WingSnapshot {
  return WingSnapshot.parseEnvelope(raw);
}

export {
  parseEnvelopeSnapshotData as snapshotFileEnvelopeFromUnknown,
  parseEnvelopeSnapshotJson as snapshotFileEnvelopeFromJsonString,
  readEnvelopeSnapshotFile as readSnapshotEnvelopeFile,
  looksLikeSnapshotEnvelope,
  type ParseSnapshotFileOptions,
} from "./envelope.js";
