# wing-snap-types (monorepo)

| Package | Contents |
| --- | --- |
| [`wing-snap-types`](https://www.npmjs.com/package/wing-snap-types) | Type declarations for `.snap` JSON (`SnapshotFile`, `AudioEngineData`, strips, FX, …). Types only. |
| [`@wing-snap-types/parser`](https://www.npmjs.com/package/@wing-snap-types/parser) | Envelope parsing + [`WingSnapshot`](packages/parser/src/wing_snapshot.ts), [`ConsoleEngine`](packages/parser/src/engine.ts), [`ConsoleIo`](packages/parser/src/engine.ts). |
| [`@wing-snap-types/validation`](https://www.npmjs.com/package/@wing-snap-types/validation) | Optional **`ae_data`** section checks (`cfg` / `io` / `ch` … must be plain objects). |

Typical scripting flow:

```ts
import { WingSnapshot } from "@wing-snap-types/parser";
import { assertSnapshotAeData } from "@wing-snap-types/validation";

const snap = await WingSnapshot.open("./Scene.snap");
assertSnapshotAeData(snap.snapshot);

const ch = snap.getChannel(1);
console.log(ch.input.source, ch.input.settings, ch.surface.name);
const flags = snap.ae.io.routingFlags;
const strips = snap.ae.io.getChannels();
```

## Repo layout

```txt
packages/
  wing-snap-types/    # emitted .d.ts only
  parser/             # @wing-snap-types/parser → ESM .js runtime
  validation/          # @wing-snap-types/validation
```

## Development

```bash
pnpm install
pnpm run build      
pnpm run typecheck
```

Requires [pnpm](https://pnpm.io) 9+.

## License

MIT — see [LICENSE](./LICENSE).
