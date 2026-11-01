import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

// Compile only the original model source. Generated JS is temporary, alongside this
// script so Node resolves the project's installed Three.js without another toolchain.
const directory = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(directory, '../src/components/visual/character/createCharacter.ts');
const temporary = path.join(directory, '.character-source.mjs');
class BlobReader {
  readAsArrayBuffer(blob) { blob.arrayBuffer().then(result => { this.result = result; this.onloadend?.(); }); }
  readAsDataURL(blob) { blob.arrayBuffer().then(result => { this.result = `data:${blob.type};base64,${Buffer.from(result).toString('base64')}`; this.onloadend?.(); }); }
}
globalThis.FileReader = BlobReader;
try {
  const { outputText } = ts.transpileModule(await fs.readFile(source, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } });
  await fs.writeFile(temporary, outputText);
  const { createCharacter } = await import(temporary);
  const character = createCharacter();
  const buffer = await new GLTFExporter().parseAsync(character, { binary: true, onlyVisible: false });
  const destination = path.join(directory, '../public/models/ayush-developer.glb');
  await fs.writeFile(destination, Buffer.from(buffer));
  let meshes = 0, triangles = 0, joints = 0;
  character.traverse(node => {
    if (node.isBone) joints++;
    if (node.isMesh) { meshes++; triangles += (node.geometry.index?.count ?? node.geometry.attributes.position.count) / 3; }
  });
  console.log(`Exported ${path.basename(destination)}: ${Math.round(buffer.byteLength / 1024)} KiB, ${meshes} meshes, ${triangles} triangles, ${joints} rig joints.`);
} finally { await fs.rm(temporary, { force: true }); }
