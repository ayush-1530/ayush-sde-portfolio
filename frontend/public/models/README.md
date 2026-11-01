# Original Ayush developer character

`ayush-developer.glb` is an original full-body model authored for this portfolio from
`public/images/ayush-avatar-mono.png`. No reference-site model, purchased avatar,
external character-generation service, or third-party character artwork is used.

The model keeps the swept dark hair, brows, light stubble, friendly smile, and striped
shirt. Graphite trousers and canvas sneakers complete the developer outfit. The owner
approved original full-body model creation and hero replacement for review.

Authoring source: `src/components/visual/character/createCharacter.ts`.
Regenerate with `npm run character:export` from `frontend/`.

The GLB contains actual volumetric meshes, four smoothly skinned limbs, and 37 rig
joints/pivots (12 skin joints plus articulated finger, hand, head, and body controls).
Thumbs and fingers have independent joints. Eyes, pupils, brows, and mouth
are named transform controls. The face uses a procedural node rig, not morph targets.
Poses are coordinated at runtime by `characterPose.ts` and `characterMachine.ts`;
the asset does not contain baked animation clips. There are no image textures,
external model resources, or compression decoders.

The readable procedural source is the editable master for this version, rather than
a Blender sculpt. A future artist-authored model can replace the GLB by preserving
the named controls or updating the small rig adapter in `characterPose.ts`.

Initial export: approximately 1.1 MiB, 34,250 triangles and 86 meshes/draw calls.
The model is a first original likeness interpretation for the owner's visual review;
side/rear features and body proportions are newly authored from the front portrait.
