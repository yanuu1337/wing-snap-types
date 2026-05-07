# @wing-snap-types/parser

Lightweight **`.snap` loader** plus wrappers that remap raw JSON shapes into clearer property groups (`ConsoleEngine`, `ConsoleIo`, **`ChannelStripView`**, **`StripInput`**).

Channels:

- Prefer **`snap.getChannel(n).input.settings`** / **`.input.source`** instead of `.in.set` / `.in.conn`.
- **`surface`** (name, faders, mute, pan, …), **`processing`** (EQ, dynamics, gate, …), **`routing`** (inserts, mains, sends).

```ts
import { WingSnapshot } from "@wing-snap-types/parser";

const snap = await WingSnapshot.open("./Scene.snap");

const ch1 = snap.getChannel(1);
const patchIn = ch1.input.source.in; // was ch1.raw.in.conn.in

const strips = snap.ae.io.getChannels();
snap.ae.io.routingFlags; // alternateSourceSwitch, autoAlternateOverride
```

AUX strips: **`snap.ae.getAuxStrip(1)`** with **`input`** and **`surface`**.

Low-level payloads still available as **`*.raw`** on each strip view.

## Build

`tsc` emits `dist/` as ESM (`pnpm run build`). Depends on **`wing-snap-types`** at runtime (**peerDependency**).

## License

MIT (see repo root).
