import { describe, expect, it } from "vitest";
import { CharacterMachine } from "./characterMachine";

describe("character animation ownership", () => {
  it("interrupts a click wave on a navigation jump instead of queuing stale gestures", () => {
    const machine = new CharacterMachine();
    machine.enter("intro", 0); machine.wave(5);
    expect(machine.snapshot(5.1, true, false).gesture).toBe("wave");
    machine.enter("built", 5.2);
    expect(machine.snapshot(5.3, true, false).state).toBe("TRANSITIONING");
    expect(machine.snapshot(6, true, false).gesture).toBe("point");
    machine.enter("foundation", 6);
    expect(machine.snapshot(7, true, false).gesture).toBe("nod");
  });
  it("replays the farewell when the visitor returns after scrolling upward", () => {
    const machine = new CharacterMachine();
    machine.enter("footer", 10);
    expect(machine.snapshot(11, true, false).gesture).toBe("wave");
    expect(machine.snapshot(16, true, false).gesture).toBe("idle");
    machine.enter("connect", 17); machine.enter("footer", 18);
    expect(machine.snapshot(19, true, false)).toMatchObject({ state: "FINALE", gesture: "wave" });
  });
  it("stops autonomous movement with reduced motion and marks hidden states as exiting", () => {
    const machine = new CharacterMachine(); machine.enter("experiments", 0); machine.react(1); machine.wave(1);
    expect(machine.snapshot(1.1, true, false).expression).toBe("surprised");
    expect(machine.snapshot(1.1, true, true)).toMatchObject({ gesture: "idle", wave: 0, reaction: 0 });
    expect(machine.snapshot(2, false, false).state).toBe("EXITING");
  });
});
