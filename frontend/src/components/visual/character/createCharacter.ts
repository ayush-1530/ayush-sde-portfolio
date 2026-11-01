/** Original model source. Run `npm run character:export` after editing. No third-party character assets. */
import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

export function createCharacter() {
  const root = new THREE.Group();
  root.name = "AyushDeveloper";
  root.userData = { author: "Original portfolio character", rig: "skinned limbs + articulated fingers + facial node rig", version: 1 };
  const material = (name: string, color: string, roughness = 0.75) => new THREE.MeshStandardMaterial({ name, color, roughness });
  const skin = material("Warm porcelain", "#d8d4ce");
  const earInner = material("Ear and lip shading", "#b4aaa3");
  const ink = material("Ink", "#161619", 0.58);
  const hair = material("Swept black hair", "#17171b", 0.4);
  const hairRidge = material("Hair ridges", "#303037", 0.5);
  const white = material("Ivory cotton", "#e8e6e0");
  const stripe = material("Charcoal stripes", "#35353b");
  const trousers = material("Graphite chinos", "#303139");
  const seam = material("Seams", "#4b4b54");
  const shoe = material("Canvas sneakers", "#24252c");
  const sole = material("Rubber soles", "#cbc9c4");
  const eyeWhite = material("Eye whites", "#faf8f1", 0.4);
  const iris = material("Dark irises", "#292323", 0.32);
  const stubble = material("Light facial hair", "#66615d");
  const skeletons: { mesh: THREE.SkinnedMesh; skeleton: THREE.Skeleton }[] = [];

  const group = (name: string, parent: THREE.Object3D, position: [number, number, number] = [0, 0, 0]) => {
    const node = new THREE.Group(); node.name = name; node.position.set(...position); parent.add(node); return node;
  };
  const mesh = (name: string, geometry: THREE.BufferGeometry, mat: THREE.Material, parent: THREE.Object3D, position: [number, number, number] = [0, 0, 0]) => {
    const node = new THREE.Mesh(geometry, mat); node.name = name; node.position.set(...position); parent.add(node); return node;
  };
  const oval = (name: string, parent: THREE.Object3D, mat: THREE.Material, position: [number, number, number], scale: [number, number, number], segments = 24) => {
    const geometry = new THREE.SphereGeometry(1, segments, Math.max(10, segments / 2));
    geometry.scale(...scale);
    return mesh(name, geometry, mat, parent, position);
  };
  const curveGeometry = (points: number[][], radius: number, segments = 16) => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p as [number, number, number]))), segments, radius, 6, false);
  const line = (name: string, parent: THREE.Object3D, mat: THREE.Material, points: number[][], radius = 0.012) => mesh(name, curveGeometry(points, radius), mat, parent);
  const bone = (name: string, parent: THREE.Object3D, position: [number, number, number]) => {
    const node = new THREE.Bone(); node.name = name; node.position.set(...position); parent.add(node); return node;
  };
  const mergeParts = (name: string, parent: THREE.Object3D, mat: THREE.Material, parts: THREE.BufferGeometry[]) => {
    parts.forEach(part => part.deleteAttribute("uv")); // Solid materials; custom scalp has no UV map.
    const merged = mergeGeometries(parts); parts.forEach(p => p.dispose());
    if (merged) mesh(name, merged, mat, parent);
  };
  const lathe = (profile: number[][], depth: number) => {
    const geometry = new THREE.LatheGeometry(profile.map(p => new THREE.Vector2(p[0], p[1])), 32);
    geometry.scale(1, 1, depth); return geometry;
  };

  const hips = bone("Hips", root, [0, 1.22, 0]);
  const spine = bone("Spine", hips, [0, 0.13, 0]);
  mesh("StripedTee", lathe([[0.26, 0], [0.29, 0.02], [0.30, 0.20], [0.35, 0.54], [0.40, 0.77], [0.35, 0.87], [0.14, 1.02], [0.13, 1.01]], 0.62), white, spine);
  for (let i = 0; i < 6; i++) {
    const y = 0.09 + i * 0.125;
    const r = y < 0.2 ? 0.296 : 0.30 + (y - 0.2) * 0.17;
    mesh(`ShirtStripe${i}`, lathe([[r + 0.003, y], [r + 0.010, y + 0.045]], 0.624), stripe, spine);
  }
  const collar = mesh("Collar", new THREE.TorusGeometry(0.137, 0.025, 8, 32), stripe, spine, [0, 1.01, 0]);
  collar.rotation.x = Math.PI / 2;
  oval("Neck", spine, skin, [0, 1.075, 0], [0.125, 0.20, 0.125]);
  oval("Pelvis", hips, trousers, [0, 0, -0.005], [0.29, 0.22, 0.19]);
  line("WaistSeam", hips, seam, [[-0.25, 0.04, 0.09], [0, 0.025, 0.18], [0.25, 0.04, 0.09]], 0.009);

  /** Two-bone smooth skinning, with a blend region around each elbow/knee. */
  function limb(name: string, parent: THREE.Object3D, position: [number, number, number], length: number, radius: number, mat: THREE.Material) {
    const geometry = lathe([[0.005, 0.025], [radius * 0.75, 0], [radius, -0.08], [radius * 0.88, -length * 0.42], [radius * 0.82, -length * 0.60], [radius * 0.67, -length + 0.04], [0.006, -length]].reverse(), 0.94);
    const positions = geometry.getAttribute("position");
    const indices: number[] = [], weights: number[] = [];
    for (let i = 0; i < positions.count; i++) {
      const blend = THREE.MathUtils.smoothstep(-positions.getY(i), length * 0.36, length * 0.64);
      indices.push(0, 1, 0, 0); weights.push(1 - blend, blend, 0, 0);
    }
    geometry.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(indices, 4));
    geometry.setAttribute("skinWeight", new THREE.Float32BufferAttribute(weights, 4));
    const body = new THREE.SkinnedMesh(geometry, mat); body.name = `${name}Skin`; body.position.set(...position); parent.add(body);
    const upper = bone(`${name}Upper`, body, [0, 0, 0]);
    const lower = bone(`${name}Lower`, upper, [0, -length / 2, 0]);
    const end = bone(`${name}End`, lower, [0, -length / 2, 0]);
    skeletons.push({ mesh: body, skeleton: new THREE.Skeleton([upper, lower, end]) });
    return { upper, lower, end };
  }

  for (const side of [-1, 1]) {
    const suffix = side === -1 ? "L" : "R";
    const arm = limb(`Arm${suffix}`, spine, [side * 0.385, 0.81, 0], 0.77, 0.105, skin);
    oval(`Sleeve${suffix}`, arm.upper, white, [0, -0.105, 0], [0.14, 0.18, 0.125]);
    const cuff = mesh(`SleeveStripe${suffix}`, new THREE.CylinderGeometry(0.124, 0.12, 0.038, 20), stripe, arm.upper, [0, -0.20, 0]);
    cuff.scale.z = 0.94;
    const hand = bone(`Hand${suffix}`, arm.end, [0, -0.015, 0]);
    oval(`Palm${suffix}`, hand, skin, [0, -0.07, 0], [0.082, 0.10, 0.047], 16);
    for (let finger = 0; finger < 4; finger++) {
      const length = [0.125, 0.15, 0.137, 0.105][finger];
      const joint = bone(`Finger${suffix}${finger}`, hand, [(finger - 1.5) * 0.039, -0.13, 0]);
      oval(`Finger${suffix}${finger}A`, joint, skin, [0, -length * 0.27, 0], [0.023, length * 0.36, 0.024], 12);
      const tip = bone(`Finger${suffix}${finger}Tip`, joint, [0, -length * 0.53, 0]);
      oval(`Finger${suffix}${finger}B`, tip, skin, [0, -length * 0.20, 0], [0.021, length * 0.30, 0.022], 12);
    }
    const thumb = bone(`Thumb${suffix}`, hand, [-side * 0.068, -0.045, 0.005]);
    thumb.rotation.z = -side * 0.65;
    oval(`Thumb${suffix}A`, thumb, skin, [0, -0.035, 0.005], [0.03, 0.055, 0.029], 12);
    const thumbTip = bone(`Thumb${suffix}Tip`, thumb, [0, -0.065, 0.005]);
    oval(`Thumb${suffix}B`, thumbTip, skin, [0, -0.015, 0], [0.025, 0.035, 0.025], 12);
    arm.upper.rotation.z = side * 0.12;

    const leg = limb(`Leg${suffix}`, hips, [side * 0.15, -0.07, 0], 0.95, 0.135, trousers);
    leg.upper.rotation.z = side * 0.035;
    line(`Pocket${suffix}`, hips, seam, [[side * 0.16, 0.035, 0.15], [side * 0.21, -0.09, 0.16], [side * 0.25, -0.12, 0.12]], 0.008);
    oval(`Sole${suffix}`, leg.end, sole, [0, -0.055, 0.075], [0.145, 0.065, 0.27]);
    oval(`Sneaker${suffix}`, leg.end, shoe, [0, 0.015, 0.07], [0.135, 0.105, 0.245]);
    oval(`ToeCap${suffix}`, leg.end, sole, [0, -0.005, 0.23], [0.129, 0.068, 0.105]);
    for (let lace = 0; lace < 3; lace++) {
      const z = 0.065 + lace * 0.04;
      line(`Lace${suffix}${lace}`, leg.end, white, [[-0.07, 0.10, z], [0, 0.113, z + 0.013], [0.07, 0.10, z]], 0.009);
    }
  }

  const head = bone("Head", spine, [0, 1.61, 0]);
  const faceGeometry = new THREE.SphereGeometry(1, 40, 32);
  const vertices = faceGeometry.getAttribute("position");
  for (let i = 0; i < vertices.count; i++) {
    const y = vertices.getY(i);
    const jaw = y < -0.15 ? 1 - Math.max(0, -y - 0.15) * 0.20 : 1;
    vertices.setXYZ(i, vertices.getX(i) * 0.51 * jaw, y * 0.65, vertices.getZ(i) * 0.43 * (y < -0.4 ? 0.93 : 1));
  }
  faceGeometry.computeVertexNormals();
  mesh("SculptedFace", faceGeometry, skin, head);
  for (const side of [-1, 1]) {
    oval(`Ear${side}`, head, skin, [side * 0.49, -0.04, -0.005], [0.105, 0.17, 0.09]);
    oval(`InnerEar${side}`, head, earInner, [side * 0.53, -0.04, 0.062], [0.04, 0.095, 0.025]);
    const eye = group(side === -1 ? "EyeL" : "EyeR", head, [side * 0.205, 0.075, 0.384]);
    oval("Sclera", eye, eyeWhite, [0, 0, 0], [0.139, 0.078, 0.058]);
    const gaze = group(side === -1 ? "GazeL" : "GazeR", eye, [0, -0.002, 0.052]);
    oval("Iris", gaze, iris, [0, 0, 0], [0.052, 0.063, 0.017]);
    oval("Pupil", gaze, ink, [0, 0, 0.012], [0.031, 0.043, 0.012]);
    oval("Catchlight", gaze, eyeWhite, [-0.015, 0.023, 0.023], [0.012, 0.013, 0.006], 12);
    line("UpperLid", eye, ink, [[-0.132, 0, 0.016], [-0.07, 0.061, 0.044], [0.015, 0.073, 0.048], [0.13, 0.008, 0.016]], 0.011);
    line("LowerLid", eye, earInner, [[-0.12, -0.012, 0.014], [0, -0.072, 0.043], [0.125, -0.005, 0.02]], 0.007);
    const brow = group(side === -1 ? "BrowL" : "BrowR", head, [side * 0.21, 0.235, 0.368]);
    line("Brow", brow, hair, [[-0.145, -side * 0.008, -0.025], [-0.07, 0.027, 0.008], [0.025, 0.035, 0.014], [0.14, side * 0.005, -0.025]], 0.025);
  }
  oval("NoseBridge", head, skin, [0, -0.045, 0.421], [0.063, 0.145, 0.095]);
  oval("NoseTip", head, skin, [0, -0.13, 0.48], [0.085, 0.064, 0.095]);
  for (const side of [-1, 1]) oval(`Nostril${side}`, head, earInner, [side * 0.052, -0.16, 0.522], [0.02, 0.014, 0.012], 12);
  const mouth = group("Mouth", head, [0, -0.285, 0.387]);
  const opening = new THREE.Shape();
  opening.moveTo(-0.165, 0.018); opening.quadraticCurveTo(0, -0.015, 0.165, 0.018); opening.quadraticCurveTo(0.125, -0.093, 0, -0.095); opening.quadraticCurveTo(-0.125, -0.093, -0.165, 0.018);
  mesh("SmileOpening", new THREE.ShapeGeometry(opening, 20), ink, mouth);
  const teeth = new THREE.Shape();
  teeth.moveTo(-0.126, 0.006); teeth.quadraticCurveTo(0, -0.019, 0.126, 0.006); teeth.lineTo(0.098, -0.034); teeth.quadraticCurveTo(0, -0.049, -0.098, -0.034); teeth.closePath();
  mesh("SmileTeeth", new THREE.ShapeGeometry(teeth, 16), eyeWhite, mouth, [0, 0, 0.003]);
  line("LowerLip", head, earInner, [[-0.09, -0.398, 0.353], [0, -0.416, 0.368], [0.09, -0.398, 0.353]], 0.012);

  // Deterministic short 3D whiskers follow the actual oval surface, clear of lips/nose.
  const whiskers: THREE.BufferGeometry[] = [];
  for (let row = 0; row < 10; row++) {
    const y = -0.205 - row * 0.034;
    for (let col = 0; col < 18; col++) {
      const x = (col - 8.5) * 0.038 + (row % 2) * 0.015;
      if ((Math.abs(x) < 0.19 && y > -0.43) || (col + row) % 3 === 0) continue;
      const jaw = 1 - Math.max(0, -y / 0.65 - 0.15) * 0.2;
      const radial = 1 - (x / (0.51 * jaw)) ** 2 - (y / 0.65) ** 2;
      if (radial < 0.10) continue;
      const z = 0.43 * (y < -0.26 ? 0.93 : 1) * Math.sqrt(radial) + 0.005;
      whiskers.push(curveGeometry([[x, y, z], [x + 0.003, y - 0.014, z]], 0.0035, 2));
    }
  }
  for (let i = 0; i < 16; i++) {
    const x = (i - 7.5) * 0.018;
    whiskers.push(curveGeometry([[x, -0.211 + Math.abs(x) * 0.06, 0.416], [x + 0.004, -0.226 + Math.abs(x) * 0.06, 0.417]], 0.003, 2));
  }
  mergeParts("PortraitStubble", head, stubble, whiskers);

  // Variable hairline: high at the forehead, lower around the temples and back.
  const hairPositions: number[] = [], hairIndices: number[] = [];
  const rings = 16, sectors = 40;
  for (let ring = 0; ring <= rings; ring++) {
    for (let sector = 0; sector <= sectors; sector++) {
      const phi = sector / sectors * Math.PI * 2;
      const front = Math.max(0, Math.sin(phi));
      const theta = ring / rings * (1.95 - front * 0.73);
      hairPositions.push(0.536 * Math.sin(theta) * Math.cos(phi), 0.20 + 0.51 * Math.cos(theta), 0.448 * Math.sin(theta) * Math.sin(phi) - 0.015);
      if (ring < rings && sector < sectors) {
        const a = ring * (sectors + 1) + sector, b = a + sectors + 1;
        hairIndices.push(a, a + 1, b, b, a + 1, b + 1);
      }
    }
  }
  const cap = new THREE.BufferGeometry(); cap.setAttribute("position", new THREE.Float32BufferAttribute(hairPositions, 3)); cap.setIndex(hairIndices); cap.computeVertexNormals();
  const locks: THREE.BufferGeometry[] = [cap.toNonIndexed()]; cap.dispose();
  const ridges: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 7; i++) {
    const points = [[0.43 - i * 0.105, 0.39, 0.28 + i * 0.013], [0.45 - i * 0.10, 0.62 + i * 0.018, 0.37], [0.12 - i * 0.095, 0.81 - i * 0.012, 0.29], [-0.40 - i * 0.018, 0.59 - i * 0.018, 0.10]];
    const lock = curveGeometry(points, 0.096 - i * 0.003, 24);
    locks.push(lock.toNonIndexed()); lock.dispose();
    ridges.push(curveGeometry(points.map(p => [p[0], p[1] + 0.045, p[2] + 0.070]), 0.004, 22));
  }
  mergeParts("SweptQuiff", head, hair, locks);
  mergeParts("HairDetail", head, hairRidge, ridges);
  // Sideburns retain the illustrated silhouette without adding a heavy beard.
  for (const side of [-1, 1]) oval(`Sideburn${side}`, head, hair, [side * 0.465, 0.10, 0.025], [0.045, 0.145, 0.10]);

  root.updateMatrixWorld(true);
  skeletons.forEach(({ mesh: body, skeleton }) => body.bind(skeleton));
  return root;
}
