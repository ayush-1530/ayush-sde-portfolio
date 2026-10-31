# Ayush Negi — portfolio design handoff

Responsive UI design and working React prototype based on [poulo.site](https://www.poulo.site/), populated with Ayush’s existing portfolio information.

## Open the design in Figma

1. Install the included TikTok Sans fonts from `frontend/public/fonts/tiktok-sans-{400,500,600}.ttf` for matching text rendering.
2. Drag `desktop-design.svg` and `mobile-design.svg` into a Figma file. These are full-page designs at 1440 px and 390 px wide.
3. Import `components.svg` for the palette, typography, dock and button states. `design-tokens.json` contains the implementation values.

The exports use editable text, rectangles, paths and grouped UI elements. The original illustrated portrait and ambient particle field are embedded raster assets. Browser-only effects such as backdrop blur, live particles, perspective and hover animation are implemented in the React prototype; static SVG exports approximate those effects. These are SVG design artifacts, rather than a native `.fig` document.

## Preview

- `desktop-hero.png` and `mobile-hero.png`: opening composition.
- `desktop-light.png`: light theme.
- Other PNGs show work, overview, experiments, about, stack and contact sections.
- Run `npm run dev` from `frontend/` to explore all interactions locally.

## Reference mapping

| Reference pattern | Ayush’s version |
| --- | --- |
| Floating Home / Work / Experiments / About / Stack dock | Same five destinations, mapped to the portfolio’s section anchors |
| Book a Call | Contact me, connected to the existing contact form |
| Rotating professional headline | Software Engineer / Backend & Systems Engineer / AI & ML Enthusiast |
| Central monochrome character | Original AI-generated cartoon based on Ayush’s portrait |
| Intro accordion | Ayush’s engineering summary, backend focus and personal AI interests |
| Employer row | Zindagi Technologies, NIC and DRDO |
| Editorial statement and bento grid | Existing experience, degree, AI focus, systems work and resume |
| Filtered work chapters | Six original projects, with real GitHub links and expandable case studies |
| AI experiments | Links to Ayush’s MR Review Agent, Production RAG Chatbot and Atomic Clock projects |
| About, Journey and Stack | Existing principles, work history, education, credentials, research and complete technology list |
| Skill constellation | Interactive graph of the eight original engineering layers |
| Floating chat entry | Portfolio guide answering from the supplied content, with links to the relevant sections |
| Oversized footer wordmark | Ayush, with original social, resume and contact links |

The project mockups illustrate existing workflows. They are labelled as illustrations and do not claim to be screenshots of shipped interfaces. No reference-site biography, employers, project outcomes or links have been attributed to Ayush.

## Interaction details

- Dock: active section indicator, hover/focus tooltip and anchor navigation; retains an icon-only layout on phones.
- Social profiles: GitHub and LinkedIn buttons share the theme switch’s glass surface, border, icon color and size, with consistent 12 px spacing. They sit immediately before the theme switch. On phones, the controls occupy a second centered row below the dock, with 44 px targets.
- Theme: dark initially; light/dark switch persists locally.
- Headline: rotates every 4.2 seconds; remains static with reduced motion.
- About me: click, keyboard activation, or 650 ms hold navigates to the biography.
- Portrait: hover tilt and click greeting, disabled movement with reduced motion.
- Intro: one expanded panel at a time, with `aria-expanded`.
- Work: category filter and live result count; case studies expand separately from repository links.
- Stack: selected graph node highlights the corresponding complete skill row.
- Footer: prominent email compose button (`mailto:ayushnegiuk@gmail.com`), larger themed LinkedIn/GitHub cards, existing navigation and resume download. A mailto link uses the visitor’s configured email application or webmail handler.
- Contact: original validation, trimmed submission payload, duplicate request prevention, retry behavior, success confirmation, copy email, telephone and PDF download actions.
- Guide: suggested questions, typed questions, content-grounded answers, focus on open, Escape close and restored trigger focus.

## Validation

Production build and 16 tests pass. Browser checks cover 320, 390, 768, 1024 and 1440 px widths, dark/light themes, project filters, case studies, guide focus/Escape behavior, asset loading and internal anchors. Original project, experience, skill, principle, education and certification data was compared against the existing repository content.
