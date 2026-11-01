export const CHARACTER_WAVE = "ayush:character-wave";
export const sections = ["intro", "overview", "built", "experiments", "thinking", "journey", "foundation", "research", "systems", "connect", "footer"] as const;
export type CharacterSection = typeof sections[number];
export type CharacterState = "INTRO" | "IDLE" | "GUIDING" | "POINTING" | "REACTING" | "TRANSITIONING" | "EXITING" | "FINALE";
export type Expression = "smile" | "curious" | "excited" | "thoughtful" | "surprised";
export type Gesture = "idle" | "wave" | "point" | "think" | "nod";
export type Chapter = { state: CharacterState; expression: Expression; gesture: Gesture; side: "left" | "right"; target: string };

export const chapters: Record<CharacterSection, Chapter> = {
  intro: { state: "INTRO", expression: "smile", gesture: "wave", side: "right", target: ".hero-introductions" },
  overview: { state: "GUIDING", expression: "smile", gesture: "point", side: "right", target: ".statement, .bento-tile" },
  built: { state: "POINTING", expression: "curious", gesture: "point", side: "right", target: ".work-project-heading" },
  experiments: { state: "REACTING", expression: "excited", gesture: "think", side: "left", target: ".experiment-card h3" },
  thinking: { state: "GUIDING", expression: "smile", gesture: "wave", side: "right", target: ".about-intro h3" },
  journey: { state: "POINTING", expression: "smile", gesture: "point", side: "left", target: ".journey-entry h3" },
  foundation: { state: "IDLE", expression: "thoughtful", gesture: "nod", side: "right", target: "h3" },
  research: { state: "IDLE", expression: "thoughtful", gesture: "think", side: "left", target: "h3" },
  systems: { state: "POINTING", expression: "curious", gesture: "point", side: "right", target: ".stack-node.is-active, .skill-row.is-active" },
  connect: { state: "GUIDING", expression: "smile", gesture: "wave", side: "left", target: ".contact-info h3" },
  footer: { state: "FINALE", expression: "excited", gesture: "wave", side: "left", target: ".footer-identity" },
};

export type AnimationSnapshot = { section: CharacterSection; state: CharacterState; expression: Expression; gesture: Gesture; age: number; wave: number; reaction: number };

/** One animation owner. Navigation interrupts gestures instead of appending timers. */
export class CharacterMachine {
  private section: CharacterSection = "intro";
  private entered = 0;
  private wavingUntil = 0;
  private reactingUntil = 0;
  private initialized = false;

  enter(section: CharacterSection, now: number) {
    if (this.initialized && section === this.section) return;
    this.initialized = true;
    this.section = section; this.entered = now;
    this.wavingUntil = 0; this.reactingUntil = 0;
  }
  wave(now: number) { this.wavingUntil = now + 2.6; }
  react(now: number) { this.reactingUntil = now + 1.3; }
  snapshot(now: number, visible: boolean, reduced: boolean): AnimationSnapshot {
    const chapter = chapters[this.section];
    const age = Math.max(0, now - this.entered);
    const greeting = chapter.gesture === "wave" && age < 3.1;
    const waving = !reduced && (this.wavingUntil > now || greeting);
    const reacting = !reduced && this.reactingUntil > now;
    return {
      section: this.section,
      state: !visible ? "EXITING" : age < 0.4 && this.section !== "intro" ? "TRANSITIONING" : reacting ? "REACTING" : chapter.state,
      expression: reacting ? "surprised" : chapter.expression,
      gesture: reduced ? "idle" : waving ? "wave" : chapter.gesture === "wave" ? "idle" : chapter.gesture,
      age, wave: waving ? 1 : 0, reaction: reacting ? 1 : 0,
    };
  }
}
