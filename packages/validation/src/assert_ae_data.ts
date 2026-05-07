import type { SnapshotFile } from "wing-snap-types";

function plainObject(
  name: string,
  value: unknown,
): asserts value is Record<string, unknown> {
  const ok =
    typeof value === "object" && value !== null && !Array.isArray(value);
  if (!ok) {
    throw new TypeError(`${name} must be a plain object`);
  }
}

const REQUIRED_BLOCKS = ["cfg", "io", "ch"] as const;

const OPTIONAL_BLOCKS = [
  "aux",
  "bus",
  "main",
  "mtx",
  "dca",
  "mgrp",
  "fx",
  "cards",
  "play",
  "rec",
] as const;

/**
 * Throws if `ae_data` is missing expected sub-objects (`cfg`, `io`, `ch`, …),
 * or if any present subsection is not a plain object.
 */
export function assertAeDataSections(ae: unknown): void {
  plainObject("ae_data", ae);
  const obj = ae;
  for (const key of REQUIRED_BLOCKS) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      throw new TypeError(`ae_data missing required subsection "${key}"`);
    }
    plainObject(`ae_data.${key}`, obj[key]);
  }

  if (!Object.keys(obj).length) return;
  for (const key of OPTIONAL_BLOCKS) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const sub = obj[key];
    plainObject(`ae_data.${key}`, sub);
  }
}

/** Runs {@link assertAeDataSections} on `snapshot.ae_data`. */
export function assertSnapshotAeData(snapshot: SnapshotFile): void {
  assertAeDataSections(snapshot.ae_data);
}
