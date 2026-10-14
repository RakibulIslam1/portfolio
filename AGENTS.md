# Project instructions for contributors and agents

Read PROJECT_MEMORY.md before making changes.

- Keep the site a single-page portfolio until the owner asks to extend it.
- Preserve the full dark/black background and 2–3 oversized red circles fading to transparency. Some should be cropped by viewport edges.
- Keep navigation fixed at the top; section links must scroll to the appropriate section with enough header offset.
- Keep all personal content in public/content.js. Do not invent the owner's biography, role, experience, metrics, projects, or contact details.
- Preserve mobile responsiveness, keyboard navigation, semantic headings, and reduced-motion support.
- On mobile, center the hero text and actions horizontally with the portrait beneath them; do not vertically center the whole hero. Preserve soft blending on every portrait edge and the RAKIB (white) / UL (red) navbar wordmark.
- The project uses Node.js and native browser modules with no external npm dependencies. Discuss material architecture changes through project notes.
- Run npm run check and npm run build after relevant edits. Verify changed server behavior with HTTP requests.
- Update PROJECT_MEMORY.md with confirmed preferences, decisions, completed work, and remaining work. Never store secrets or credentials.
- Owner requested GitHub hosting on 2026-10-15. The destination is RakibulIslam1/portfolio with GitHub Pages at https://rakibulislam1.github.io/portfolio/. Pushes to main deploy through .github/workflows/pages.yml. Keep asset paths relative to support this repository subpath. Do not deploy to other providers unless requested.
