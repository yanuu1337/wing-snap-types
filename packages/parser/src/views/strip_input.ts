import type { InputBlock, InputPatch, InputSection } from "wing-snap-types";

/** Read-friendly view of `strip.in`: trim block + patch cable. */

export class StripInput {
  constructor(private readonly section: InputSection) {}

  get settings(): InputBlock {
    return this.section.set;
  }

  get source(): InputPatch {
    return this.section.conn;
  }
}
