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
    {
      slug: 'lazygo-wro-2025',
      title: 'LazyGo · WRO 2025',
      category: 'Autonomous rover · Future Engineers',
      summary: 'An autonomous WRO rover combining Ackermann steering, LiDAR navigation and a panning camera to complete laps, avoid coloured obstacles and park.',
      image: { src: './images/Lazy Go Rover Studio Render.png', alt: 'Team LazyGo rover studio render with its panning camera, LiDAR and layered chassis' },
      featured: true,
      description: 'LazyBot is Team LazyGo’s autonomous rover for the World Robot Olympiad 2025 Future Engineers category. My work focused on hardware and CAD design, alongside the team’s embedded-electronics and ROS development. The vehicle combines a compact three-deck chassis with range sensing, colour confirmation and odometry for the open and obstacle rounds.',
      facts: [
        { label: 'My contribution', value: 'Hardware & CAD design' },
        { label: 'Challenge', value: 'WRO Future Engineers' },
        { label: 'Team result', value: '6th worldwide · Team LazyGo' }
      ],
      specifications: [
        { heading: 'Chassis & drive', facts: [
          { label: 'Documented footprint', value: '200 × 100 mm' },
          { label: 'Wheelbase', value: '115 mm' },
          { label: 'Documented turning radius', value: 'Below 150 mm' },
          { label: 'Steering & drivetrain', value: 'Ackermann · mechanical differential' },
          { label: 'Drive motor', value: '25GA370 geared motor with encoder' }
        ] },
        { heading: 'Compute & sensing', facts: [
          { label: 'Main computer', value: 'Raspberry Pi 5 · 8 GB' },
          { label: 'Low-level controller', value: 'ESP32' },
          { label: 'Range sensor', value: 'RPLidar C1 · 360° · 10 Hz' },
          { label: 'Orientation', value: 'BNO055 IMU' },
          { label: 'Vision', value: 'Logitech C270 · servo pan' }
        ] },
        { heading: 'Power & actuation', facts: [
          { label: 'Battery', value: '3S LiPo · 11.1 V nominal' },
          { label: 'Compute supply', value: 'Dedicated 5.1 V rail' },
          { label: 'Servo/peripheral supply', value: 'Separate 5 V rail' },
          { label: 'Motor driver', value: 'VNH2SP30' },
          { label: 'Steering & camera servos', value: 'PS1171MG' }
        ] }
      ],
      specificationsNote: 'Dimensions, turning radius and component choices are documented in the team repository. The international placement is the team result recorded in my CV.',
      model: {
        src: './models/lazygo/lazybot.mgla',
        poster: './images/Lazy Go Rover Studio Render.png',
        title: 'LazyBot · inspect the assembly',
        alt: 'Interactive CAD assembly of LazyBot with its four-wheel chassis, stacked electronics, LiDAR and camera head',
        note: 'Onshape car_v2 assembly reference. The export includes a loose component, retained in its original position. The footprint above describes the documented chassis.',
        view: { yaw: 2.45, pitch: 0.26, distance: 2.8 },
        readyLabel: '3D ready · LazyBot assembly',
        sourceURL: 'https://cad.onshape.com/documents/0ec023d9700593bfeebabdea/w/02e5710fbedd7baee1480c4a/e/63f1a3919addf09c73a6e4d6'
      },
      sections: [
        {
          heading: 'Chassis and steering',
          paragraphs: ['The three stacked decks separate the drivetrain and battery from the compute platform and upper electronics. A servo-driven Ackermann linkage gives the front wheels different steering angles, while a mechanical differential lets the rear wheels travel at different speeds. A printed input gear provides a documented 1:1.2 ratio. The low-mounted battery and serviceable decks keep the build compact and accessible.',
            'The upper shell supports the LiDAR about 50 mm above the track. A second servo pans the camera toward a selected obstacle, so the robot can inspect its colour without turning the whole chassis. The main start input is a mechanical switch.']
        },
        {
          heading: 'Navigation and parking',
          paragraphs: ['ROS 2 separates serial communication, perception and driving into individual nodes. For the open round, a modified disparity-extender algorithm reduces each LiDAR ray’s usable distance where neighbouring obstacles would intersect the vehicle’s width, then chooses a clear direction.',
            'In the obstacle round, changes in LiDAR range identify tower candidates and their approximate width. The camera turns toward the target for colour confirmation. Virtual boundaries enforce which side to pass. Motor-encoder distance and BNO055 heading provide odometry for lap tracking and parking alignment; a defined manoeuvre sequence completes the parallel park.']
        },
        {
          heading: 'Electronics and power',
          paragraphs: ['The Raspberry Pi 5 runs high-level navigation, vision and LiDAR processing. The ESP32 handles motor feedback, steering, camera pan, inertial readings and the OLED interface, exchanging commands and telemetry with the Pi over serial.',
            'A 3S battery feeds separate regulated supplies for compute and servo loads. This separation addresses the inrush-current dips that previously caused Pi throttling and ESP32 resets. A custom through-hole integration board brings the controller, IMU, display and connections together using locally available components. The VNH2SP30 drives the geared motor.']
        },
        {
          heading: 'Simulation and team',
          paragraphs: ['The repository includes a Gazebo environment with the robot, track and simulated LiDAR, IMU and camera. Shared ROS 2 nodes let the team develop navigation away from the physical vehicle and move the same logic onto the rover.',
            'Team LazyGo: Rakibul Islam — hardware and CAD design; Iqbal Samin Prithul — embedded electronics; A. N. M. Noor — software and ROS.']
        }
      ],
      gallery: [
        { src: './images/projects/lazygo/front.jpg', alt: 'Front view of the physical LazyBot rover', caption: 'The physical rover · front view' },
        { src: './images/projects/lazygo/right.jpg', alt: 'Right-side view showing the physical LazyBot rover and its stacked chassis', caption: 'Chassis, electronics and sensor placement · right side' }
      ],
      links: [
        { label: 'Explore the codebase', url: 'https://github.com/RakibulIslam1/LazyGo_WRO2025' },
        { label: 'Mechanical design', url: 'https://github.com/RakibulIslam1/LazyGo_WRO2025/blob/main/models/README.md' },
        { label: 'Software documentation', url: 'https://github.com/RakibulIslam1/LazyGo_WRO2025/blob/main/src/README.md' },
        { label: 'Onshape assembly', url: 'https://cad.onshape.com/documents/0ec023d9700593bfeebabdea/w/02e5710fbedd7baee1480c4a/e/63f1a3919addf09c73a6e4d6' }
      ],
      repository: 'RakibulIslam1/LazyGo_WRO2025'
    },
    { slug: 'project-01', title: 'Project 01', category: 'Layout preview', summary: 'Project images and a short introduction will be added here.', image: null, featured: true, placeholder: true },
    { slug: 'project-02', title: 'Project 02', category: 'Layout preview', summary: 'Project images and a short introduction will be added here.', image: null, featured: true, placeholder: true },
    { slug: 'project-03', title: 'Project 03', category: 'Layout preview', summary: 'Project images and a short introduction will be added here.', image: null, featured: true, placeholder: true }
  ]
};
