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
        src: './models/lazygo/lazybot-step.mgla',
        poster: './images/Lazy Go Rover Studio Render.png',
        title: 'LazyBot · inspect the assembly',
        alt: 'Interactive CAD assembly of LazyBot with its four-wheel chassis, stacked electronics, LiDAR and camera head',
        note: 'Onshape car_v2 assembly reference. The footprint above describes the team’s documented chassis design; component positions follow the supplied STEP export.',
        view: { yaw: 2.45, pitch: 0.26, distance: 2.8 },
        loadTimeoutMs: 45000,
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
    // Collection-only additions. The owner will choose future homepage pins.
    {
      slug: 'srot-control-board',
      title: 'SROT Control Board',
      category: 'Embedded flight control',
      summary: 'Hengla flight-control firmware: a 500 Hz ESP32 controller, a Pico 2 thruster co-processor, and onboard attitude and depth control.',
      image: null,
      visual: { label: 'Hengla · control path', nodes: [
        { label: 'ESP32', detail: '500 Hz controller' },
        { label: 'Pico 2', detail: 'DShot + RPM telemetry' },
        { label: '8 thrusters', detail: 'Configured outputs' }
      ] },
      featured: false,
      description: 'The SROT control-board project handles the low-level work between a companion computer and an underwater vehicle: attitude, depth, movement mixing, braking and failsafes. Hengla runs on the ESP32 while a dedicated RP2350 backend handles thruster signalling and RPM feedback. This page covers the controller firmware separately from the Mongla vehicle.',
      facts: [
        { label: 'Control loop', value: '500 Hz configured' },
        { label: 'Thruster outputs', value: '8 vectored channels' },
        { label: 'Firmware', value: 'Hengla v0.2.0' }
      ],
      specifications: [
        { heading: 'Flight controller', facts: [
          { label: 'Processor', value: 'ESP32 DevKit V1' },
          { label: 'Scheduling', value: 'Dual-core FreeRTOS' },
          { label: 'Companion interface', value: 'MAVLink movement commands' }
        ] },
        { heading: 'Sensing', facts: [
          { label: 'Attitude', value: 'BNO085 IMU' },
          { label: 'Depth', value: 'Bar30 / MS5837' },
          { label: 'Controller scope', value: 'Attitude and depth control' }
        ] },
        { heading: 'Thruster backend', facts: [
          { label: 'Co-processor', value: 'RP2350 · Raspberry Pi Pico 2' },
          { label: 'ESC protocol', value: 'Bidirectional DShot with RPM feedback' },
          { label: 'Internal link', value: '1 Mbaud UART' }
        ] }
      ],
      specificationsNote: 'These are firmware configuration values, not a vehicle performance benchmark. The eight-output controller setup is distinct from Mongla’s owner-specified seven-thruster vehicle.',
      sections: [
        { heading: 'From movement intent to motor output', paragraphs: [
          'A companion supplies movement intent over MAVLink. The controller combines this with local sensor feedback, applies the configured control and mixing logic, and passes output to the Pico 2. The separate backend manages timing-sensitive DShot signalling and reports individual thruster RPM.'
        ] },
        { heading: 'Development status', paragraphs: [
          'The repository records water sessions and later control revisions; tuning and hardware validation remain configuration dependent. Full position control is outside the documented scope. RPM feedback is available, but closed-loop RPM setpoint mode is disabled by default. The firmware uses a generic submarine MAVLink identity and is not ArduSub.'
        ] }
      ],
      links: [
        { label: 'Source repository', url: 'https://github.com/RakibulIslam1/srot-control-board' },
        { label: 'Configuration & revision notes', url: 'https://github.com/RakibulIslam1/srot-control-board/blob/f1d3ba92667b7fd25010bcbab155de4184b9f9ea/include/config.h' },
        { label: 'Companion communication contract', url: 'https://github.com/RakibulIslam1/srot-control-board/blob/f1d3ba92667b7fd25010bcbab155de4184b9f9ea/JETSON_COMMS.md' }
      ],
      repository: 'RakibulIslam1/srot-control-board'
    },
    {
      slug: 'indur-ui',
      title: 'IndurUI',
      category: 'Embedded interface library',
      summary: 'Live robot telemetry, icon menus and persistent settings on a small OLED, controlled with two or three buttons.',
      image: { src: './images/projects/indur-ui/dashboard.png', alt: 'IndurUI OLED dashboard framebuffer with demonstration telemetry and sensor bars' },
      featured: false,
      description: 'IndurUI is a C++11 interface library for robots with small monochrome displays. A dashboard binds directly to live variables; nested menus and staged settings editors let the same few buttons handle monitoring and configuration. Display adapters keep the interface core separate from the OLED driver.',
      facts: [
        { label: 'Library', value: 'C++11 · v1.3.0' },
        { label: 'Input', value: '2 or 3 buttons' },
        { label: 'Example display', value: '128 × 64 OLED' }
      ],
      specifications: [
        { heading: 'Interface', facts: [
          { label: 'Telemetry', value: 'Live variable bindings and adaptive pages' },
          { label: 'Navigation', value: 'Nested icon and list menus' }
        ] },
        { heading: 'Hardware adapters', facts: [
          { label: 'Display drivers', value: 'SSD1306 / SH1106 · Adafruit GFX' },
          { label: 'Compile-tested baselines', value: 'ESP32-S3 and Arduino Mega 2560' }
        ] },
        { heading: 'Settings & tooling', facts: [
          { label: 'Persistence', value: 'Stable keys, CRC checks and two journal banks' },
          { label: 'Bitmap Studio', value: 'Local conversion, pixel editing and header export' }
        ] }
      ],
      sections: [
        { heading: 'Small screen, useful controls', paragraphs: [
          'The same interface can expose changing sensor values, a page of actions and editable configuration without requiring a touchscreen. Settings are staged before saving. The browser-based Bitmap Studio prepares artwork for Arduino headers, while OLED Lab shows the rendered display states.'
        ] },
        { heading: 'Compatibility', paragraphs: [
          'The published compatibility baseline is compile-tested, rather than hardware certification. Classic Uno/Nano and ATmega32U4 boards are unsupported. The journal detects invalid records, but it does not guarantee recovery from an interrupted flash-sector erase.'
        ] }
      ],
      gallery: [
        { src: './images/projects/indur-ui/menu.png', alt: 'IndurUI icon-menu framebuffer', caption: 'Icon menu · real framebuffer capture with fixed demonstration values.' },
        { src: './images/projects/indur-ui/editor.png', alt: 'IndurUI settings-editor framebuffer', caption: 'Settings editor · rendered interface capture, not a photograph of a display.' }
      ],
      links: [
        { label: 'Source repository', url: 'https://github.com/RakibulIslam1/indur-ui' },
        { label: 'Bitmap Studio & OLED Lab', url: 'https://rakibulislam1.github.io/indur-ui/' },
        { label: 'Compatibility notes', url: 'https://github.com/RakibulIslam1/indur-ui/blob/0ec27926e6886d912b29a09338d0457d19ebdae3/docs/COMPATIBILITY.md' }
      ],
      repository: 'RakibulIslam1/indur-ui'
    },
    {
      slug: 'indur-micromouse',
      title: 'Indur V4',
      category: 'Micromouse robotics',
      summary: 'An ESP32-S3 micromouse combining infrared wall sensing, magnetic wheel feedback and flood-fill maze navigation.',
      image: { src: './images/projects/indur/v4.jpeg', alt: 'The physical Indur V4 micromouse with its OLED, three buttons and blue chassis' },
      featured: false,
      description: 'Indur V4 brings maze sensing, wheel feedback and route storage onto a compact two-wheel robot. Its firmware searches a grid with flood fill, saves maze and route information, and supports route verification and subsequent runs. An onboard OLED and three buttons provide setup and sensor inspection without a connected computer.',
      facts: [
        { label: 'Controller', value: 'ESP32-S3' },
        { label: 'Maze search', value: '13 × 13 flood fill' },
        { label: 'Wheel feedback', value: 'Dual AS5600 encoders' }
      ],
      specifications: [
        { heading: 'Sensing & drive', facts: [
          { label: 'Wall sensors', value: '5 IR channels; L/F/R used in navigation' },
          { label: 'Motor driver', value: 'L293D · two independent wheels' },
          { label: 'Encoder resolution', value: '4,096 counts per revolution' }
        ] },
        { heading: 'Configured geometry', facts: [
          { label: 'Cell pitch', value: '180 mm' },
          { label: 'Wheel diameter', value: '35.5 mm' },
          { label: 'Track width', value: '63 mm' }
        ] },
        { heading: 'Onboard tools', facts: [
          { label: 'Interface', value: '128 × 64 SSD1306 OLED · 3 buttons' },
          { label: 'Storage', value: '1,024-byte EEPROM emulation' },
          { label: 'Build environment', value: 'Arduino / PlatformIO' }
        ] }
      ],
      specificationsNote: 'Geometry values are firmware defaults. They do not establish measured navigation accuracy, speed or a competition result.',
      sections: [
        { heading: 'Wall sensing and wheel feedback', paragraphs: [
          'The firmware samples five infrared channels, with left, front and right readings driving the released navigation logic. Diagonal channels remain visible on the sensor screen. The two AS5600 encoders share a fixed device address, so each uses its own 400 kHz I²C bus.'
        ] },
        { heading: 'Search, save and run', paragraphs: [
          'Flood-fill search builds the maze representation. Stored routes can be checked and run again, while settings, maze data and routes persist in EEPROM emulation. The linked repository documents earlier hardware generations as well; the firmware and photograph presented here are V4.'
        ] }
      ],
      links: [
        { label: 'Source repository & build history', url: 'https://github.com/RakibulIslam1/indur' },
        { label: 'V4 hardware configuration', url: 'https://github.com/RakibulIslam1/indur/blob/c034ab56313ba0a9937524ca012f7fd82c3bf037/src/15.h' }
      ],
      repository: 'RakibulIslam1/indur'
    },
    {
      slug: 'wro-2024-mayerdoa-robotics',
      title: 'SMOKI · WRO 2024',
      category: 'Autonomous vehicle · MAYERDOA Robotics',
      summary: 'A WRO Future Engineers vehicle using camera navigation, ultrasonic sensing and servo steering on a modular LEGO chassis.',
      image: { src: './images/projects/wro-2024/front.jpg', alt: 'Front view of the MAYERDOA Robotics SMOKI competition vehicle' },
      featured: false,
      description: 'SMOKI combines Raspberry Pi vision processing with ESP32 motor, steering and sensor control for the WRO Future Engineers challenge. A LEGO Technic chassis, custom electronics and printed mounts make the vehicle serviceable as its camera, sensors and software evolve.',
      facts: [
        { label: 'Team', value: 'MAYERDOA Robotics' },
        { label: 'Event', value: 'WRO 2024 · Future Engineers' },
        { label: 'International result', value: '19th · Participant' }
      ],
      specifications: [
        { heading: 'Compute & vision', facts: [
          { label: 'Processing', value: 'Raspberry Pi + ESP32' },
          { label: 'Vision', value: 'Python / OpenCV' },
          { label: 'Image processing', value: 'HSV masks, contours and line detection' }
        ] },
        { heading: 'Vehicle mechanics', facts: [
          { label: 'Chassis', value: 'LEGO Technic with printed mounts' },
          { label: 'Front steering', value: 'Servo-operated rack and pinion' },
          { label: 'Rear axle', value: 'Mechanical differential gearbox' }
        ] },
        { heading: 'Local control', facts: [
          { label: 'Compute link', value: 'Serial communication' },
          { label: 'Range sensing', value: 'Ultrasonic' },
          { label: 'Corrections', value: 'PID-based wall-distance control' }
        ] }
      ],
      specificationsNote: 'The standing is the CV-backed 2024 team result. Three-lap navigation and obstacle handling describe the challenge objectives, not a claimed measured success rate.',
      sections: [
        { heading: 'Vision and steering', paragraphs: [
          'The Raspberry Pi processes camera frames using colour masks, contours, Canny edges and Hough lines. Serial messages pass steering information to the ESP32, which handles local actuation and ultrasonic corrections. Steering comes from the front rack; the rear mechanical differential allows unequal wheel speeds in a turn.'
        ] },
        { heading: 'Team contributions', paragraphs: [
          'Rakibul Islam — team leader and primary hardware developer. Anas Bin Azim — software and hardware. Mohiuddin Sami — primary software developer. These credits follow the project repository.'
        ] }
      ],
      gallery: [
        { src: './images/projects/wro-2024/top.jpg', alt: 'Top view of SMOKI showing the mounted computer, electronics and LEGO chassis', caption: 'Physical build · top view from the WRO 2024 repository.' }
      ],
      links: [
        { label: 'Source repository', url: 'https://github.com/RakibulIslam1/wro_2024_MAYERDOA_ROBOTICS' },
        { label: 'Software setup', url: 'https://github.com/RakibulIslam1/wro_2024_MAYERDOA_ROBOTICS/blob/a0e9a7fe3bb8dfd6717a679607b0f3711a1c582e/Software-Setup/README.md' }
      ],
      repository: 'RakibulIslam1/wro_2024_MAYERDOA_ROBOTICS'
    },
    {
      slug: 'web-controller',
      title: 'WebController',
      category: 'ESP32 browser control',
      summary: 'A configurable browser controller with ten buttons, two sliders and two multitouch joysticks, served directly by an ESP32.',
      image: { src: './images/projects/web-controller/controller.jpeg', alt: 'Actual ESP32 WebSocket Controller interface with ten buttons, two sliders and two joysticks' },
      featured: false,
      description: 'WebController turns a phone or computer browser into an input panel for an ESP32 project. The Arduino library serves its controller and settings pages from SPIFFS, receives input over WebSocket, and exposes button, slider and joystick values to the device sketch.',
      facts: [
        { label: 'Buttons', value: '10 · push or toggle' },
        { label: 'Sliders', value: '2 configurable ranges' },
        { label: 'Joysticks', value: '2 · multitouch input' }
      ],
      specifications: [
        { heading: 'On the device', facts: [
          { label: 'Platform', value: 'ESP32 / Arduino' },
          { label: 'Page storage', value: 'SPIFFS' },
          { label: 'Transport', value: 'ESPAsyncWebServer + WebSocket' }
        ] },
        { heading: 'In the browser', facts: [
          { label: 'Customisation', value: 'Control names, button types and ranges' },
          { label: 'Touch input', value: 'Simultaneous joystick control' },
          { label: 'Display', value: 'Optional full-screen mode' }
        ] },
        { heading: 'Sketch integration', facts: [
          { label: 'Inputs', value: 'Button state, slider value, joystick axes' },
          { label: 'Saved settings', value: 'Browser local storage + ESP32 EEPROM' },
          { label: 'Example', value: 'Push/toggle control of an LED' }
        ] }
      ],
      sections: [
        { heading: 'Configure once, reuse the controller', paragraphs: [
          'The settings page changes labels, input modes and ranges without rebuilding the visual interface. Browser settings survive refreshes, while the ESP32’s EEPROM stores the shared device configuration. The repository includes basic and LED-control examples for connecting those inputs to a sketch.'
        ] },
        { heading: 'Project scope & attribution', paragraphs: [
          'This is a local ESP32 control library, not a hosted remote-control service. The image is the original interface screenshot linked in its README. WebController is by Rakibul Islam and is published under CC BY-NC 4.0; the linked license records its terms.'
        ] }
      ],
      links: [
        { label: 'Source repository & examples', url: 'https://github.com/RakibulIslam1/WebController' },
        { label: 'Arduino interface', url: 'https://github.com/RakibulIslam1/WebController/blob/0e6469cdea626d34dbf3f72d37851f6399fa3003/src/web_controller.h' },
        { label: 'CC BY-NC 4.0 license', url: 'https://github.com/RakibulIslam1/WebController/blob/0e6469cdea626d34dbf3f72d37851f6399fa3003/LICENSE.txt' }
      ],
      repository: 'RakibulIslam1/WebController'
    },
    {
      slug: 'scholarspilot',
      title: 'ScholarsPilot',
      category: 'Android · student money management',
      summary: 'A student money companion connecting reviewed financial records, Bangla and English voice entry, and a practical monthly plan.',
      image: { src: './images/projects/scholarspilot/app-icon.png', alt: 'ScholarsPilot app icon' },
      detailImage: { src: './images/projects/scholarspilot/cover.png', alt: 'ScholarsPilot product overview with actual Android pilot screens and private financial values hidden' },
      featured: false,
      description: 'ScholarsPilot helps students turn scattered financial records into a clearer daily plan. Supported messages, optional wallet alerts and manual entries feed a reviewed record of spending. Students can add a reason by text or voice, review AI wording and category suggestions, and plan around education, housing and everyday costs.',
      facts: [
        { label: 'Release', value: 'Android pilot · 1.0.0 build 9' },
        { label: 'Platform', value: 'Android 7.0+ · ARM64' },
        { label: 'Voice entry', value: 'Bangla & English' }
      ],
      specifications: [
        { heading: 'Native application', facts: [
          { label: 'Client', value: 'Expo / React Native / Expo Router' },
          { label: 'Android integration', value: 'Kotlin alerts and home-screen widget' }
        ] },
        { heading: 'Records & identity', facts: [
          { label: 'API', value: 'Next.js / TypeScript over HTTPS' },
          { label: 'Data & authentication', value: 'PostgreSQL, Prisma and Firebase' }
        ] },
        { heading: 'Planning & assistance', facts: [
          { label: 'Financial calculations', value: 'Deterministic minor-unit arithmetic' },
          { label: 'Language assistance', value: 'Groq-hosted AI · reviewable suggestions' }
        ] }
      ],
      sections: [
        { heading: 'From records to a monthly plan', paragraphs: [
          'The monthly view protects remaining essentials and a cushion before estimating daily spending room. Expected income stays separate from funds already recorded. Original transaction currencies are retained, with dated reference conversions for reports. A configurable Android widget brings selected money information onto the home screen.'
        ] },
        { heading: 'Pilot availability', paragraphs: [
          'The public showcase provides a signed Android pilot, installation guidance and the engineering case study. Implementation source remains private. SMS, microphone and notification permissions are optional; manual entry remains available. The app records and explains money activity—it does not hold funds, initiate payments or provide a bank-verified live balance.',
          'The pilot is intended for students in Bangladesh aged 13+, with guardian approval under 18. Wider phone and message-format validation remains open, and hosted services have availability and quota limits. The screenshots are actual Pixel 6a / Android 16 captures; the description example was left unsaved.'
        ] }
      ],
      gallery: [
        { src: './images/projects/scholarspilot/home.png', alt: 'ScholarsPilot Home screen with personal financial values hidden', caption: 'Home · recorded activity and daily planning.', presentation: 'screen' },
        { src: './images/projects/scholarspilot/monthly-plan.png', alt: 'ScholarsPilot monthly plan screen with private values hidden', caption: 'Monthly plan · essentials, cushion and expected income.', presentation: 'screen' }
      ],
      links: [
        { label: 'Public showcase', url: 'https://github.com/RakibulIslam1/scholarspilot-downloads' },
        { label: 'Android pilot & release notes', url: 'https://github.com/RakibulIslam1/scholarspilot-downloads/releases/tag/pilot-1.0.0-9' },
        { label: 'Product & engineering case study', url: 'https://github.com/RakibulIslam1/scholarspilot-downloads/blob/56df8a9b82eef1a2de646d875425cda6f195b623/docs/ScholarsPilot_Public_Report.md' },
        { label: 'Privacy & permissions', url: 'https://github.com/RakibulIslam1/scholarspilot-downloads/blob/56df8a9b82eef1a2de646d875425cda6f195b623/docs/Privacy_and_Permissions.md' }
      ],
      repository: 'RakibulIslam1/scholarspilot-downloads'
    },
    {
      slug: 'srot-esc-flasher',
      title: 'SROT ESC Flasher',
      category: 'Embedded firmware tooling',
      summary: 'An ESP32 BLHeli 4-way interface for reading, configuring and flashing Bluejay onto up to four BLHeli_S ESCs.',
      image: null,
      visual: { label: 'ESC firmware path', nodes: [
        { label: 'Browser', detail: 'ESC Configurator' },
        { label: 'ESP32', detail: 'BLHeli 4-way interface' },
        { label: '4 ESCs', detail: 'BLHeli_S / Bluejay' }
      ] },
      featured: false,
      description: 'This tool prepares compatible ESCs for the SROT thruster system. An ESP32 sits between the browser-based ESC Configurator and the ESC signal wires, providing the BLHeli 4-way interface needed to inspect settings and write Bluejay firmware.',
      facts: [
        { label: 'Interface device', value: 'ESP32 DevKit V1' },
        { label: 'ESC channels', value: 'Up to 4' },
        { label: 'Target firmware', value: 'Bluejay · BLHeli_S' }
      ],
      specifications: [
        { heading: 'Connection', facts: [
          { label: 'Host interface', value: 'esc-configurator.com' },
          { label: 'ESC signals', value: 'GPIO 16–19' }
        ] },
        { heading: 'Transport', facts: [
          { label: 'Protocol', value: 'BLHeli 4-way' },
          { label: 'ESC link', value: 'Single-pin half-duplex, bit-banged' }
        ] },
        { heading: 'Diagnostics', facts: [
          { label: 'Build targets', value: 'Standard and diagnostic · PlatformIO' },
          { label: 'Console', value: '115,200 baud' }
        ] }
      ],
      sections: [
        { heading: 'A separate job from flight control', paragraphs: [
          'The flasher handles ESC setup and firmware maintenance. Bluejay supplies the bidirectional DShot telemetry used by the control-board backend; the flasher itself does not run the vehicle control loop. Diagnostic tooling inspects the handshake, bootloader family and memory layout when bringing up a compatible ESC.'
        ] },
        { heading: 'Implementation credit', paragraphs: [
          'The included esp32_4way implementation derives from BrushlessPower/BlHeli-Passthrough and retains a GPL v3 license. Refer to the repository’s flashing workflow for supported hardware and preparation details.'
        ] }
      ],
      links: [
        { label: 'Source repository', url: 'https://github.com/RakibulIslam1/srot-esc-flasher' },
        { label: 'Flashing workflow', url: 'https://github.com/RakibulIslam1/srot-esc-flasher/blob/c30b843be4f7ffdf4eddaf360af30e1237712d01/docs/ESC_FLASHING.md' },
        { label: 'Upstream implementation license', url: 'https://github.com/RakibulIslam1/srot-esc-flasher/blob/c30b843be4f7ffdf4eddaf360af30e1237712d01/src/esp32_4way/LICENSE' }
      ],
      repository: 'RakibulIslam1/srot-esc-flasher'
    },
    {
      slug: 'srot-ground-station',
      title: 'SROT Ground Station',
      category: 'Desktop robotics software',
      summary: 'Bondor: a desktop ground station for SROT telemetry, vehicle setup and control tuning, with an ESP32-C3 LoRa receiver.',
      image: null,
      visual: { label: 'LoRa telemetry · receive only', nodes: [
        { label: 'SROT', detail: 'Vehicle telemetry' },
        { label: 'LoRa bridge', detail: 'ESP32-C3 + SX127x' },
        { label: 'Bondor', detail: 'Desktop ground station' }
      ] },
      featured: false,
      description: 'Bondor is the desktop side of the SROT system: live vehicle readings, piloting controls, parameter editing and tuning tools in one Electron application. The repository also contains the ESP32-C3 LoRa-to-MAVLink bridge for receiving vehicle telemetry.',
      facts: [
        { label: 'Application', value: 'Bondor · Electron' },
        { label: 'Vehicle protocol', value: 'MAVLink 2' },
        { label: 'Radio bridge', value: 'Receive-only telemetry' }
      ],
      specifications: [
        { heading: 'Desktop stack', facts: [
          { label: 'Interface', value: 'React / TypeScript / MUI' },
          { label: 'Vehicle links', value: 'USB serial and UDP' },
          { label: 'Default settings', value: '115,200 baud · UDP 14550' }
        ] },
        { heading: 'Operator tools', facts: [
          { label: 'Movement input', value: 'Piloting console and gamepad' },
          { label: 'Setup', value: 'Parameters, sensors and motors' },
          { label: 'Inspection', value: 'PID/autotune tools and CSV telemetry' }
        ] },
        { heading: 'Documented radio setup', facts: [
          { label: 'Hardware', value: 'ESP32-C3 + SX127x' },
          { label: 'RF configuration', value: '433 MHz · 250 kHz bandwidth' },
          { label: 'Modulation settings', value: 'SF7 · coding rate 4:5' }
        ] }
      ],
      sections: [
        { heading: 'Configuration with feedback', paragraphs: [
          'Parameter restore previews the differences before applying changes and checks the controller’s parameter echoes, with retries. Export waits for the full parameter list. Live telemetry inspection, sensor calibration, motor setup and CSV recording support the work around a tuning session.'
        ] },
        { heading: 'Current boundaries', paragraphs: [
          'The LoRa bridge receives telemetry; it is not a wireless control uplink. The mission editor and LoRa round-trip path are queued, and the reserved BlueOS MAVLink2Rest transport is not a shipped connection. Bondor runs as a desktop application rather than a browser-hosted ground station.'
        ] }
      ],
      links: [
        { label: 'Source repository', url: 'https://github.com/RakibulIslam1/srot-ground-station' },
        { label: 'Bondor application documentation', url: 'https://github.com/RakibulIslam1/srot-ground-station/blob/1adc14c8037ec6821fb279b1abb5a23ff0e571a8/bondor/README.md' }
      ],
      repository: 'RakibulIslam1/srot-ground-station'
    },
    { slug: 'project-01', title: 'Project 01', category: 'Layout preview', summary: 'Project images and a short introduction will be added here.', image: null, featured: true, placeholder: true },
    { slug: 'project-02', title: 'Project 02', category: 'Layout preview', summary: 'Project images and a short introduction will be added here.', image: null, featured: true, placeholder: true },
    { slug: 'project-03', title: 'Project 03', category: 'Layout preview', summary: 'Project images and a short introduction will be added here.', image: null, featured: true, placeholder: true }
  ]
};
