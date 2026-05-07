# @wing-snap-types/validation

Runtime checks that expected **`ae_data`** sub-objects exist and are plain objects (`cfg`, `io`, `ch`, plus any optional blocks present in the snapshot). Does not inspect channel routing fields.

Combine with **`@wing-snap-types/parser`**:

```ts
import { WingSnapshot } from "@wing-snap-types/parser";
import { assertSnapshotAeData } from "@wing-snap-types/validation";

const snap = WingSnapshot.parseEnvelopeJson(jsonText);
assertSnapshotAeData(snap.snapshot);
```

## Peer dependency

`wing-snap-types` (types only).

## License

MIT (see repo root).
