# Portfolio redesign

The current UI follows https://www.poulo.site/ with Ayush Negi’s existing portfolio information.

See [the design handoff](design/README.md) for full desktop and mobile SVGs to import into Figma, component states, tokens, previews, interaction details and validation.

The React implementation is in `frontend/`. Run `npm run dev` there to explore the working prototype.

## Portrait

Asset: `frontend/public/images/ayush-avatar-mono.png`, a transparent 1254 × 1254 PNG generated with the built-in imagegen tool. The former formal portrait was used only as an identity reference. Personal photos are excluded from the public site.

Final generation prompt:

> Use case: stylized-concept. Asset type: minimalist cartoon bust avatar on transparent background for a monochrome portfolio. Use the input portrait ONLY as identity reference for Ayush Negi: same recognizable face outline, swept-up thick quiff hair, strong eyebrows, brown eyes, subtle small moustache and faint stubble, no glasses. Draw a friendly front-facing head-and-shoulders cartoon, wide simple shoulders, wearing a plain crewneck t-shirt with a few black horizontal stripes. Visual style: extremely simple flat black and off-white 2D editorial mascot, thick smooth black outlines with an additional thin off-white exterior keyline so it remains visible on black backgrounds. White face, solid charcoal-black hair, simple dot-and-line eyes, warm small smile. Deliberately simplified cartoon, no skin color, no grey shading, no realistic facial rendering, no texture, no hatching, no gradients, no shadows. Bust from upper chest to above hair, centered in square image, face large and engaging. Transparent surrounding background. No text, no logo, no scenery, no frame. Keep resemblance through hair silhouette, jaw shape and brows. Original character drawn from the supplied photo; do not copy another person's mascot.

## Fonts

TikTok Sans is locally hosted in `frontend/public/fonts/`, with its SIL Open Font License notice included. Source: https://github.com/google/fonts/tree/main/ofl/tiktoksans.
