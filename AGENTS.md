# Project instructions for contributors and agents

Read PROJECT_MEMORY.md before making changes.

- Owner extended the portfolio on 2026-10-15: keep the homepage sections, a /projects/ collection, and dedicated /projects/<slug>/ pages. Homepage selections use alternating capsule rows with circular images. Do not extend beyond these pages unless requested.
- Preserve the full dark/black background and 2–3 oversized red circles fading to transparency. Some should be cropped by viewport edges.
- Keep navigation fixed at the top; section links must scroll to the appropriate section with enough header offset.
- Keep all personal content in public/content.js. Do not invent the owner's biography, role, experience, metrics, projects, or contact details.
- Project entries need unique lowercase hyphenated slugs; featured controls homepage selection. Clearly marked placeholder entries are layout previews and must not count as real projects. The first real entry hides previews automatically. Keep local and generated static project routes consistent.
- Homepage section labels are unnumbered. Project capsules use a fully rounded white/silver outline with no gradient fill, black circular image backgrounds, and extra leading space for copy in image-right rows. Mongla AUV is the first real project; keep its description at vehicle/system level. The control board will be a separate project. Dedicated project pages use plain black, thin borders and no decorative glows/shadows.
- Project comments are public GitHub issue conversations scoped by [project-slug] in the title, with posting/replies on GitHub. Watch opens the project's repository for GitHub's native Watch control. Shared view badges use Hits and stable canonical project URLs; local previews must not increase them. Preserve honest unavailable states; never replace shared totals with made-up or browser-only counts. Keep credentials out of browser code.
- Preserve mobile responsiveness, keyboard navigation, semantic headings, and reduced-motion support.
- Homepage Achievements shows all CV results in three tiers: two compact main standings, the six remaining WRO results in a quieter second row, and all other competition results in a normal list. Preserve compact styling, CV-backed placements/categories, and team credits. Do not restore large feature cards or year accordions. All data stays in public/content.js; undated entries must not gain invented years. The current downloadable CV is public/files/CV draft-1.pdf.
- On mobile, center the hero text and actions horizontally with the portrait beneath them; do not vertically center the whole hero. Preserve soft blending on every portrait edge and the RAKIB (white) / UL (red) navbar wordmark.
- The project uses Node.js and native browser modules with no external npm dependencies. Discuss material architecture changes through project notes.
- Run npm run check and npm run build after relevant edits. Verify changed server behavior with HTTP requests.
- Update PROJECT_MEMORY.md with confirmed preferences, decisions, completed work, and remaining work. Never store secrets or credentials.
- Owner requested GitHub hosting on 2026-10-15. The destination is RakibulIslam1/portfolio with GitHub Pages at https://rakibulislam1.github.io/portfolio/. Pushes to main deploy through .github/workflows/pages.yml. Keep asset paths relative to support this repository subpath. Do not deploy to other providers unless requested.
- The bare account address https://rakibulislam1.github.io/ also opens the portfolio via a small redirect in RakibulIslam1/RakibulIslam1.github.io. Its source is hosting/github-root/index.html; use scripts/publish-root-redirect.mjs for manual synchronization. Keep the portfolio itself at its established /portfolio/ destination.
