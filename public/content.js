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
  // Comments use public GitHub issues; posting and watching happen on GitHub.
  projectEngagement: {
    commentsRepository: 'RakibulIslam1/portfolio',
    publicSite: 'https://rakibulislam1.github.io/portfolio/'
  },
  // Add real work here. featured selects homepage capsules.
  // Slugs form permanent project URLs. Image paths are relative to public/.
  // Optional details: description, facts, sections, gallery, and links (see README).
  projects: [
    {
      slug: 'mongla-auv',
      title: 'Mongla AUV',
      category: 'Autonomous underwater vehicle',
      summary: 'Seven thrusters. Six degrees of freedom. A custom mixer and a system built from the ground up, from the flight computer to a ROS 2 neural-vision stack.',
      image: { src: './images/Sleek Modular Underwater ROV Render.png', alt: 'Red and metal Mongla AUV vehicle render on black' },
      featured: true,
      description: 'Mongla brings the vehicle, control electronics and onboard software together as one AUV. Low-level motion runs on the flight computer; perception and mission execution run in ROS 2. A custom mixer translates movement commands into the seven-thruster configuration.',
      facts: [
        { label: 'Propulsion', value: '7 thrusters' },
        { label: 'Motion', value: '6 degrees of freedom' },
        { label: 'Autonomy', value: 'ROS 2' }
      ],
      specifications: [
        { heading: 'Compute & perception', facts: [
          { label: 'Onboard computer', value: 'Raspberry Pi 5' },
          { label: 'Neural accelerator', value: 'Hailo-8' },
          { label: 'Detection rate', value: '53.9 Hz · ROS graph, bench' },
          { label: 'Detection latency', value: '18.0 ms median · bench' }
        ] },
        { heading: 'Control & navigation', facts: [
          { label: 'Flight control loop', value: '500 Hz · bench' },
          { label: 'Host control', value: '20–50 Hz · bench' },
          { label: 'Flight-computer link', value: 'MAVLink 2 over USB-C' },
          { label: 'State estimation', value: 'Right-invariant EKF' }
        ] },
        { heading: 'Software & sensing', facts: [
          { label: 'Autonomy framework', value: 'ROS 2' },
          { label: 'Velocity input', value: 'Downward-camera optical flow' },
          { label: 'Tracking', value: 'Detection, coast, geometric anchor' },
          { label: 'Simulation', value: 'Gazebo · BlueROV2 Heavy stand-in' }
        ] }
      ],
      specificationsNote: 'Rates and latency are reported bench measurements from the Mongla technical site, not underwater performance. In-water validation remains pending.',
      model: {
        src: './models/mongla/hull.mgla',
        poster: './models/mongla/hull-poster.webp',
        title: 'Mongla · inspect the hull',
        alt: 'Interactive source CAD of the red Mongla hull, with four tunnel thrusters and one axial nose thruster',
        note: 'Source CAD reference: five thrusters with passive roll. The seven-thruster, six-DOF project configuration described above is specified separately.',
        sourceURL: 'https://fh1m.github.io/mongla_ws/#body',
        measurements: [
          { label: 'CAD length', value: '702.0 mm' },
          { label: 'CAD beam', value: '176.1 mm' },
          { label: 'CAD height', value: '172.1 mm' }
        ]
      },
      sections: [{
        heading: 'From sensing to motion',
        flow: [
          { label: 'Perception', detail: 'Onboard cameras and neural vision, running on a Raspberry Pi 5 with Hailo-8 acceleration.' },
          { label: 'Autonomy', detail: 'ROS 2 connects perception, state estimation and mission commands.' },
          { label: 'Vehicle control', detail: 'MAVLink connects the autonomy stack to the flight computer and custom thruster mixer.' }
        ],
        paragraphs: ['The codebase documents bench and simulation work. In-water validation is still pending.']
      }],
      links: [
        { label: 'Explore the codebase', url: 'https://github.com/RakibulIslam1/mongla_ws' },
        { label: 'Mongla technical site', url: 'https://fh1m.github.io/mongla_ws/' }
      ],
      repository: 'RakibulIslam1/mongla_ws'
    },
    { slug: 'project-01', title: 'Project 01', category: 'Layout preview', summary: 'Project images and a short introduction will be added here.', image: null, featured: true, placeholder: true },
    { slug: 'project-02', title: 'Project 02', category: 'Layout preview', summary: 'Project images and a short introduction will be added here.', image: null, featured: true, placeholder: true },
    { slug: 'project-03', title: 'Project 03', category: 'Layout preview', summary: 'Project images and a short introduction will be added here.', image: null, featured: true, placeholder: true }
  ]
};
