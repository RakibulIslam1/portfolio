// Replace these placeholders when the owner supplies their details.
// Keep project status honest; do not invent experience or published work.
export const portfolio = {
  name: 'Rakibul',
  brand: { first: 'RAKIB', last: 'UL' },
  title: 'Rakibul — Portfolio',
  description: 'A personal portfolio. Selected work, a little about me, and a place to connect.',
  // Selected from the technical-skills section of the supplied Rakib_CV.pdf.
  skills: [
    { label: 'Embedded Systems' },
    { label: 'PCB Design' },
    { label: 'Robotics' },
    { label: 'Control Systems' },
    { label: '3D Design' }
  ],
  stats: [
    { label: 'Projects', value: '20+', useProjectCount: true },
    { label: 'National wins', value: '25+' },
    { label: 'WRO prizes', value: '7' },
    { label: 'RoboSub worldwide', value: '8th', animate: false }
  ],
  projectRenders: [
    './images/Lazy Go Rover Studio Render.png',
    './images/Sleek Orange-Tailed UAV Render.png',
    './images/Sleek Modular Underwater ROV Render.png',
    './images/Blue-Bladed Ducted Thruster Render.png',
    './images/Gunmetal Red-Trimmed Underwater Drone.png',
    './images/Compact Teal Wheeled Robotics Platform.png',
    './images/Futuristic Purple Combat Skateboard Robot.png',
    './images/Compact Yellow Robotic Chassis Render.png',
    './images/Orange-and-White Quadruped Robot Render.png',
    './images/Orange Enclosed Cartesian 3D Printer.png',
    './images/DIY Ultrasonic Robot Car Chassis.png',
    './images/DIY Robotic Rover with Sensor Eyes.png',
    './images/Cute Pink Robot Figurine Render.png'
  ],
  // Biography and education are taken from the owner's supplied CV.
  about: {
    heading: 'Hardware, electronics',
    headingAccent: '& robotics.',
    description: 'I’m a hardware and electronics developer with over six years of experience in robotics. My work spans control systems, drones and autonomous robots, from custom electronics to firmware and control interfaces.',
    portrait: { src: './images/S.png', alt: 'Portrait of Rakibul' },
    currentEducation: {
      qualification: 'Bachelor of Science',
      subject: 'Electrical and Electronics Engineering',
      institution: 'BRAC University',
      period: '2026 — Present',
      note: 'Enrolled Spring 2026'
    },
    educationHistory: [
      { qualification: 'Higher Secondary Certificate', institution: 'Dhaka Residential Model College', board: 'Dhaka Board', year: '2025', result: 'GPA 5.00' },
      { qualification: 'Secondary School Certificate', institution: 'Annada Govt. High School', board: 'Cumilla Board', year: '2023', result: 'GPA 5.00' }
    ],
    // Owner will supply profile URLs later; keep these icons inactive until then.
    socials: [
      { platform: 'facebook', label: 'Facebook', url: '' },
      { platform: 'linkedin', label: 'LinkedIn', url: '' },
      { platform: 'instagram', label: 'Instagram', url: '' },
      { platform: 'github', label: 'GitHub', url: '' }
    ]
  },
  email: '',
  cv: { url: './files/CV draft-1.pdf', filename: 'CV draft-1.pdf' },
  // All Honors & Awards from CV draft-1.pdf, plus the Duburi team result.
  // The highlighted WRO result is excluded from the six secondary entries.
  achievements: {
    heading: 'Achievements',
    highlights: [
      { event: 'World Robot Olympiad', year: '2025', rank: '6', ordinal: 'th', distinction: 'Full score', team: 'Team LazyGo' },
      { event: 'RoboSub', year: '2026', rank: '8', ordinal: 'th', distinction: '', team: 'BRACU Duburi' }
    ],
    wro: [
      { round: 'Open Championship selection', level: 'National', year: '2025', result: 'Champion', detail: 'Gold medal' },
      { round: 'National Round', year: '2025', result: 'Champion', detail: 'Gold medal' },
      { round: 'Regional Round', year: '2025', result: 'Champion', detail: '' },
      { round: 'International Round', year: '2024', result: '19th worldwide', detail: 'Participant' },
      { round: 'National Round', year: '2024', result: 'Champion', detail: 'Gold medal' },
      { round: 'National Round', year: '2023', result: 'Winner', detail: 'Silver medal' }
    ],
    otherResults: [
      { event: 'Fibonacci National Round Bangladesh', category: 'Micromouse', year: '2026', result: 'Champion' },
      { event: 'Fibonacci National Round Bangladesh', category: 'Micromouse', year: '2026', result: '1st runner-up' },
      { event: 'DRMC Science Carnival', category: 'Drone Race', year: '2026', result: '1st runner-up' },
      { event: 'Robotronics Fest', category: 'Micromouse', year: '2025', result: 'Runner-up' },
      { event: 'Robotronics Fest', category: 'Line Following Robot', year: '2025', result: 'Runner-up' },
      { event: '15th DRMC National Science Carnival', category: 'Mini Soccer', year: '2025', result: 'Champion' },
      { event: '15th DRMC National Science Carnival', category: 'Fire Fighter Robot', year: '2025', result: 'Champion' },
      { event: 'UIU CSE Fest', category: 'Line Following Robot', year: '2025', result: '1st runner-up' },
      { event: '4th International Robotech Olympiad', category: 'Line Following Robot', year: '2024', result: 'Champion' },
      { event: 'EWU National RoboFest', category: 'Line Following Robot', year: '2024', result: '1st runner-up' },
      { event: 'Codeavour Bangladesh', category: '', year: '2024', result: 'Winner' },
      { event: 'Init 4.0', category: 'Line Following Robot', year: '', result: 'Runner-up' },
      { event: 'Green University EEE Day', category: 'Line Following Robot', year: '', result: '2nd place' },
      { event: 'OSCILLON, IEEE AUST Student Branch', category: 'Line Following Robot', year: '', result: '2nd place' },
      { event: 'Technomize 1.0, KUET', category: 'Line Following Robot', year: '', result: '1st runner-up' },
      { event: 'Calibration 2.0', category: 'Micromouse', year: '', result: 'Champion' },
      { event: 'Calibration 2.0', category: 'Micromouse', year: '', result: '1st runner-up' },
      { event: 'Calibration 2.0', category: 'Line Following Robot', year: '', result: '1st runner-up' },
      { event: 'Calibration 2.0', category: 'Line Following Robot', year: '', result: '2nd runner-up' }
    ]
  },
  // Replace preview entries with real work. featured selects homepage capsules.
  // Slugs form permanent project URLs. Image paths are relative to public/.
  // Optional details: description, facts, sections, gallery, and links (see README).
  projects: [
    { slug: 'project-01', title: 'Project 01', category: 'Layout preview', summary: 'Project images and a short introduction will be added here.', image: null, featured: true, placeholder: true },
    { slug: 'project-02', title: 'Project 02', category: 'Layout preview', summary: 'Project images and a short introduction will be added here.', image: null, featured: true, placeholder: true },
    { slug: 'project-03', title: 'Project 03', category: 'Layout preview', summary: 'Project images and a short introduction will be added here.', image: null, featured: true, placeholder: true }
  ]
};
