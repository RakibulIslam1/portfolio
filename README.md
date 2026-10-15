# Personal portfolio

A Node.js portfolio with a black background, three oversized red radial gradients, a fixed navigation bar, and smooth scrolling between homepage sections. The Projects collection and individual project pages extend the homepage.

## Run

Requires Node.js 22 or later. There are no npm dependencies to install.

```powershell
npm run dev
```

Open http://localhost:3000. The server binds to localhost. Use `npm start` without server watching. Override the port with `$env:PORT = 3001` in PowerShell.

## Customize

Edit `public/content.js` for your name, two-color brand text, achievement counters, skill keywords, CV path, biography, projects, competition results, render images, and email. A valid email activates the contact link. Edit `public/styles.css` for the core design, `public/projects.css` for project layouts, `public/achievements.css` for achievements, and `public/index.html` for homepage sections.

The About biography and education come from the owner's supplied CV. Mongla AUV is the first supplied project; further projects, email, and social profile URLs await the owner's input. Achievement counters use confirmed values; the project total now follows real listed projects.

## Verify and build

- `npm run check`: JavaScript syntax checks.
- `npm run build`: regenerate `dist/` from the public site and generate dedicated project pages for static hosting. The build refuses a linked output directory and removes stale generated pages.

Google Fonts improve the typography when internet access is available; local fonts provide a fallback. The website needs no backend service or API key. The Node server serves local development; GitHub Pages serves the built static files.

## GitHub hosting

Repository: https://github.com/RakibulIslam1/portfolio

Live website: https://rakibulislam1.github.io/portfolio/

Account-root entry: https://rakibulislam1.github.io/ forwards to the portfolio, preserving a section hash and query string. Its minimal source is tracked at hosting/github-root/index.html and published separately in RakibulIslam1/RakibulIslam1.github.io (Pages from main, /). To update that redirect after editing its source, run node scripts/publish-root-redirect.mjs with the owner's GitHub CLI authentication. Normal portfolio changes still deploy only from this repository's main workflow. No portfolio content is duplicated in the redirect repository.

Push commits to `main` to publish updates. `.github/workflows/pages.yml` checks JavaScript, builds `dist/` using Node.js 24, and deploys it through GitHub Pages. Repository Settings → Pages uses GitHub Actions. `dist/` stays ignored; the workflow creates the deployment artifact. All local asset and CV paths are relative, so the site works under `/portfolio/` and at the local server root. Store replacement CVs in `public/files/` and update `cv.url` and `cv.filename` in `public/content.js`. The current document is `./files/CV draft-1.pdf`; spaces are encoded automatically by the browser.

## Handoff

Read `AGENTS.md` and `PROJECT_MEMORY.md` before editing. Update project memory when requirements or significant decisions change. The owner authorized GitHub repository creation and GitHub Pages publication on 2026-10-15.

Hero portrait: images/S.png is the supplied original; public/images/S.png is the served copy. Blending is controlled by .hero-portrait and .hero-art in public/styles.css.

Responsive layout: desktop and tablets use two normal-flow hero columns; phones up to 760px place centered copy above the portrait. Navigation switches to two rows up to 540px. Heading sizes, gutters, project columns, and footer wrapping adapt independently. Portrait masks soften every edge and corner while retaining the supplied image.

The fixed navbar uses a compact 64px desktop height (90px with two mobile rows) and separate, wider side padding. Hero image size also responds to screen height. The A little further arrow links to About below the portrait.

The hero counters show the owner's supplied 20+ projects, 25+ national wins, 7 WRO prizes, and 8th place worldwide at RoboSub. The project counter uses 20+ while only placeholder projects exist; once real entries are added, it shows their count. Remove `placeholder: true` (or set it to false) when replacing a placeholder with a real project. Dedicated URLs are generated automatically from slugs.

## Adding projects

The homepage shows one compact capsule per selected project, centered within a 1120px maximum width, with circular images alternating left/right on desktop and above centered copy on phones. Capsules use a fully rounded silver/white outline and transparent fill; circles have plain black backgrounds. Image-right rows have extra leading padding before the copy. Desktop circles scale from 128–176px; phone circles use 128px (112px on narrow phones). Homepage section labels are unnumbered. See all projects opens `/projects/`, a block grid of every listed project. Clicking a capsule or collection card opens `/projects/<slug>/`. Every detail page has a Back to all projects button and links to homepage sections. Dedicated pages use black surfaces, thin borders and a large vehicle render without decorative gradients or shadows.

All project content belongs in the `projects` array in `public/content.js`. Mongla AUV is the first real entry at `/projects/mongla-auv/`. Its seven-thruster/six-DOF/custom-mixer configuration comes from the owner; the brief ROS 2, Raspberry Pi 5/Hailo-8 and MAVLink overview is backed by the linked mongla_ws codebase. Its documented bench/simulation status is preserved without claiming underwater validation. The control board remains reserved for a separate project. Three old preview entries remain in the configuration but are automatically excluded from the homepage, collection and generated routes while real projects exist. The hero project counter shows the real entry count.

Use this structure for an owner-supplied project, replacing the example strings and image path before publishing:

```js
{
  slug: 'your-project-slug', // Unique lowercase letters/numbers/hyphens; keep stable for links.
  title: 'Your project title',
  category: '',
  summary: '',             // Short description on the homepage, collection, and detail hero.
  image: { src: './images/your-project.png', alt: '' },
  featured: true,          // false lists it only in the full collection.
  placeholder: false,
  description: '',         // Longer Overview write-up; newlines are preserved.
  facts: [],               // { label: '', value: '' } — add only supplied facts.
  specifications: [],      // { heading: '', facts: [{ label: '', value: '' }] }
  specificationsNote: '',  // State what measurements represent, when relevant.
  model: null,             // Optional local CAD viewer; see the Mongla entry.
  sections: [],            // { heading: '', paragraphs: [''], flow: [{ label: '', detail: '' }], image: { src: '', alt: '', caption: '' } }
  gallery: [],             // { src: './images/photo.png', alt: '', caption: '' }
  links: [],               // { label: '', url: 'https://...' } — external project resources.
  repository: ''           // GitHub owner/repository for the Watch on GitHub link.
}
```

Image and gallery paths resolve from the site root at every page depth, including GitHub Pages' `/portfolio/` prefix. Missing cover images preserve the circular placeholder. Optional facts, write-up sections, gallery, and external links appear only when supplied. Cards always navigate to the internal project page; external URLs belong in `links` on that page. Projects appear in array order, and `featured: true` selects the homepage shortlist.

`public/project-cards.js` shares capsule/card media and navigation. `public/project-pages.js` renders the collection and detail content; `public/projects-data.js` validates slugs and resolves URLs. The Node server and static builder both use `scripts/project-pages.mjs` and `scripts/templates/project.html`, so direct visits and refreshes work without SPA routing or a GitHub Pages 404 workaround. No npm dependencies, application database or CMS were added. New entries automatically receive generated pages on the next build/deployment.

### Interactive CAD and technical specifications

Mongla's project page includes twelve sourced readouts across compute/perception, control/navigation, and software/sensing. The [Mongla technical site](https://fh1m.github.io/mongla_ws/) backs the reported bench rates and latency, the ROS 2/compute setup, optical-flow/estimation approach and simulator. Measurements retain their bench context and do not claim underwater validation. Control-board internals remain outside this project write-up.

The owner explicitly retained seven thrusters and six DOF for the project configuration. The source CAD is a separately labelled five-thruster, passive-roll reference; its 702.0 × 176.1 × 172.1 mm dimensions describe that mesh only. Keep this distinction when updating content.

`public/project-model.js` creates a viewer only on the dedicated project page. The homepage shortlist shows capsule banners only and does not import the viewer or load 3D assets; collection cards also remain static. Drag/arrows orbit; +/- buttons and keys zoom; Rotate/Pause controls optional rotation; Reset restores the camera/assembly; the labelled range separates CAD parts. Normal page scrolling remains available over the model, including touch scrolling. The initial view is stationary. Mesh/renderer loading starts near the viewport; a data-saving connection requires Load 3D model. A missing mesh or unsupported WebGL keeps the poster/source link and offers a retry.

The viewer is a locally adapted, MIT-licensed native WebGL2 module from fh1m/mongla_ws, with the original model and poster hosted alongside it. No npm package, CDN script, third-party iframe, backend or build tool was added. The renderer draws on demand while static, suspends when offscreen/hidden, and responds to live reduced-motion changes. The model is 931,524 bytes and the poster 97,360 bytes. `public/vendor/mongla/README.md` records provenance, original hashes and adaptations; LICENSE.txt retains the upstream copyright/terms. `server.mjs` serves WebP, the binary .mgla container and the license with their proper MIME types; the regular static build copies them without modification.

All editable model labels, geometry notes, asset paths, source link, CAD dimensions and technical readouts stay in `public/content.js`. Only add CAD models compatible with this viewer's MGLA container; other file formats require an explicit implementation decision.

### Comments, watching and views

`public/project-engagement.js` adds these features to real project pages. Configuration stays in `projectEngagement` and each project's `repository` in `public/content.js`. GitHub Pages remains a static host; no secret or write-capable API token is sent to visitors.

- Comments use public issues in `RakibulIslam1/portfolio`. Leave a comment opens GitHub's new-issue form with a `[project-slug] Comment` title; the visitor signs in and submits it there. Keep the bracketed slug in the title so it appears on its project page. A public GitHub search reads the latest ten matching conversations, rendering titles/bodies as plain text, with replies continuing on GitHub. The owner moderates through the normal repository issue controls. Empty, unavailable and rate-limited responses have honest fallback text and working links; comments are never stored only in the visitor's browser. GitHub search indexing may delay new conversations.
- Watch on GitHub opens the project's code repository. Visitors choose GitHub's native Watch option there; the portfolio never pretends to subscribe them. `repository` should be supplied for each code project.
- Shared view badges use [Hits](https://github.com/silentsoft/hits) at `https://hits.sh/<canonical-host>/portfolio/projects/<slug>.svg`, counting visits since activation without an invented starting total. The canonical base is `projectEngagement.publicSite`. The badge loads only on that origin, so localhost/preview checks do not inflate totals. It links to counter statistics and falls back to Views unavailable when the service fails. These are public page-load counts, not verified unique people; caching, blockers and the external service affect totals. Keep slugs/base stable to retain history. No count is incremented from homepage or collection cards.

These features depend on GitHub's public REST API and Hits, rather than a new portfolio backend. The complete project write-up and navigation work if either service is blocked. Inline anonymous posting and guaranteed first-party analytics would require a separately approved backend/hosting decision.

`public/hero-motion.js` uses the 13 supplied project renders listed in `content.js`. On reload, all 13 drift at fresh random positions along the portrait's very bottom edge. Positions are sampled freely with a minimum-distance check; there are no rows, columns, or fixed anchors. Floating sizes scale with the number of renders to preserve spacing as assets are added. Varied sizes and gentle drift reduce crowding. They follow staggered curved flights into the heading once, with `create` fading gradually from the first departure through the flight window. Later cycles only hide `create`, scroll the render row right to left inside its exact word box, and restore the text for a 4.2-second rest. Resizing, scrolling back, and changing motion preference never replay the portrait intro. In-memory small textures keep the motion light without changing source images.

`public/counter-motion.js` counts the projects, national wins, and WRO prizes from zero once per page load. RoboSub's 8th place is static (`animate: false` in its content configuration). Plus signs are preserved; final values stay available to screen readers throughout. Reduced-motion preference shows final values immediately. The original heading remains accessible during the image reel. The pause control beside the scroll cue freezes the render animation, and motion suspends while the hero or browser tab is out of view. Missing images are skipped and the normal headline remains available.

Five skills selected from the owner's CV appear in one row between the achievement counters and hero actions: Embedded Systems, PCB Design, Robotics, Control Systems, and 3D Design. All share one prominent dark red fill, brighter red border, and larger semibold white text. The row scrolls horizontally on narrow screens and supports keyboard arrow scrolling when focused. Edit the labels in `skills` in `public/content.js`; the shared appearance is controlled by `.skill-chip` in `public/styles.css`. These are descriptive badges rather than interactive controls.

The hero pairs a red pill-shaped Explore the work button with a Download CV link using a red-tinted background, pink text, and a red border. The owner replaced the original document with `CV draft-1.pdf`, served unchanged from `public/files/CV draft-1.pdf`; the download and HTML fallback both use that file. Update `cv.url` and `cv.filename` in `public/content.js` when replacing it. A same-origin file supports the browser's download behavior; external URLs depend on the remote server. Clearing `cv.url` returns the control to its unavailable state. The Node server serves PDF files as `application/pdf`, and the static build includes the supplied document.

The About section uses an unnumbered label, a globe on the left, and the CV introduction/current education on the right. It has modest 20–28px padding above and below, no reserved panel height, a 460px maximum desktop globe (340px on phones), and a larger central portrait. The following Work section starts without additional top padding, and the hero's lower gutter is 8px. On phones, the globe sits above the text. Edit `about.description`, `about.currentEducation`, `about.educationHistory`, and `about.socials` in `public/content.js`. The Educational background button replaces the introduction and current studies with the HSC/SSC timeline in that same content area; Back to about me restores it. Facebook, LinkedIn, Instagram, and GitHub icons remain inactive until the owner supplies their URLs.

`public/about-motion.js` ties the 13 renders leaving `create` to scroll position, with curved paths into the globe. Each appears three times, giving 39 objects total. Originals and copies use independently shuffled image orders and random sphere positions with spacing checks; matching copies are placed away from each other and at different latitudes. Fresh arrangements are generated on reload. Depth projection, a tilted rotation axis, and individual gentle drift give the globe volume. Its circular portrait occupies 44% of the stage width and fades in from 60–78% scroll progress. Front-layer clipping measures the actual portrait size to keep the face unobstructed. Scrolling back reverses formation and returns to the hero reel without replaying the reload intro. The owner requested removing the About caption and pause button. Globe motion still suspends when offscreen or in a hidden tab and shows a static sphere/portrait for reduced motion. Missing render assets preserve the portrait and all About content. `public/render-assets.js` shares decoded, small canvas textures between both animations; this remains native browser JavaScript with no new npm dependencies.

Globe rotation and individual drift ease in between 65% and 85% assembly progress, while the final renders are still arriving. The settled rotation speed is unchanged.

## Achievements

The homepage Achievements section sits between selected projects and Contact. It shows all CV results in three tiers: two compact international standings, a quieter row of the six other WRO results, and a plain list of the 19 remaining competition results. The WRO 2025 sixth-place/full-score highlight retains Team LazyGo credit; the eighth-place team result retains BRACU Duburi credit. The highlighted WRO result is not repeated below, and the 2024 nineteenth-place result stays labelled Participant. All 26 CV Honors & Awards are included once, plus the Duburi team result from Experience. Eight undated records remain without a year. Existing owner-supplied hero totals remain unchanged.

All personal data stays in `achievements.highlights`, `achievements.wro`, and `achievements.otherResults` in `public/content.js`. `public/achievements.js` renders the records and current CV link. `public/achievements.css` keeps the main placements small, WRO tiles subdued, and the other results as plain rows in two desktop columns or one phone column. The six WRO tiles form one desktop row, then three/two columns on smaller screens. There are no large panels, score stamps, year accordions, or automatic animations. The homepage and project-page headers link to `#achievements` with the fixed-header offset; narrow navigation shows Awards while retaining the accessible name Achievements.
