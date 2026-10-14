# Project memory

Last updated: 2026-10-15 (Asia/Dhaka)

## Confirmed owner requirements

- Create the website project here using Node.js and other suitable tools.
- Personal portfolio; the owner will provide personal details later.
- Full dark theme with a black background.
- Two or three large red round circles, potentially half cut by edges, fading into transparency toward their outer edges.
- Navigation always stays at the top.
- Owner extended the site on 2026-10-15: retain homepage sections and add a Projects collection plus dedicated project pages. Homepage menu links still scroll to their sections.
- Maintain memory and documentation for future teammates.

## Implementation decisions

- Local project in C:/Users/Rakibul/Desktop/portfolio. Owner requested publishing to their GitHub account and GitHub Pages on 2026-10-15; the selected destination is RakibulIslam1/portfolio.
- Dependency-free Node.js server and vanilla HTML/CSS/JavaScript; native ES modules.
- Home, About, Work, and Contact homepage sections, plus /projects/ and /projects/<slug>/ pages.
- Three CSS radial-gradient ambient circles; the hero uses the supplied portrait images/S.png with a subtle red glow and masks that soften all four edges and corners. A web copy is in public/images/S.png.
- Black/red palette, large typography, italic serif accents, subtle borders.
- Public content centralized in public/content.js.
- Name is confirmed as Rakibul. About biography and education now come from the supplied CV. Projects and contact details still await owner input. Achievement counts below were supplied by the owner.
- Fixed header, scroll offset, smooth anchor scrolling, active section navigation, mobile layouts, skip link, keyboard focus, reduced-motion support.
- Static build copies public/ into ignored dist/. Font loading is optional and has system fallbacks.

## Awaiting owner details

- Full display name if different from the confirmed name Rakibul.
- Additional introduction, biography, or interest details beyond the supplied CV, if desired. The current role, short biography, education, and five skill keywords use that document.
- Actual projects with descriptions, links, and any screenshots.
- Email/social links. Owner confirmed on 2026-10-15 that they will provide Facebook, LinkedIn, Instagram, and GitHub URLs later; do not ask again until they supply them. The supplied CV is connected to the hero download button below.
- Any custom domain, if desired; the owner selected GitHub Pages hosting on 2026-10-15.

## Handoff rules

Read AGENTS.md and README.md. Update this file as new details arrive. Keep the visual direction and confirmed homepage/Projects scope unless the owner changes them. Record verification results below after running checks.

## Verification

- npm run check passed for the server, browser scripts, and build script.
- npm run build succeeded and generated dist/.
- Live HTTP checks passed for the homepage, CSS, JavaScript, content module, and favicon.
- Confirmed missing paths return 404, unsupported methods return 405, path traversal is blocked, and HEAD returns no body.
- Initial starter work did not have browser QA; headless Chrome verification and screenshot review were completed for the responsive revision below.

## Owner revisions — 2026-10-13

- Replaced the hero's right-side abstract sphere with the portrait from images/S.png. Original image retained; CSS handles blending.
- Replaced navbar initials badge and Portfolio label with one RAKIBUL wordmark: RAKI in white, BUL in red.
- Removed the hero's A PERSONAL PORTFOLIO eyebrow.
- Confirmed display name Rakibul; title and footer now use it, with navbar text centralized in content.js.
- Portrait stacks beneath hero copy on small screens.
- Added PNG response content type for the local server.

## Responsive and blending revisions — 2026-10-13

- The current navbar wordmark is RAKIB in white and UL in red, superseding the earlier RAKI/BUL split. Both the HTML fallback and content.js use the new split.
- The owner wants portrait corners and all sides blended into the background and surrounding effects. Intersected horizontal and vertical CSS masks preserve the face while softening all edges; the original image remains unchanged.
- On mobile, center the hero copy and call to action horizontally. Keep them above the image, without vertically centering the entire hero in the viewport.
- Use normal-flow grid columns on desktop/tablet instead of absolute portrait positioning, so short viewports and longer copy do not create overlap.
- Stack hero text then portrait below 761px. Use compact two-column layouts from 761–1100px; fluid desktop sizing above that.
- Use two navigation rows below 541px, touch-friendly links, scalable headings, one-column mobile projects, wrapping footer content, and header-aware scrolling/navigation.
- npm run check and npm run build passed after the responsive changes.
- Headless Chrome checks passed at 19 viewport sizes from 280x653 to 2560x1440, including 540/541, 760/761, and 1100/1101 breakpoint boundaries and 844x390 landscape.
- Verified no horizontal overflow, copy/header clearance, two-column separation, mobile text/button/image centering, image below mobile copy, fixed-header anchor clearance, active About navigation, reduced-motion behavior, and portrait HTTP/build output. External fonts were blocked to verify local fallbacks.
- Visually reviewed phone, tablet, landscape, and desktop screenshots. All-edge portrait fading preserves the face and blends shoulders into black/red effects.
- Fixed portrait-glow overflow caught at 360px; glow stays within its container. Desktop alignment checks account for scrollbar width.
- Background glows are contained by the full document rather than the viewport, avoiding abrupt fade cutoffs on short landscape screens.
- Local QA script and screenshots are ignored under .preview-check/. Tests cover representative sizes in Chrome; other browser engines and physical devices were not tested.

## Navbar and hero polish — 2026-10-13

- Owner requested a shorter navbar, slightly wider padding on both sides, a hero suited to different displays, a less generic scroll prompt, and removal of the work-in-progress label.
- Navbar is now 64px tall on desktop/tablet and 90px in the narrow two-row mobile layout. Desktop padding uses 8vw with limits; tablet uses 44px; phones use at least 28px. Scroll offsets inherit the new header heights.
- Removed A WORK IN PROGRESS from the hero. Replaced SCROLL TO EXPLORE with A little further, a thin red downward arrow, and softly fading horizontal rules. Link scrolls to About and has a descriptive accessible label.
- Hero uses an explicit content row and scroll-cue row. Portrait size responds to viewport height as well as width; mobile retains centered text above the portrait. Short landscape screens use compact spacing and typography without clipping content.
- npm run check and npm run build passed. Browser geometry checks passed at 23 viewport sizes, including four added short-height cases (390x664, 1280x600, 1440x600, 1920x640).
- Verified scroll cue stays below the image, old labels are absent, navigation branding does not overlap links, and the hero fits tested desktop viewports at least 600px tall. Existing overflow, mobile alignment, anchor offset, active navigation, reduced-motion, and image-serving checks passed.
- Reviewed updated phone and desktop screenshots. Chrome was checked with external fonts blocked; other browser engines and physical devices remain untested.

## Hero achievements and render animation — 2026-10-14

- Owner requested replacing the hero's personal-portfolio description with restrained count widgets and a precise looping animation using project renders in public/images (excluding S.png).
- Confirmed values: projects 20+ for now, national contest wins 25+, WRO 7 prizes total, and RoboSub worldwide position 8th. Values/labels and render image sources live in public/content.js.
- Four plain number/label columns with fine separators replace the entire hero description. No card boxes, icons, or animated number counting.
- The project counter switches from the owner's 20+ fallback to the count of real configured project entries. Existing demo entries have placeholder: true; remove that flag or set false when supplying real work. URLs are not required for counting.
- New public/hero-motion.js uses a transparent canvas above the hero, preserving normal text layout and the accessible heading. Original PNGs remain unchanged.
- Motion sequence: one-second randomized smooth drift below the portrait, staggered cubic flights with banking, then a right-to-left row strictly clipped to the create word box. The word fades out during arrival and returns after the final render leaves. After a 3.2-second rest, the full cycle repeats with new paths and order.
- Mobile flight control points route to the sides of the portrait to keep the face clear. Geometry responds to resizing/font layout; no scrolling render can draw beyond the word's boundaries.
- A quiet pause/resume control appears beside the CTA. Reduced motion keeps create visible and disables the canvas/control. Animation suspends offscreen and in hidden tabs; image decode failures fall back to the unchanged headline.
- Verification: syntax/build checks passed; responsive browser geometry and counter checks passed at 23 viewport sizes. Desktop (1440x900) and mobile (390x844) animation checks covered gather/flight/reel, pixel-level clipping (zero painted pixels outside create in reel phase), word restoration, repetition, pause/resume, reduced motion, offscreen suspension, and missing-image fallback. No browser JavaScript errors observed.
- Reviewed desktop/mobile screenshots of gathering, flights, clipped reels, and restored headings. External fonts were blocked for fallback checks. Other browser engines and physical devices are untested. Local QA artifacts remain ignored under .preview-check/.
- Final HTTP checks confirmed the animation module and all eight render URLs return 200 with correct PNG content types; dist/ contains the final animation module. Policy blocked removal of the disposable browser-profile and motion-profile directories inside ignored .preview-check/; no account sign-in was used in either test profile.

## Natural intro and counting revisions — 2026-10-14

- Owner found the previous portrait movement unnatural and crowded. They requested a one-time portrait intro after reload, with only the create text/reel repeating afterward, plus counters increasing from zero after reload.
- Supersedes the previous full-cycle repetition and static-count decisions above. Current intro uses five smaller renders at separated silhouette anchors with subtle, slow drift; three use a rear canvas beneath the portrait and two use the front canvas. Rear renders peek from behind the silhouette, and flights use reduced rotation and limited scaling.
- Intro drift begins on asset readiness, first flight starts after one second, and staggered flights last 1.35 seconds each. All eight renders remain in the word reel. Every later cycle has no portrait actors: fade out create, scroll strictly inside that word box, fade the word back, then rest for 4.2 seconds.
- Intro completion persists for the page lifetime. Resizing after the entrance starts suppresses any replay; motion preference changes and returning from offscreen also preserve one-time behavior.
- Original assets are unchanged. Each render is cached as a small in-memory canvas texture once, improving drawing performance.
- New public/counter-motion.js counts visible values from zero over approximately 1.45 seconds with small staggered delays. Plus signs remain; RoboSub rank uses the appropriate ordinal (1st, 2nd, etc.) and finishes at 8th. Accessible values remain final and unchanged. Reduced motion immediately shows final numbers; counting never repeats on resizing or reel cycles.
- Syntax/build and 23 responsive viewport checks passed. Desktop/mobile browser checks verified front/rear depth ordering, initial zero values, increasing intermediate counts, final accessible values, exact word clipping, pause/resume, word restoration, reel-only repetition, no intro replay after resizing, reduced-motion behavior, offscreen suspension, and absence of JavaScript errors.
- Reviewed revised desktop/mobile intro and flight screenshots. Other browser engines and physical devices remain untested.

## Bottom intro, static rank, and hero buttons — 2026-10-14

- Owner preferred the earlier motion near the bottom of their photo and requested more spacing. Current intro supersedes the silhouette/back placement above: all eight renders occupy two loose rows across the lower portrait, with wider horizontal/vertical separation, small position jitter, and gentle independent drift. The intro still runs once per reload; only the create reel repeats.
- RoboSub 8th is now permanently static. Its content stat sets animate: false; the other three visible counters still rise from zero. All accessible values remain final.
- Restyled Explore the work with a rounded red gradient, subtle border/shadow, and a compact arrow icon. Added a matching outlined Download CV link beside it. Buttons stay adjacent at ordinary phone/tablet/desktop sizes and stack below 301px to avoid overflow.
- Moved the motion pause/resume control beside the scroll cue so the two main hero actions remain together.
- Owner confirmed they will upload the CV to the project later. No CV file or URL is available yet; no further clarification is needed until it is supplied. Download CV has no href, is marked aria-disabled with a CV coming soon title, and stays inactive until a valid cv.url is supplied. URL/download filename configuration is centralized in public/content.js. When the real CV is added, connect it to the button and verify the download. Do not invent a resume or point the button at a missing document.
- Validation: npm run check and npm run build passed. Updated 23-viewport browser checks passed. Desktop/mobile motion checks verified intro pixels remain in the lower portrait, three count-ups start from zero, RoboSub remains 8th throughout, exact word clipping, pause/resume, word return, reel-only repetition, no replay on resize, reduced motion, offscreen suspension, and no JavaScript errors. Reviewed hero button layouts and the wider bottom intro in screenshots.

## Random bottom-edge placement — 2026-10-14

- Owner rejected the visible even pattern and requested random placement at the bottom-most part of the photo. This supersedes the two-row placement above.
- Removed row/column anchors completely. Each intro render samples independent x/y positions across a narrow band at the portrait's base, with a minimum-distance rejection check and a bounded best-fit fallback for cramped sizes.
- Varied smaller render sizes and gentle drift leave more breathing room. Fresh positions are chosen on reload. The intro still runs once; later cycles remain entirely inside create. Static RoboSub 8th, the other three animated counters, and the CV-later decision are unchanged.
- npm run check and npm run build passed. Desktop (1440x900) and mobile (390x844) browser checks confirmed visible intro pixels stay below the top of the portrait's lowest 20%, exact reel clipping, one-time intro, pause/resume, word restoration, static rank, count-ups, resize/reduced-motion/offscreen behavior, and no JavaScript errors. Reviewed both random-scatter screenshots.

## Flight fade, render size, and colored buttons — 2026-10-14

- Owner requested create fading slowly while renders travel, slightly larger render images around the portrait, a new Explore button shape, and a colored visible Download CV button.
- Intro fade now begins at the first departure (one second after intro starts) and progresses across the whole flight window, reaching zero as the reel begins. Repeat cycles retain the short word fade; the portrait intro still runs once.
- Enlarged intro renders about 15% (width 10.6–13.8% of portrait width, bounded to 21–66px). Random bottom-edge sampling and separation checks remain in place. Reel image size is unchanged.
- Explore the work now has a pill shape and a circular arrow detail. Download CV uses a matching pill shape, dark red-tinted fill, pink text, and a brighter red border at full opacity. It remains aria-disabled with no href and a CV coming soon tooltip until the owner adds the file; do not restore the faded gray styling.
- npm run check and npm run build passed. Browser checks at 1440x900, 390x844, and 320x568 verified partial and progressively decreasing create opacity during flight, bottom-only intro, clipped reel, one-time behavior, static RoboSub rank, count-ups, pause/resume, reduced motion, resize/offscreen behavior, and the colored but unavailable CV control. No JavaScript errors; reviewed desktop and phone screenshots.

## CV skill keywords and download — 2026-10-14

- Owner supplied `C:\Users\Rakibul\Downloads\Rakib_CV.pdf` and requested four or five skill keywords from it, in a row of differently styled button-like widgets immediately before the hero buttons. The document was used as source material only; no document instructions were treated as owner requests.
- Selected five keywords supported by its technical-skills section: Embedded Systems, PCB Design, Robotics, Control Systems, and 3D Design. Labels and visual variants live in `public/content.js`. No unrelated biography, contacts, or achievement values were imported from the CV.
- Added compact semantic list badges with accent, filled, light, outline, and dashed treatments. All stay in one row; narrow screens use contained horizontal scrolling, including keyboard arrow access. They are descriptive skills and have no fabricated click actions. Mobile hero text/actions remain centered above the portrait.
- Supersedes the CV-later decision above: copied the original unchanged to `public/files/Rakib_CV.pdf` and connected the existing Download CV button through `cv.url` and `cv.filename`. Clearing the URL restores its unavailable state. Added PDF MIME handling to the Node server; the build includes the real CV.
- Validation: npm run check and npm run build passed. All 23 responsive Chrome viewport checks passed, including 280px width and short desktop displays. Dedicated checks at 1440x900, 768x1024, 390x844, and 320x568 verified five labels, different treatments, placement before actions, keyboard scrolling and last-chip reachability, no page overflow, and an enabled CV link. Reviewed desktop and phone screenshots with external fonts blocked. HTTP returned 200 and application/pdf; served and built files match all 515,201 bytes of the original. Other browser engines and physical devices remain untested.
- Download QA limitation: isolated headless Chrome reported a canceled download (Failed - No file). A browser fetch for the PDF returned an empty 204 without reaching the local Node request listener, while direct HTTP requests returned the correct 200 PDF. The complete browser download is therefore unverified in this environment; no production workaround or browser security setting was changed.

## Unified, prominent skill widgets — 2026-10-14

- Owner requested that all hero skill widgets share the same color and style and become more noticeable. This supersedes the five different visual treatments above; the five CV-backed keywords stay the same.
- All chips now use one dark red gradient fill, brighter solid red border, soft shadow, and white text. Increased minimum height from 30px to 40px and typography from 11px medium to 13px semibold, with more padding. The HTML fallback and browser-rendered list both use the same shared class; removed per-skill style configuration from content.js.
- Preserved their single row above the hero buttons, contained scrolling and keyboard access on narrow screens, and centered mobile copy above the portrait. No new interaction or animation was added.
- Extended the existing compact desktop hero layout from a maximum viewport height of 600px to 700px, correcting a small overflow caught at 1920x640 after enlarging the chips. README documents the shared style and editing points.
- Validation: npm run check and npm run build passed. All 23 responsive Chrome viewport checks passed after the compact-layout adjustment, including 280px width and 1920x640. Dedicated checks at 1440x900, 768x1024, 390x844, and 320x568 verified identical chip treatments, a single row before the buttons, keyboard scrolling and last-chip reachability, and no page overflow. Reviewed desktop and phone screenshots. Other browser engines and physical devices remain untested; the prior CV-download verification limitation is unchanged.

## Section 01 / About, education, and scroll globe — 2026-10-15

- Owner requested developing the next section using the CV: a visual made of the existing project renders that leave create as they scroll, form a rotating globe, then reveal a circular image in its center while the renders continue moving around it. They also requested a short biography, current education, four social icons, and an in-place button to show previous education.
- Interpreted the empty left column as the globe position and the requested right-side content as biography/education. Desktop and tablets use those two columns; phones place the globe above the text. Reused S.png for the globe's central portrait. The owner's existing hero and black/red direction stay in place.
- Biography is a short first-person paraphrase of the CV: hardware/electronics development, over six years in robotics, control systems, drones, autonomous robots, custom electronics, firmware, and control interfaces. Current study is Bachelor of Science in Electrical and Electronics Engineering at BRAC University, 2026–Present, enrolled Spring 2026. Previous entries are HSC, Dhaka Residential Model College / Dhaka Board, 2025, GPA 5.00; and SSC, Annada Govt. High School / Cumilla Board, 2023, GPA 5.00. No unspecified university GPA, graduation date, new role, or contact details were invented.
- All personal data is centralized in the new about object in public/content.js. public/about.js fills the section and handles a native button that swaps biography/current study for the HSC/SSC timeline in the same panel. It maintains keyboard focus and aria-expanded; a second click restores the overview. Social icons stay visible in both states.
- Owner explicitly said social URLs will come later. All four requested icons are present, labelled, and inactive with no fabricated destinations. Enter valid URLs in about.socials to enable them.
- public/about-motion.js uses scroll progress for eight curved seed flights from the create word box. Forty copies emerge around the destination to build a 48-render sphere. Perspective/depth sorting, a tilted axis, subdued globe grid, and individual subtle drift provide volume and continuous rotation. The central portrait appears after a short settling delay and stays unobstructed. Fractional anchor scroll positions settle fully instead of stopping just short.
- The viewport travel canvas handles only the transition; settled drawings stay within the globe's local canvases. The hero reel yields during the transition and resumes when returning to the top, without replaying its reload intro. Globe pause/resume, offscreen/tab suspension, reduced-motion static globe/portrait, and missing-image portrait/content fallback are supported.
- Added shared public/render-assets.js so the hero and About animations reuse decoded small textures rather than separately loading/resampling large PNGs. This is a modular extension of the existing dependency-free native browser architecture, with no external npm packages. npm run check now includes all new modules. README explains configuration and behavior.
- Validation: npm run check and npm run build passed. All 23 responsive viewport checks passed. About interaction checks passed at 1440x900, 768x1024, 390x844, 320x568, and 280x653: visible scroll flights, globe rotation, portrait reveal, pause/resume, keyboard education switching with focus retained, inactive social icons, offscreen suspension, and reduced-motion fallback. Desktop/mobile reverse-scroll checks verified create restoration and reel resumption without replaying intro or counters. A separate blocked-render run verified the portrait/content fallback. New modules returned HTTP 200 and matched built copies.
- Existing hero animation regression checks passed at 1440x900, 390x844, and 320x568: random bottom-only intro, increasing counters/static RoboSub rank, exact create-box clipping, pause, word return, reel-only repetition, resize/reduced-motion behavior, and offscreen suspension. No browser JavaScript exceptions observed. Reviewed desktop/mobile globe and flight screenshots and the education view, with external fonts blocked. Other browser engines and physical devices remain untested. Pending work: owner social profile URLs, real project details, and any further content they request. The previously recorded CV-download test limitation is unchanged.

## More renders, random globe copies, and compact About — 2026-10-15

- Owner supplied five additional PNG renders in public/images and requested including them, fewer repeated globe objects without copies lining up, an earlier portrait reveal, a shorter About section, and removal of its 01 label.
- Added Orange-and-White Quadruped Robot Render.png, Orange Enclosed Cartesian 3D Printer.png, DIY Ultrasonic Robot Car Chassis.png, DIY Robotic Rover with Sensor Eyes.png, and Cute Pink Robot Figurine Render.png to projectRenders in public/content.js. Both hero and globe now include all 13 supplied renders. Original image files are unchanged.
- Globe now uses one original and one extra copy per source: 26 objects instead of 48. This supersedes the earlier fixed count and patterned sphere placement. Originals and copies are shuffled independently; each chooses a fresh random point on the sphere, with minimum spacing and stronger separation/different latitudes for matching images. No source-to-latitude or longitude pattern remains.
- Circular portrait now fades with scroll progress from 72% to 88%, appearing while the globe is still assembling. This supersedes the delayed reveal after full assembly. Rotation, subtle independent drift, pause, reverse scrolling, and reduced-motion behavior remain supported.
- Removed the entire 01 / prefix from the About label. Reduced About padding from up to 120px to 36–64px per side, row gaps, panel minimum heights, and extra content margins. Globe maximum width is 460px on desktop and 360px on phones. Hero intro thumbnails adapt their size to the 13-render density so random bottom placement retains breathing room; the full 13-image reel stays clipped to create.
- CV biography/education and pending social-link preferences are unchanged. README documents the current render count, random placement, earlier reveal, and compact layout.
- Validation: npm run check and npm run build passed. All 23 responsive viewport checks passed. Dedicated checks at 1440x900, 768x1024, 390x844, 320x568, and 280x653 verified all 13 sources / 26 globe instances, removed numbering, scroll flights, visible portrait before full assembly, rotation, pause, keyboard education switching, inactive socials, offscreen suspension, and reduced motion. The normal desktop About height measured approximately 663px at 1440x900. Two reduced-motion reloads produced different static arrangements, confirming fresh random placement. All 13 image URLs returned PNGs identical to the source and build copies; missing-render fallback and new-module serving/build checks passed.
- Hero regression checks passed at 1440x900, 390x844, and 320x568 with all 13 assets: random bottom intro, gradual create fade, count-ups/static 8th rank, exact word clipping, pause, word restoration, reel-only repetition, resize/reduced-motion behavior, and offscreen suspension. The QA timeout accommodates the longer 13-image reel. No browser JavaScript exceptions observed. Reviewed desktop/phone globe and earlier-portrait screenshots. Other browser engines and physical devices remain untested. Pending social links and actual project content remain as recorded above.

## Three instances, larger portrait, and removed About gaps — 2026-10-15

- Owner requested three of each render, an earlier/larger central image, removal of IN ORBIT and the globe animation-stop button, and removal of gaps around the section to further reduce its height.
- Globe now uses three instances per source: one travelling original and two local copies, 39 objects across the 13 images. Each group is shuffled independently and retains random sphere placement, minimum spacing, and stronger separation/different latitudes for matching renders. This supersedes the previous two-per-source count.
- Portrait fades with scroll progress from 60% to 78%, earlier than the previous 72–88% interval. Enlarged it from 31% to 42% of the globe stage width. Front-canvas clipping now measures the actual rendered portrait width, protecting the face as its size changes.
- Removed the entire About globe footer, caption, pause/resume markup, styling, and event logic at the owner's explicit request. Reduced-motion support and offscreen/tab suspension remain. The hero's separate pause control is unchanged.
- About has zero top/bottom padding and no reserved minimum height for the education/overview panel. Its row gap is 12px. Globe maximum width is 420px desktop / 320px mobile; the larger portrait remains visibly bigger despite the more compact stage. Removed top padding from the following Work section and reduced the hero's lower gutter to 8px. The unnumbered About label and education/social content remain.
- At 1440x900, the normal About layout measured about 451px tall versus 663px in the previous revision. README describes the new copy count, earlier reveal, removed controls, and tighter layout. Pending social links and actual project details remain as previously confirmed.
- Validation: npm run check and npm run build passed. All 23 responsive viewport checks passed. Dedicated About checks passed at 1440x900, 768x1024, 390x844, 320x568, and 280x653: 39 objects from 13 sources, larger portrait before full assembly, zero outer padding, removed caption/button/footer, rotation, pixel-level absence of render overlap on the portrait, keyboard education switching, inactive social icons, fully offscreen suspension, and reduced-motion fallback. Fresh static arrangements differed across reloads. All image/module serving and build-copy checks and missing-render fallback passed, with no browser JavaScript exceptions. Reviewed desktop/phone screenshots; other browser engines and physical devices remain untested.

## Modest About gaps and slightly larger globe — 2026-10-15

- Owner requested restoring a little space before and after About and slightly increasing both globe and portrait size. This supersedes the zero-padding preference above.
- About now has 20–28px of vertical padding on each side, scaling with viewport width. Work retains zero additional top padding so the lower gap is not doubled. The hero's 8px lower gutter remains.
- Increased globe maximum width from 420px to 460px on desktop and from 320px to 340px on phones, bounded by available width. Increased the portrait from 42% to 44% of the stage width. Existing DOM-based clipping automatically protects the larger portrait.
- Retained the 39 randomly placed render instances, early 60–78% portrait reveal, removed About caption/pause controls, responsive education toggle, and confirmed CV/social preferences. README reflects the new dimensions and spacing. At 1440x900 the About layout measured about 547px tall, keeping the restored spacing modest.
- Validation: npm run check and npm run build passed. All 23 responsive viewport checks passed. Desktop (1440x900) and phone (390x844) checks verified modest padding, enlarged portrait without render overlap, scroll assembly/rotation, earlier reveal, keyboard education switching, reverse-scroll restoration of create/reel without replaying intro or counters, offscreen suspension, and reduced motion. Fresh arrangements, all 13 asset responses/build copies, and missing-render fallback passed without browser JavaScript exceptions. Reviewed desktop/phone screenshots. Other browser engines and physical devices remain untested.

## Earlier globe rotation — 2026-10-15

- Owner requested starting the globe's moving animation a little earlier. Rotation and per-object drift now ease in from 65% to 85% scroll assembly progress, with movement beginning while the last renders are still arriving. This supersedes the previous abrupt start at 98% progress.
- One shared easing function coordinates globe rotation and independent drift. The full rotation speed, 39 instances, portrait size/reveal, modest gaps, removed About footer/controls, and CV content remain as previously confirmed. Reduced motion and offscreen/tab suspension are preserved. README documents the earlier start.
- Validation: npm run check and npm run build passed. Desktop (1440x900) and phone (390x844) browser checks verified rotation advances before full assembly, portrait clearance, normal rotation, education switching, reverse-scroll hero restoration, offscreen suspension, and reduced motion. Random arrangements, all asset/module serving/build-copy checks, and missing-render fallback passed without browser JavaScript exceptions. Other browser engines and physical devices remain untested.

## GitHub repository and Pages hosting — 2026-10-15

- Owner explicitly requested pushing the project to their GitHub account and hosting it with GitHub. Authenticated account is RakibulIslam1. Created the public repository https://github.com/RakibulIslam1/portfolio and configured GitHub Pages to use GitHub Actions at https://rakibulislam1.github.io/portfolio/. This supersedes the earlier local-only deployment preference.
- Added .github/workflows/pages.yml: pushes to main or a manual workflow run check the native JavaScript, build the static site with Node.js 24, upload dist, and deploy to the github-pages environment. The project still has no external npm dependencies. No credentials are stored in the source.
- Converted local asset, portrait, render, and CV URLs to relative paths. CV configuration resolves against document.baseURI so both the local root server and the /portfolio/ Pages subpath work. Added .gitattributes for consistent text line endings. dist and isolated browser QA artifacts remain ignored; source images and the supplied public CV are included.
- Updated AGENTS.md and README with the selected destination and automatic deployment instructions. Pending social URLs and actual project details remain as previously recorded; no new personal content was inferred from the GitHub account.
- Pre-publication validation: npm run check and npm run build passed. Built-site Chrome checks at 1440x900 and 390x844 verified CSS/modules, all render images, portraits, CV link resolution, navigation, education switching, globe movement, and no page overflow under /portfolio/. Every asset passed HTTP/build-byte checks, including the original PDF; no browser JavaScript exceptions were observed.
- Published the source to main in commit 17446f0. The first deployment completed successfully: https://github.com/RakibulIslam1/portfolio/actions/runs/38644041100. GitHub Actions passed the JavaScript checks, static build, artifact upload, and Pages deployment. HTTPS is enabled for the live address above.
- Live-site verification: Chrome checks at 1440x900 and 390x844 passed for the public GitHub Pages URL, including responsive rendering, all 13 project renders, portraits, five skill chips, CV path, section navigation, education switching, and globe rotation. The homepage and every deployed CSS/module/image/PDF URL returned HTTP 200 and matched the built files (text line endings normalized, binary files exact). No browser JavaScript exceptions occurred. Physical devices and other browser engines remain untested; actual browser file-save behavior retains the previously recorded QA limitation.

## Selected projects, collection, and dedicated pages — 2026-10-15

- Owner explicitly extended the single-page scope: show a shortlist on the homepage, a See all projects button opening a Projects page, a block-format list of all projects, and a dedicated page for each project. Both homepage and collection cards must open that project's page directly. Every detail page includes a Back to all projects button. Owner will provide project images and details next.
- Homepage Work now uses one full-width capsule per row. Circular media alternates left/right on desktop and tablets; narrow phones stack the circle above centered description/actions. The full collection uses three columns on large displays, two on tablets, and one on phones. All layouts retain black/red branding, fixed navigation, keyboard links, readable headings, and reduced-motion behavior.
- Replaced the two old abstract demo cards with three explicitly marked Project 01/02/03 layout previews. No project claims, technical categories, outcomes, roles, or unconfirmed images were invented. The existing animation renders remain assigned only to their established animations; supplied project covers will replace the new circular image placeholders.
- Project configuration stays in public/content.js: slug, title, category, summary, image {src, alt}, featured, and placeholder. Optional description, facts, sections, gallery, and links support the detail write-up. Unique lowercase hyphenated slugs form permanent /projects/<slug>/ URLs. featured selects the homepage; every real entry appears in the collection. Preview entries disappear automatically as soon as real projects are supplied, and remain excluded from the existing project counter.
- Architecture decision: keep Node.js and native browser modules with no npm dependencies. public/project-cards.js shares media/cards, projects-data.js validates slugs and resolves site-root URLs, and project-pages.js fills the collection and detail layouts. scripts/project-pages.mjs renders an escaped HTML detail template for both the local server and static build. public/projects/index.html is the collection. The builder generates one real HTML directory/index page per visible project, supporting GitHub Pages /portfolio/ paths, direct visits, and refresh without SPA fallback routing.
- Local server now serves directory index files, redirects project paths to a trailing slash, and renders known project routes. Missing projects return 404; HEAD, method restrictions, and traversal protection are retained. Build regenerates only the explicitly checked dist folder, refuses symbolic-link output, and removes stale generated pages. AGENTS.md, README, and the syntax-check command document this extension and the data schema.
- Validation: npm run check and npm run build passed. Local HTTP checks passed for the homepage, collection, every generated detail page, new modules/CSS, CV, redirects, HEAD responses, missing routes, 405 methods, and traversal protection; detail HTML matches build bytes. Chrome checks passed at 11 sizes from 280x653 through 2560x1440, including capsule/grid breakpoints and short desktop screens: round alternating or stacked media, one project per row, collection columns, direct featured links, keyboard card navigation, detail refresh, return buttons, cross-page About offsets, unchanged mobile hero placement/counter fallback, and no page overflow.
- Synthetic data was tested only in an ignored QA server: real featured/unfeatured selection, real project count, hiding previews, safely escaped titles, root-relative images at nested URLs, optional facts/write-up/gallery/resources, rejected unsafe resource URLs, missing-image fallback, and empty lists. No test content was written into public/content.js. No browser JavaScript exceptions occurred. Reviewed desktop/mobile homepage, collection, and detail screenshots with external fonts blocked. Physical devices and other browser engines remain untested.
- Published layout commit d4f3de7 to main. GitHub Pages deployment succeeded: https://github.com/RakibulIslam1/portfolio/actions/runs/38651154985. Live collection: https://rakibulislam1.github.io/portfolio/projects/. Live Chrome checks at 390x844 and 1440x900 passed for homepage capsules, collection blocks, keyboard detail links, detail refreshes, return links, cross-page navigation, and hero preservation. The public homepage, collection, all three detail HTML pages, content module, and new CSS/JavaScript returned HTTP 200 and matched the build with normalized text line endings. No browser JavaScript exceptions occurred.
- Pending: owner-supplied project titles, slugs, shortlist choices, cover images, short descriptions, full write-ups, and optional facts/gallery/resource links. Social and contact details remain pending as previously confirmed.

## Compact capsules with matched curves — 2026-10-15

- Owner requested reducing homepage capsule height, slightly reducing their corner radius, matching the image circle to the capsule corner curve, and optionally reducing width.
- Centered the shortlist within a 1120px maximum width instead of spanning the whole section. Reduced row spacing from 24px to 20px, vertical padding to 18px, and title/action spacing. At 1440x900, the preview capsules now measure 214px tall instead of about 310px.
- Capsule circle diameter scales from 128–176px on desktop/tablets. One shared CSS size variable sets the circle and half that diameter sets the capsule corner radius (88px for the desktop maximum). This replaces the previous 999px pill radius. Alternating left/right media remains.
- Phones keep circle-above-copy stacking, with 128px circles or 112px on narrow phones and the same paired curve sizing. At 390x844 the capsules measure about 340px tall, down from about 448px. Content stays in normal flow so longer supplied descriptions can expand without clipping. Collection cards and dedicated page styling remain unchanged.
- Validation: npm run check and npm run build passed. Focused Chrome checks passed at 10 sizes from 280x653 to 1920x640, including 600/601 and 760/768 boundaries: reduced dimensions, matched curves, round images, alternating/stacked placement, content containment, project URLs, and no page overflow. Verified collection styling and the served/built stylesheet; no browser JavaScript exceptions. Reviewed desktop and phone screenshots with fonts blocked. Physical devices and other browser engines remain untested.
- This revision uses the existing main-branch GitHub Pages publication workflow and the same live portfolio address. Project content and pending owner details remain unchanged.
