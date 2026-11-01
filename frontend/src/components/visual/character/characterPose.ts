import * as THREE from "three";
import type { AnimationSnapshot } from "./characterMachine";

export function createCharacterPose(model: THREE.Object3D) {
  const node = (name: string) => {
    const found = model.getObjectByName(name);
    if (!found) throw new Error(`Character rig is missing ${name}`);
    return found;
  };
  const head = node("Head"), spine = node("Spine"), hips = node("Hips");
  const eyes = [node("EyeL"), node("EyeR")], gazes = [node("GazeL"), node("GazeR")];
  const brows = [node("BrowL"), node("BrowR")], mouth = node("Mouth");
  const arms = ["L", "R"].map(suffix => ({ upper: node(`Arm${suffix}Upper`), lower: node(`Arm${suffix}Lower`), hand: node(`Hand${suffix}`), fingers: Array.from({ length: 4 }, (_, i) => [node(`Finger${suffix}${i}`), node(`Finger${suffix}${i}Tip`)]), thumb: node(`Thumb${suffix}`) }));
  const legs = ["L", "R"].map(suffix => ({ upper: node(`Leg${suffix}Upper`), lower: node(`Leg${suffix}Lower`) }));
  let yaw = 0, pitch = 0;
  const damp = THREE.MathUtils.damp;
  let nextBlink = 2.5, blinkStart = -10;
  let lookX = 0, lookY = 0;

  return (snapshot: AnimationSnapshot, time: number, delta: number, gaze: { x: number; y: number }, reduced: boolean) => {
    const smoothing = reduced ? 1000 : 10;
    const moving = !reduced;
    lookX = damp(lookX, gaze.x, 5, delta); lookY = damp(lookY, gaze.y, 5, delta);
    const wave = snapshot.gesture === "wave";
    const thoughtful = snapshot.gesture === "think";
    const point = snapshot.gesture === "point";
    const sideToUse = lookX < 0 ? 0 : 1;
    const breath = moving ? Math.sin(time * 1.65) : 0;
    spine.scale.y = 1 + breath * 0.008;
    spine.rotation.z = damp(spine.rotation.z, moving ? Math.sin(time * 0.85) * 0.014 : 0, smoothing, delta);
    hips.rotation.y = damp(hips.rotation.y, lookX * 0.13 + (snapshot.section === "intro" ? -0.12 : 0), smoothing, delta);
    yaw = damp(yaw, lookX * 0.28, smoothing, delta);
    pitch = damp(pitch, -lookY * 0.12 + (snapshot.gesture === "nod" && moving ? Math.sin(Math.min(snapshot.age, 2.5) * 4.4) * 0.055 * Math.max(0, 1 - snapshot.age / 3) : 0), smoothing, delta);
    head.rotation.set(pitch + (moving ? Math.sin(time * 0.93) * 0.012 : 0), yaw, snapshot.expression === "curious" ? 0.065 : thoughtful ? -0.045 : 0);

    if (moving && time > nextBlink) { blinkStart = time; nextBlink = time + 3.1 + (Math.sin(time * 7.7) + 1) * 1.6; }
    const blinkAge = time - blinkStart;
    const blink = moving && blinkAge < 0.18 ? Math.sin(blinkAge / 0.18 * Math.PI) : 0;
    const excitement = snapshot.expression === "excited" || snapshot.expression === "surprised";
    eyes.forEach((eye, i) => {
      eye.scale.y = Math.max(0.07, (excitement ? 1.1 : thoughtful ? 0.82 : 1) * (1 - blink * 0.96));
      gazes[i].position.x = lookX * 0.028; gazes[i].position.y = -0.002 + lookY * 0.018;
      const eyebrowRaise = excitement ? 0.055 : thoughtful ? -0.01 : 0;
      brows[i].position.y = damp(brows[i].position.y, 0.235 + eyebrowRaise + (snapshot.expression === "curious" && i === 1 ? 0.045 : 0), smoothing, delta);
      brows[i].rotation.z = damp(brows[i].rotation.z, thoughtful ? (i === 0 ? -0.10 : 0.10) : 0, smoothing, delta);
    });
    mouth.scale.x = damp(mouth.scale.x, snapshot.expression === "surprised" ? 0.57 : thoughtful ? 0.84 : 1, smoothing, delta);
    mouth.scale.y = damp(mouth.scale.y, snapshot.expression === "surprised" ? 1.7 : excitement ? 1.22 : thoughtful ? 0.42 : 0.82, smoothing, delta);

    arms.forEach((arm, i) => {
      const side = i === 0 ? -1 : 1;
      const waving = wave && i === 1;
      const pointing = point && i === sideToUse;
      const thinking = thoughtful && i === 0;
      const upper = waving ? side * 2.25 : pointing ? side * 1.24 : thinking ? 0.35 : side * 0.12;
      const lower = waving ? side * 0.55 : pointing ? side * 0.17 : thinking ? 2.6 : side * 0.05;
      arm.upper.rotation.z = damp(arm.upper.rotation.z, upper, smoothing, delta);
      arm.upper.rotation.x = damp(arm.upper.rotation.x, thinking ? -0.45 : pointing ? -0.15 : 0, smoothing, delta);
      arm.lower.rotation.z = damp(arm.lower.rotation.z, lower, smoothing, delta);
      arm.lower.rotation.x = damp(arm.lower.rotation.x, thinking ? -0.55 : -0.08, smoothing, delta);
      arm.hand.rotation.z = damp(arm.hand.rotation.z, waving ? Math.sin(time * 10) * 0.28 : pointing ? -side * 0.18 : 0, smoothing, delta);
      arm.hand.rotation.y = damp(arm.hand.rotation.y, waving ? -0.15 : 0, smoothing, delta);
      arm.fingers.forEach(([first, tip], finger) => {
        // Index (the inner finger) stays straight for a genuine pointing gesture.
        const index = i === 0 ? 3 : 0;
        const curl = waving ? 0.04 : pointing ? finger === index ? 0.02 : 1.28 : thinking ? 0.75 : 0.22;
        first.rotation.x = damp(first.rotation.x, curl, smoothing, delta);
        tip.rotation.x = damp(tip.rotation.x, curl * 0.8, smoothing, delta);
        first.rotation.z = damp(first.rotation.z, waving ? (finger - 1.5) * 0.105 : 0, smoothing, delta);
      });
      arm.thumb.rotation.x = damp(arm.thumb.rotation.x, waving || pointing ? 0 : 0.24, smoothing, delta);
    });
    legs.forEach((leg, i) => {
      leg.upper.rotation.x = damp(leg.upper.rotation.x, i === 0 ? 0.035 : -0.035, smoothing, delta);
      leg.lower.rotation.x = damp(leg.lower.rotation.x, i === 0 ? 0.075 : 0, smoothing, delta);
    });
  };
}
