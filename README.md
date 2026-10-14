# Personal portfolio

A Node.js portfolio with a black background, three oversized red radial gradients, a fixed navigation bar, and smooth scrolling between Home, About, Work, and Contact.

## Run

Requires Node.js 22 or later. There are no npm dependencies to install.

```powershell
npm run dev
```

Open http://localhost:3000. The server binds to localhost. Use `npm start` without server watching. Override the port with `$env:PORT = 3001` in PowerShell.

## Customize

Edit `public/content.js` for your name, two-color brand text, achievement counters, skill keywords, CV path, biography, projects, render images, and email. Empty project URLs show an honest coming-soon state. A valid email activates the contact link. Edit `public/styles.css` for the design and `public/index.html` for sections.

The About biography and education come from the owner's supplied CV. Project descriptions, email, and social profile URLs still await the owner's input. Achievement counters use the owner's previously confirmed values.

## Verify and build

- `npm run check`: JavaScript syntax checks.
- `npm run build`: copy the public site to `dist/` for static hosting.

Google Fonts improve the typography when internet access is available; local fonts provide a fallback. The website needs no backend service or API key. The Node server serves local development; GitHub Pages serves the built static files.

## GitHub hosting

Repository: https://github.com/RakibulIslam1/portfolio

Live website: https://rakibulislam1.github.io/portfolio/

Push commits to `main` to publish updates. `.github/workflows/pages.yml` checks JavaScript, builds `dist/` using Node.js 24, and deploys it through GitHub Pages. Repository Settings → Pages uses GitHub Actions. `dist/` stays ignored; the workflow creates the deployment artifact. All local asset and CV paths are relative, so the site works under `/portfolio/` and at the local server root. Store replacement CVs in `public/files/` and use a relative URL such as `./files/Rakib_CV.pdf` in `public/content.js`.

## Handoff

Read `AGENTS.md` and `PROJECT_MEMORY.md` before editing. Update project memory when requirements or significant decisions change. The owner authorized GitHub repository creation and GitHub Pages publication on 2026-10-15.

Hero portrait: images/S.png is the supplied original; public/images/S.png is the served copy. Blending is controlled by .hero-portrait and .hero-art in public/styles.css.

Responsive layout: desktop and tablets use two normal-flow hero columns; phones up to 760px place centered copy above the portrait. Navigation switches to two rows up to 540px. Heading sizes, gutters, project columns, and footer wrapping adapt independently. Portrait masks soften every edge and corner while retaining the supplied image.

The fixed navbar uses a compact 64px desktop height (90px with two mobile rows) and separate, wider side padding. Hero image size also responds to screen height. The A little further arrow links to About below the portrait.

The hero counters show the owner's supplied 20+ projects, 25+ national wins, 7 WRO prizes, and 8th place worldwide at RoboSub. The project counter uses 20+ while only placeholder projects exist; once real entries are added, it shows their count. Remove `placeholder: true` (or set it to false) when replacing a placeholder with a real project. Real entries do not need a public URL to count.

`public/hero-motion.js` uses the 13 supplied project renders listed in `content.js`. On reload, all 13 drift at fresh random positions along the portrait's very bottom edge. Positions are sampled freely with a minimum-distance check; there are no rows, columns, or fixed anchors. Floating sizes scale with the number of renders to preserve spacing as assets are added. Varied sizes and gentle drift reduce crowding. They follow staggered curved flights into the heading once, with `create` fading gradually from the first departure through the flight window. Later cycles only hide `create`, scroll the render row right to left inside its exact word box, and restore the text for a 4.2-second rest. Resizing, scrolling back, and changing motion preference never replay the portrait intro. In-memory small textures keep the motion light without changing source images.

`public/counter-motion.js` counts the projects, national wins, and WRO prizes from zero once per page load. RoboSub's 8th place is static (`animate: false` in its content configuration). Plus signs are preserved; final values stay available to screen readers throughout. Reduced-motion preference shows final values immediately. The original heading remains accessible during the image reel. The pause control beside the scroll cue freezes the render animation, and motion suspends while the hero or browser tab is out of view. Missing images are skipped and the normal headline remains available.

Five skills selected from the owner's CV appear in one row between the achievement counters and hero actions: Embedded Systems, PCB Design, Robotics, Control Systems, and 3D Design. All share one prominent dark red fill, brighter red border, and larger semibold white text. The row scrolls horizontally on narrow screens and supports keyboard arrow scrolling when focused. Edit the labels in `skills` in `public/content.js`; the shared appearance is controlled by `.skill-chip` in `public/styles.css`. These are descriptive badges rather than interactive controls.

The hero pairs a red pill-shaped Explore the work button with a Download CV link using a red-tinted background, pink text, and a red border. The owner supplied `Rakib_CV.pdf`, served unchanged from `public/files/Rakib_CV.pdf`; the download link is now enabled. Update `cv.url` and `cv.filename` in `public/content.js` when replacing it. A same-origin file supports the browser's download behavior; external URLs depend on the remote server. Clearing `cv.url` returns the control to its unavailable state. The Node server serves PDF files as `application/pdf`, and the static build includes the supplied document.

The About section uses an unnumbered label, a globe on the left, and the CV introduction/current education on the right. It has modest 20–28px padding above and below, no reserved panel height, a 460px maximum desktop globe (340px on phones), and a larger central portrait. The following Work section starts without additional top padding, and the hero's lower gutter is 8px. On phones, the globe sits above the text. Edit `about.description`, `about.currentEducation`, `about.educationHistory`, and `about.socials` in `public/content.js`. The Educational background button replaces the introduction and current studies with the HSC/SSC timeline in that same content area; Back to about me restores it. Facebook, LinkedIn, Instagram, and GitHub icons remain inactive until the owner supplies their URLs.

`public/about-motion.js` ties the 13 renders leaving `create` to scroll position, with curved paths into the globe. Each appears three times, giving 39 objects total. Originals and copies use independently shuffled image orders and random sphere positions with spacing checks; matching copies are placed away from each other and at different latitudes. Fresh arrangements are generated on reload. Depth projection, a tilted rotation axis, and individual gentle drift give the globe volume. Its circular portrait occupies 44% of the stage width and fades in from 60–78% scroll progress. Front-layer clipping measures the actual portrait size to keep the face unobstructed. Scrolling back reverses formation and returns to the hero reel without replaying the reload intro. The owner requested removing the About caption and pause button. Globe motion still suspends when offscreen or in a hidden tab and shows a static sphere/portrait for reduced motion. Missing render assets preserve the portrait and all About content. `public/render-assets.js` shares decoded, small canvas textures between both animations; this remains native browser JavaScript with no new npm dependencies.

Globe rotation and individual drift ease in between 65% and 85% assembly progress, while the final renders are still arriving. The settled rotation speed is unchanged.
