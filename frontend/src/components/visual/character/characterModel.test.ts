import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { createCharacter } from "./createCharacter";
import { createCharacterPose } from "./characterPose";
import { CharacterMachine } from "./characterMachine";

describe("original 3D character rig", () => {
  it("has volumetric geometry, four skinned limbs, valid skin weights, and finger joints", () => {
    const model = createCharacter();
    const bounds = new THREE.Box3().setFromObject(model), size = bounds.getSize(new THREE.Vector3());
    expect(size.z).toBeGreaterThan(0.8); expect(size.y).toBeGreaterThan(3.5);
    let skins = 0;
    model.traverse(node => {
      if (!(node instanceof THREE.SkinnedMesh)) return;
      skins++;
      const weights = node.geometry.getAttribute("skinWeight");
      for (let i = 0; i < weights.count; i++) expect(weights.getX(i) + weights.getY(i) + weights.getZ(i) + weights.getW(i)).toBeCloseTo(1);
    });
    expect(skins).toBe(4);
    expect(model.getObjectByName("FingerL3Tip")).toBeInstanceOf(THREE.Bone);
    expect(model.getObjectByName("ThumbRTip")).toBeInstanceOf(THREE.Bone);
  });
  it("uses real joint rotations for pointing, relaxes fingers on a wave, and changes facial controls", () => {
    const model = createCharacter(), applyPose = createCharacterPose(model), machine = new CharacterMachine();
    machine.enter("built", 0);
    for (let i = 0; i < 90; i++) applyPose(machine.snapshot(i / 60, true, false), i / 60, 1 / 60, { x: -1, y: 0 }, false);
    expect(model.getObjectByName("FingerL0")!.rotation.x).toBeGreaterThan(1);
    expect(model.getObjectByName("FingerL3")!.rotation.x).toBeLessThan(0.1);
    machine.wave(2); machine.react(2);
    for (let i = 0; i < 90; i++) applyPose(machine.snapshot(2 + i / 60, true, false), 2 + i / 60, 1 / 60, { x: 0, y: 0 }, false);
    expect(model.getObjectByName("ArmRUpper")!.rotation.z).toBeGreaterThan(2);
    expect(model.getObjectByName("FingerR1")!.rotation.x).toBeLessThan(0.1);
    expect(model.getObjectByName("EyeL")!.scale.y).toBeGreaterThan(0);
  });
});
