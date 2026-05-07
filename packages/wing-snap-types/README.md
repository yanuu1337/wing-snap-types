# wing-snap-types

Type declarations for Behringer WING `.snap` snapshot JSON (`SnapshotFile`, `AudioEngineData`, strips, FX, IO, …).

Parsing and snapshot wrapper APIs live in **`@wing-snap-types/parser`**. Optional **`ae_data`** structural checks live in **`@wing-snap-types/validation`**.

```ts
import type { SnapshotFile, Channel } from "wing-snap-types";
```

## Build

Emitted to `dist/` as `.d.ts` only (`pnpm run build` from this package or the repo root).

## License

MIT (see repo root).
