import { readFile } from "node:fs/promises";
import type { SnapshotFile } from "wing-snap-types";

const REQUIRED_ROOT_KEYS = [
  "type",
  "creator_fw",
  "creator_sn",
  "creator_model",
  "creator_version",
  "creator_name",
  "created",
  "active_show",
  "active_scene",
  "ae_data",
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new TypeError(message);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function expectString(
  obj: Record<string, unknown>,
  key: string,
  rootPath: string,
): string {
  const v = obj[key];
  assert(typeof v === "string", `${rootPath}.${key} must be a string`);
  return v;
}

function coerceCreated(value: unknown, rootPath: string): Date {
  if (value instanceof Date) {
    assert(
      !Number.isNaN(value.getTime()),
      `${rootPath}.created must be a valid Date`,
    );
    return value;
  }
  assert(
    typeof value === "string",
    `${rootPath}.created must be an ISO/date string or a Date`,
  );
  const parsed = new Date(value);
  assert(
    !Number.isNaN(parsed.getTime()),
    `${rootPath}.created must be parsable by Date`,
  );
  return parsed;
}

export type ParseSnapshotFileOptions = {
  requireSnapExtension?: boolean;
  maxBytes?: number;
};

/** Parse and validate the top-level snapshot envelope as {@link SnapshotFile}. */
export function parseEnvelopeSnapshotData(raw: unknown): SnapshotFile {
  const rootPath = "snapshot";
  assert(isPlainObject(raw), `${rootPath} must be a plain object`);

  for (const k of REQUIRED_ROOT_KEYS) {
    assert(
      Object.prototype.hasOwnProperty.call(raw, k),
      `${rootPath} missing required key "${k}"`,
    );
  }

  expectString(raw, "type", rootPath);
  expectString(raw, "creator_fw", rootPath);
  expectString(raw, "creator_sn", rootPath);
  expectString(raw, "creator_model", rootPath);
  expectString(raw, "creator_version", rootPath);
  expectString(raw, "creator_name", rootPath);
  expectString(raw, "active_show", rootPath);

  const activeScene = expectString(raw, "active_scene", rootPath);
  assert(
    activeScene.startsWith("I:/") && activeScene.endsWith(".snap"),
    `${rootPath}.active_scene must look like an I:/…snap path`,
  );

  assert(isPlainObject(raw.ae_data), `${rootPath}.ae_data must be an object`);

  Reflect.set(raw, "created", coerceCreated(raw.created, rootPath));

  return raw as SnapshotFile;
}

export function parseEnvelopeSnapshotJson(json: string): SnapshotFile {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new SyntaxError(`Invalid .snap JSON: ${error.message}`);
    }
    throw error;
  }
  return parseEnvelopeSnapshotData(parsed);
}

export async function readEnvelopeSnapshotFile(
  filePath: string,
  options: ParseSnapshotFileOptions = {},
): Promise<SnapshotFile> {
  const { requireSnapExtension = true, maxBytes = 25 * 1024 * 1024 } = options;

  if (requireSnapExtension) {
    assert(
      filePath.toLowerCase().endsWith(".snap"),
      `Expected a .snap file path, got: ${filePath}`,
    );
  }

  const content = await readFile(filePath, "utf8");
  const estimatedBytes = Buffer.byteLength(content, "utf8");
  assert(
    estimatedBytes <= maxBytes,
    `Snapshot file is too large (${estimatedBytes} bytes > ${maxBytes} bytes)`,
  );

  const sanitized =
    content.charCodeAt(0) === 0xfeff ? content.slice(1) : content;
  return parseEnvelopeSnapshotJson(sanitized);
}

export function looksLikeSnapshotEnvelope(value: unknown): value is SnapshotFile {
  try {
    parseEnvelopeSnapshotData(value);
    return true;
  } catch {
    return false;
  }
}
