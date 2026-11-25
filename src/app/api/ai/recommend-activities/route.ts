import { NextResponse } from "next/server";
import { type ActivityStep } from "@/lib/firestore-service";

export interface PersonalizedActivityOption {
  id: string;
  title: string;
  description: string;
  learningOutcome: string;
  estimatedDuration: string;
  categories: string[];
  stages: string[];
  whySuggested: string;
  steps: ActivityStep[];
}

// =============================================================================
// COMPLETE MULTI-STAGE DYNAMIC ACTIVITY BANK (FOR ALL ACADEMIC STAGES)
// Used directly when Gemini API key is missing or as a reliable pedagogical fallback
// =============================================================================

const DYNAMIC_AI_ACTIVITY_BANK: PersonalizedActivityOption[] = [
  // ---------------------------------------------------------------------------
  // 1. CLASSES 4–7: Fun, playful, drawing, observation, small experiments, puzzles
  // ---------------------------------------------------------------------------
  {
    id: "act_comic_story",
    title: "Create a 3-Scene Adventure Story Comic",
    description: "Design and write a short three-panel adventure story comic featuring original characters solving a creative mystery.",
    learningOutcome: "Storytelling structure, character design, creative writing, and visual narrative planning.",
    estimatedDuration: "20 mins",
    categories: ["Creativity & Media", "Stories & Imagination"],
    stages: ["classes-4-7"],
    whySuggested: "Matches your passion for creative ideas, drawing, and imaginative storytelling.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Create Your Characters", instruction: "Choose two characters and give each one a name and unique personality or special quality." },
      { id: "step-2", stepNumber: 2, title: "Discover the Mystery", instruction: "Think of a small mystery, puzzle, or challenge that your characters need to solve together." },
      { id: "step-3", stepNumber: 3, title: "Draft Three Scenes", instruction: "Draw or describe three scenes: the beginning situation, the surprising clue, and the solution." },
      { id: "step-4", stepNumber: 4, title: "Solve the Mystery", instruction: "Decide how your characters solve the problem using their teamwork and creative qualities." },
      { id: "step-5", stepNumber: 5, title: "Reflect on Your Story", instruction: "Write one thing you learned about storytelling or what you enjoyed most about creating your comic." },
    ],
  },
  {
    id: "act_cardboard_machine",
    title: "Design a Smart Invention Blueprint on Paper",
    description: "Invent a clever household machine or robot that automates a daily chore using simple mechanics and sensors.",
    learningOutcome: "Design thinking, mechanical logic, problem decomposition, and practical prototyping.",
    estimatedDuration: "20 mins",
    categories: ["Technology & Building", "Creativity & Media", "Problem Solving"],
    stages: ["classes-4-7"],
    whySuggested: "Builds on your interest in tinkering, machines, and discovering how tools work.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Identify a Real Chore", instruction: "Pick one repetitive household chore (like sorting shoes, watering plants, or folding clothes) to solve." },
      { id: "step-2", stepNumber: 2, title: "Sketch 2 Mechanism Ideas", instruction: "Sketch two different ways a mechanical tool or sensor could help make this chore effortless." },
      { id: "step-3", stepNumber: 3, title: "Draw Labeled Blueprint", instruction: "Draw a detailed diagram of your favorite idea, labeling the power source, motor or lever, and sensors." },
      { id: "step-4", stepNumber: 4, title: "List Everyday Materials", instruction: "List everyday recyclable materials (cardboard, rubber bands, straws) you could use to build a mockup." },
      { id: "step-5", stepNumber: 5, title: "Test with a User", instruction: "Explain your blueprint to a family member or friend and note one improvement they suggested." },
    ],
  },
  {
    id: "act_secret_cipher",
    title: "Crack the Secret Cipher: Build & Decode Secret Codes",
    description: "Learn how secret agents and computers encrypt messages by creating your own Caesar cipher wheel and decoding clues.",
    learningOutcome: "Cryptographic logic, pattern recognition, systematic problem solving, and encoding.",
    estimatedDuration: "20 mins",
    categories: ["Logic & Problem Solving", "Technology & Building", "Science & Discovery"],
    stages: ["classes-4-7"],
    whySuggested: "Challenges your logical thinking and shows how information security works in code.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Draw Concentric Alphabet Wheels", instruction: "Draw two concentric circles on paper, writing letters A to Z around both rims." },
      { id: "step-2", stepNumber: 2, title: "Choose a Shift Key Number", instruction: "Rotate the inner circle by a secret number (e.g., 3 letters to the right) to set your key." },
      { id: "step-3", stepNumber: 3, title: "Encrypt a 5-Word Mystery Message", instruction: "Translate a secret sentence letter-by-letter using your cipher wheel alignment." },
      { id: "step-4", stepNumber: 4, title: "Write Decoding Instructions", instruction: "Provide a subtle clue or riddle that reveals the secret shift key to the solver." },
      { id: "step-5", stepNumber: 5, title: "Test with a Partner", instruction: "Hand the encrypted note to a friend or family member and see if they can crack it!" },
    ],
  },
  {
    id: "act_nature_journal",
    title: "Neighborhood Biodiversity & Nature Field Journal",
    description: "Step outside to observe, document, and categorize plant varieties and wildlife in your local habitat.",
    learningOutcome: "Ecological observation, species categorization, environmental awareness, and field notes documentation.",
    estimatedDuration: "20 mins",
    categories: ["Nature & Environment", "Science & Discovery"],
    stages: ["classes-4-7"],
    whySuggested: "Encourages keen observation of living ecosystems in your everyday surroundings.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Select an Observation Spot", instruction: "Find a quiet balcony, garden patch, or nearby tree to observe for 10 minutes." },
      { id: "step-2", stepNumber: 2, title: "Sketch 2 Distinct Plants or Leaves", instruction: "Draw leaf venation patterns and record color variations with close attention." },
      { id: "step-3", stepNumber: 3, title: "Log Animal or Insect Activity", instruction: "Record any birds, ants, bees, or butterflies and note what they are doing." },
      { id: "step-4", stepNumber: 4, title: "Record Weather & Environment Notes", instruction: "Note the sunlight, temperature feel, soil moisture, and time of day." },
      { id: "step-5", stepNumber: 5, title: "Reflect on Ecological Connections", instruction: "Write one way the plants and creatures you observed support each other." },
    ],
  },
  {
    id: "ai_act_clay_animation",
    title: "Animate a 10-Second Stop-Motion Story",
    description: "Create a micro-animation using simple clay, paper cutouts, or household objects to bring a character to life.",
    learningOutcome: "Animation fundamentals, visual pacing, frame composition, and persistence of vision.",
    estimatedDuration: "25 mins",
    categories: ["Creativity & Media", "Stories & Imagination"],
    stages: ["classes-4-7"],
    whySuggested: "Hands-on creative challenge that turns your drawing and storytelling into motion.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Mold or Cut Your Character", instruction: "Create a simple character out of clay, paper, or small toys with distinct features." },
      { id: "step-2", stepNumber: 2, title: "Set Up a Stable Stage", instruction: "Set a sheet of colored paper on a table with a phone or camera propped steadily." },
      { id: "step-3", stepNumber: 3, title: "Plan 3 Key Actions", instruction: "Decide on one simple movement: jumping, waving, or finding a hidden treasure." },
      { id: "step-4", stepNumber: 4, title: "Snap 8–12 Micro-Movements", instruction: "Move your character slightly and take a photo for each tiny movement." },
      { id: "step-5", stepNumber: 5, title: "Playback & Add Sound Effect", instruction: "Scroll quickly through the photos or use a free stop-motion app to watch it move!" },
    ],
  },
  {
    id: "ai_act_origami_architecture",
    title: "Fold an Origami Geometric Pavilion",
    description: "Design an architectural canopy or futuristic shelter using mathematical paper folding and structural tessellations.",
    learningOutcome: "Spatial geometry, origami mathematics, architectural form-finding, and structural balance.",
    estimatedDuration: "20 mins",
    categories: ["Creativity & Media", "Technology & Building"],
    stages: ["classes-4-7"],
    whySuggested: "Connects your creative artistic sense with engineering and geometric patterns.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Prepare Square Sheets", instruction: "Cut three square sheets of paper of equal size." },
      { id: "step-2", stepNumber: 2, title: "Fold Mountain & Valley Creases", instruction: "Fold diagonal and accordion pleats to create flexible spring-like paper modules." },
      { id: "step-3", stepNumber: 3, title: "Interlock Without Glue", instruction: "Slot the paper folds together to form a self-standing arch or dome canopy." },
      { id: "step-4", stepNumber: 4, title: "Test Load Strength", instruction: "Carefully place an eraser or light coin on top to see if the structure holds weight." },
      { id: "step-5", stepNumber: 5, title: "Sketch Architecture Labels", instruction: "Give your pavilion a name and sketch where visitors would walk under it." },
    ],
  },
  {
    id: "ai_act_leaf_pigment_chromatography",
    title: "Extract Hidden Colors from Green Leaves",
    description: "Use kitchen coffee filters and warm water to separate the hidden yellow, orange, and green pigments in fresh leaves.",
    learningOutcome: "Plant chemistry, paper chromatography, capillary action, and photosynthesis biology.",
    estimatedDuration: "20 mins",
    categories: ["Nature & Environment", "Science & Discovery"],
    stages: ["classes-4-7"],
    whySuggested: "Reveals the secret plant chemistry hidden in plain sight in everyday greenery.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Collect 2 Different Leaves", instruction: "Gather green leaves from two different garden plants or fallen tree leaves." },
      { id: "step-2", stepNumber: 2, title: "Crush Leaves in a Cup", instruction: "Tear the leaves into small shreds and gently mash them with the back of a spoon." },
      { id: "step-3", stepNumber: 3, title: "Cut Paper Filter Strips", instruction: "Cut a long strip of coffee filter paper or kitchen paper towel." },
      { id: "step-4", stepNumber: 4, title: "Dip & Watch Capillary Action", instruction: "Dip the bottom tip into the leaf juice and watch colored bands travel up the paper." },
      { id: "step-5", stepNumber: 5, title: "Record Pigment Bands", instruction: "Note how many distinct colors (chlorophyll green, carotene orange) separated." },
    ],
  },
  {
    id: "ai_act_bird_feeder_design",
    title: "Build a Recycled Eco-Friendly Bird Feeder",
    description: "Engineer an outdoor bird feeding station using clean recycled cartons or plastic bottles and observe local wildlife.",
    learningOutcome: "Ecological design, animal observation, upcycling engineering, and habitat stewardship.",
    estimatedDuration: "25 mins",
    categories: ["Nature & Environment", "Technology & Building"],
    stages: ["classes-4-7"],
    whySuggested: "Lets you support local biodiversity through practical, hands-on maker skills.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Pick a Clean Recycled Container", instruction: "Find a clean milk carton, plastic bottle, or coconut shell." },
      { id: "step-2", stepNumber: 2, title: "Cut Feeding Perches", instruction: "Cut two small feeding windows 2 inches from the base with safety scissors." },
      { id: "step-3", stepNumber: 3, title: "Insert Wooden Perch Sticks", instruction: "Push two wooden sticks or unsharpened pencils through beneath the windows for birds to stand." },
      { id: "step-4", stepNumber: 4, title: "Fill with Grains or Seeds", instruction: "Pour bird seed, millet, or crushed grains into the feeder." },
      { id: "step-5", stepNumber: 5, title: "Hang Outside & Keep a Log", instruction: "Tie string to the top and hang from a balcony or tree branch; log the first visitor!" },
    ],
  },
  {
    id: "ai_act_density_rainbow_column",
    title: "Create a 4-Layer Liquid Density Rainbow",
    description: "Layer honey, dish soap, water, and vegetable oil to observe how fluids of different densities stack without mixing.",
    learningOutcome: "Liquid density, mass-to-volume ratio, immiscibility, and experimental observation.",
    estimatedDuration: "20 mins",
    categories: ["Science & Discovery", "Problem Solving"],
    stages: ["classes-4-7"],
    whySuggested: "A colorful, memorable physics and chemistry experiment made with safe kitchen items.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Gather 4 Safe Liquids", instruction: "Prepare small amounts of honey or syrup, dish soap, colored water, and cooking oil." },
      { id: "step-2", stepNumber: 2, title: "Pour the Heaviest Base", instruction: "Pour 2 spoonfuls of honey into a tall clear glass without touching the sides." },
      { id: "step-3", stepNumber: 3, title: "Layer Along the Glass Edge", instruction: "Slowly trickle dish soap down the inside wall of the glass on top of the honey." },
      { id: "step-4", stepNumber: 4, title: "Add Water and Oil Layers", instruction: "Gently add food-colored water, followed by cooking oil on top." },
      { id: "step-5", stepNumber: 5, title: "Float Test Objects", instruction: "Drop a metal paperclip, grape, and plastic cap to see where each settles!" },
    ],
  },
  {
    id: "ai_act_constellation_viewer",
    title: "Build a Pocket Starlight Constellation Projector",
    description: "Map real astronomical constellations using a flashlight and a paper cup with pinhole star coordinates.",
    learningOutcome: "Astronomical coordinates, stellar navigation, light projection optics, and night sky mythology.",
    estimatedDuration: "20 mins",
    categories: ["Science & Discovery", "Creativity & Media"],
    stages: ["classes-4-7"],
    whySuggested: "Brings outer space and stargazing into your room with a simple optical tool.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Choose a Constellation", instruction: "Pick an iconic constellation like Orion, Ursa Major, or Cassiopeia." },
      { id: "step-2", stepNumber: 2, title: "Draw Star Pattern on Cup Bottom", instruction: "Mark the relative star positions on the bottom of an upside-down paper cup." },
      { id: "step-3", stepNumber: 3, title: "Poke Pinhole Stars", instruction: "Use a pushpin to punch clean holes through the cup bottom at each star mark." },
      { id: "step-4", stepNumber: 4, title: "Project in a Dark Room", instruction: "Place a phone flashlight inside the cup and project the constellation onto a wall." },
      { id: "step-5", stepNumber: 5, title: "Learn the Constellation Tale", instruction: "Discover the origin story or ancient navigation purpose of your constellation." },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. CLASSES 8–10: Practical challenges, creative projects, tech, stream exploration
  // ---------------------------------------------------------------------------
  {
    id: "ai_act_hydraulic_crane_model",
    title: "Build a Cardboard Hydraulic Arm Model",
    description: "Design a miniature mechanical crane arm using cardboard strips, paper fasteners, and leverage physics.",
    learningOutcome: "Mechanical advantage, linkages, pneumatic/hydraulic principles, and prototyping.",
    estimatedDuration: "25 mins",
    categories: ["Technology & Building", "Logic & Problem Solving"],
    stages: ["classes-8-10"],
    whySuggested: "Engaging challenge for your interest in building physical machines and solving mechanical puzzles.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Cut 4 Cardboard Strips", instruction: "Cut four 15cm cardboard strips from an old shipping box." },
      { id: "step-2", stepNumber: 2, title: "Punch Pivot Holes", instruction: "Carefully punch holes at both ends and the center of each strip." },
      { id: "step-3", stepNumber: 3, title: "Join with Scissor Linkage", instruction: "Connect them using paper fasteners or bent paperclips into an expanding scissor arm." },
      { id: "step-4", stepNumber: 4, title: "Add an Object Claw", instruction: "Attach two small cardboard fingers at the top end to grip objects." },
      { id: "step-5", stepNumber: 5, title: "Test Pick & Place", instruction: "Squeeze the handles to extend the arm and pick up an empty bottle cap." },
    ],
  },
  {
    id: "ai_act_binary_name_bracelet",
    title: "Encode Secret Information in Binary Code",
    description: "Learn how computers store characters using 1s and 0s and craft a physical binary encryption key.",
    learningOutcome: "Computer science foundations, binary ASCII encoding, bit representation, and pattern logic.",
    estimatedDuration: "20 mins",
    categories: ["Technology & Coding", "Logic & Problem Solving"],
    stages: ["classes-8-10"],
    whySuggested: "Discovers the core language of software and chips in a tactile, creative craft.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Look Up Binary Letters", instruction: "Find the 8-bit binary code for the first 3 letters of a word (e.g. A = 01000001)." },
      { id: "step-2", stepNumber: 2, title: "Assign Two Distinct Colors", instruction: "Pick one color for '0' (e.g. black/blue) and another for '1' (e.g. white/red)." },
      { id: "step-3", stepNumber: 3, title: "Color or Thread Bits", instruction: "Draw colored squares on a paper strip or thread beads in exact binary order." },
      { id: "step-4", stepNumber: 4, title: "Add Bit Dividers", instruction: "Place a spacer line or divider between each 8-bit letter." },
      { id: "step-5", stepNumber: 5, title: "Decode Challenge", instruction: "Hand your encrypted strip to a friend and explain how computers read binary." },
    ],
  },
  {
    id: "ai_act_solar_oven_experiment",
    title: "Craft a Cardboard Solar Thermal Oven",
    description: "Harness the power of sunlight using a shoe box lined with aluminum foil to test greenhouse heating.",
    learningOutcome: "Solar thermal energy, greenhouse effect, light reflection, and green technology.",
    estimatedDuration: "25 mins",
    categories: ["Science & Investigation", "Technology & Building"],
    stages: ["classes-8-10"],
    whySuggested: "Explores clean renewable energy through a practical, real-world thermodynamic craft.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Line Box with Foil", instruction: "Line the inside of a shoebox or cereal box with shiny aluminum foil." },
      { id: "step-2", stepNumber: 2, title: "Create a Reflective Lid", instruction: "Prop open the lid flap at a 45-degree angle lined with foil to direct sunlight inside." },
      { id: "step-3", stepNumber: 3, title: "Add Dark Absorber Base", instruction: "Place a sheet of black paper on the bottom to absorb heat." },
      { id: "step-4", stepNumber: 4, title: "Cover with Clear Plastic", instruction: "Stretch clear plastic wrap across the top opening to trap rising hot air inside." },
      { id: "step-5", stepNumber: 5, title: "Place in Bright Sun & Measure", instruction: "Place inside direct sun and record the temperature change over 15 minutes." },
    ],
  },
  {
    id: "ai_act_energy_audit_school",
    title: "Conduct a Household Lighting & Energy Audit",
    description: "Calculate household electricity usage across different rooms and model the financial savings of switching to LEDs.",
    learningOutcome: "Quantitative data collection, energy efficiency calculations, spreadsheet modeling, and economics.",
    estimatedDuration: "25 mins",
    categories: ["Business & Entrepreneurship", "Logic & Problem Solving"],
    stages: ["classes-8-10"],
    whySuggested: "Connects mathematics, commerce, and environmental science to real-world family decisions.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Count Light Sources", instruction: "Walk through 3 rooms and count the total bulbs and note their approximate wattage." },
      { id: "step-2", stepNumber: 2, title: "Estimate Daily Hours", instruction: "Estimate how many hours each light operates per day." },
      { id: "step-3", stepNumber: 3, title: "Calculate Monthly kWh", instruction: "Multiply (Watts * Hours * 30 days) / 1000 to get total kilowatt-hours consumed." },
      { id: "step-4", stepNumber: 4, title: "Model LED Replacement", instruction: "Recalculate assuming all fixtures use high-efficiency 9W LEDs." },
      { id: "step-5", stepNumber: 5, title: "Write a 3-Bullet Summary", instruction: "Summarize the estimated annual cost savings and payback period." },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. CLASSES 11–12: Deeper subjects, entrance clarity, mini-projects
  // ---------------------------------------------------------------------------
  {
    id: "ai_act_projectile_motion_tracker",
    title: "Track Projectile Parabola via Slow-Motion Video",
    description: "Record a tossed ball against a marked wall and calculate velocity and acceleration vectors using video analysis.",
    learningOutcome: "Kinematics, vector decomposition, gravitational acceleration, and empirical data analysis.",
    estimatedDuration: "25 mins",
    categories: ["Engineering & Tech Pathways", "Sciences & Healthcare Exploration"],
    stages: ["classes-11-12"],
    whySuggested: "Brings competitive exam physics concepts to life with real observational evidence.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Set a Calibration Marker", instruction: "Place a 30cm ruler or marked tape horizontally against a background wall." },
      { id: "step-2", stepNumber: 2, title: "Record Slow-Mo Toss", instruction: "Throw a small ball across the frame in a smooth arc and capture in slow-motion video." },
      { id: "step-3", stepNumber: 3, title: "Plot Coordinates at 5 Frames", instruction: "Pause the video at 5 equal time steps and record (x, y) coordinates relative to the ruler." },
      { id: "step-4", stepNumber: 4, title: "Calculate Horizontal Velocity", instruction: "Verify that horizontal velocity delta-x / delta-t remains approximately constant." },
      { id: "step-5", stepNumber: 5, title: "Determine Experimental g", instruction: "Compute vertical acceleration and compare against the standard 9.8 m/s²." },
    ],
  },
  {
    id: "ai_act_financial_break_even_model",
    title: "Build a Financial Break-Even & Contribution Margin Model",
    description: "Construct a financial spreadsheet model for a subscription product or student venture analyzing fixed vs variable costs.",
    learningOutcome: "Managerial accounting, contribution margin ratio, break-even unit volume, and sensitivity analysis.",
    estimatedDuration: "25 mins",
    categories: ["Commerce & Financial Thinking", "Higher Education Discovery"],
    stages: ["classes-11-12"],
    whySuggested: "Develops core financial acumen and commerce intuition for college and beyond.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Define Fixed Overhead Costs", instruction: "List monthly fixed costs: software subscriptions, hosting, and marketing." },
      { id: "step-2", stepNumber: 2, title: "Estimate Per-Unit Variable Cost", instruction: "Determine the cost incurred per unit delivered (packaging, shipping, server fees)." },
      { id: "step-3", stepNumber: 3, title: "Compute Contribution Margin", instruction: "Calculate Selling Price minus Variable Cost per unit." },
      { id: "step-4", stepNumber: 4, title: "Solve Break-Even Point", instruction: "Divide Fixed Costs by Contribution Margin to find minimum units needed for zero loss." },
      { id: "step-5", stepNumber: 5, title: "Test Pricing Scenarios", instruction: "Model what happens to break-even volume if selling price increases by 15%." },
    ],
  },
  {
    id: "ai_act_dna_spooling_experiment",
    title: "Extract & Spool Visible DNA from Fresh Fruit",
    description: "Use cold water, table salt, dish detergent, and chilled alcohol to precipitate physical strands of cellular DNA.",
    learningOutcome: "Molecular biology, cell membrane lysis, DNA precipitation, and biochemical protocols.",
    estimatedDuration: "25 mins",
    categories: ["Sciences & Healthcare Exploration"],
    stages: ["classes-11-12"],
    whySuggested: "Translates abstract textbook genetics into a real biochemical lab experience in your kitchen.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Mash Fruit Sample", instruction: "Mash half a banana or strawberry in a zip-seal bag until smooth." },
      { id: "step-2", stepNumber: 2, title: "Mix Lysis Buffer", instruction: "Combine 50ml water, 1 teaspoon salt, and 2 teaspoons dish soap to break cell walls." },
      { id: "step-3", stepNumber: 3, title: "Filter Fruit Pulp", instruction: "Filter the mixture through a paper coffee filter into a clear glass." },
      { id: "step-4", stepNumber: 4, title: "Layer Ice-Cold Alcohol", instruction: "Slowly trickle chilled rubbing alcohol down the side of the glass to form an upper layer." },
      { id: "step-5", stepNumber: 5, title: "Spool DNA Strands", instruction: "Use a wooden skewer to gently twirl and spool the cloudy white DNA strands." },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. DIPLOMA STUDENTS: Hands-on skills, practical technical work, lateral entry
  // ---------------------------------------------------------------------------
  {
    id: "ai_act_iot_temperature_monitor",
    title: "Simulate an IoT Temperature Alert in Wokwi / Tinkercad",
    description: "Wire an ESP32 microcontroller with a DHT22 sensor and program logic to trigger alerts when thresholds exceed limits.",
    learningOutcome: "Embedded C/C++, sensor interfacing, threshold logic, and IoT hardware simulation.",
    estimatedDuration: "25 mins",
    categories: ["Electrical, Electronics & IoT", "Applied Software & IT Systems"],
    stages: ["diploma"],
    whySuggested: "Hands-on microcontroller practice connecting circuit hardware with programmable logic.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Open Circuit Simulator", instruction: "Create a free virtual ESP32 board in Wokwi or Tinkercad Circuits." },
      { id: "step-2", stepNumber: 2, title: "Wire DHT22 Sensor", instruction: "Connect VCC to 3.3V, GND to Ground, and the Data pin to GPIO 15." },
      { id: "step-3", stepNumber: 3, title: "Write Initialization Code", instruction: "Include the DHT library, initialize serial baud rate at 115200, and read sensor values." },
      { id: "step-4", stepNumber: 4, title: "Implement Alert Threshold", instruction: "Add an if-condition: if temperature > 35°C, blink a virtual red LED and log an alert." },
      { id: "step-5", stepNumber: 5, title: "Test Virtual Simulation", instruction: "Run the simulation, drag the virtual temperature slider, and verify serial output." },
    ],
  },
  {
    id: "ai_act_cad_bracket_dimensioning",
    title: "Model & Dimension a Mechanical Mounting Bracket in 3D CAD",
    description: "Design an L-bracket with mounting holes and fillet radii in Onshape or FreeCAD using parametric sketches.",
    learningOutcome: "Parametric 3D CAD modeling, geometric constraints, fillet stresses, and mechanical drafting.",
    estimatedDuration: "30 mins",
    categories: ["Mechanical & Manufacturing Design", "Lateral Entry Preparation"],
    stages: ["diploma"],
    whySuggested: "Strengthens drafting rigor and technical visualization required for lateral-entry engineering.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Create Base Sketch", instruction: "Create a sketch on the Front Plane with an L-shape profile (50mm x 50mm x 5mm)." },
      { id: "step-2", stepNumber: 2, title: "Apply Geometric Constraints", instruction: "Dimension thickness to 5mm and enforce perpendicular constraints on all corners." },
      { id: "step-3", stepNumber: 3, title: "Extrude 30mm Depth", instruction: "Extrude the sketch symmetrically by 30mm to form a 3D solid bracket." },
      { id: "step-4", stepNumber: 4, title: "Add Mounting Holes & Fillets", instruction: "Sketch two 6mm clearance holes on each face and apply a 3mm internal stress fillet." },
      { id: "step-5", stepNumber: 5, title: "Export Dimensioned Drawing", instruction: "Generate a 2D orthographic drawing view showing front and top dimensions." },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. DEGREE / ENGINEERING: Software architectures, ML pipelines, real systems
  // ---------------------------------------------------------------------------
  {
    id: "ai_act_api_load_benchmark",
    title: "Benchmark an API Under 500 Virtual Users with Autocannon",
    description: "Measure latency profiles (p50, p95, p99) and requests/sec on an HTTP endpoint to identify concurrency bottlenecks.",
    learningOutcome: "HTTP performance testing, event loop saturation, tail latency metrics, and API optimization.",
    estimatedDuration: "25 mins",
    categories: ["Full-Stack & Cloud Engineering", "Systems & Algorithmic Foundations"],
    stages: ["degree-engineering"],
    whySuggested: "Builds verifiable backend benchmarking evidence for your engineering portfolio.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Select a Local Endpoint", instruction: "Identify an existing JSON endpoint in your project or spin up a fast test server." },
      { id: "step-2", stepNumber: 2, title: "Configure Load Profile", instruction: "Run npx autocannon -c 100 -d 10 http://localhost:3000/api/health." },
      { id: "step-3", stepNumber: 3, title: "Inspect Tail Latencies", instruction: "Analyze the output table: check average latency vs 99th percentile spike." },
      { id: "step-4", stepNumber: 4, title: "Diagnose I/O Blocking", instruction: "Identify whether CPU compute or database serialization caused any dropped requests." },
      { id: "step-5", stepNumber: 5, title: "Document 2 Optimization Fixes", instruction: "Write down 2 concrete architecture fixes: payload caching and database connection pooling." },
    ],
  },
  {
    id: "ai_act_ml_regression_pipeline",
    title: "Train & Evaluate a Scikit-Learn Housing Price Pipeline",
    description: "Build an end-to-end regression pipeline with feature imputation, standard scaling, and cross-validated RMSE evaluation.",
    learningOutcome: "Machine learning workflows, pipeline abstraction, data preprocessing, and evaluation metrics.",
    estimatedDuration: "30 mins",
    categories: ["AI & Data Science Innovation", "Technical Project Leadership"],
    stages: ["degree-engineering"],
    whySuggested: "Practical hands-on machine learning demonstrating clean pipeline code.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Load Tabular Dataset", instruction: "Load the California Housing dataset using sklearn.datasets.fetch_california_housing." },
      { id: "step-2", stepNumber: 2, title: "Construct Pipeline", instruction: "Wrap SimpleImputer, StandardScaler, and Ridge regression into a sklearn Pipeline object." },
      { id: "step-3", stepNumber: 3, title: "Train-Test Split", instruction: "Split features and targets into an 80/20 train-test partition with a fixed random seed." },
      { id: "step-4", stepNumber: 4, title: "Compute RMSE & R2 Score", instruction: "Evaluate predictions on the test set and calculate root mean squared error and R² score." },
      { id: "step-5", stepNumber: 5, title: "Plot Residual Distribution", instruction: "Generate a scatter plot of predicted vs actual values to inspect residual error variance." },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. WORKING PROFESSIONALS: Architecture decisions, strategy memos, workflows
  // ---------------------------------------------------------------------------
  {
    id: "ai_act_system_architecture_tradeoff",
    title: "Draft an Architecture Decision Record (ADR) for Event Streaming",
    description: "Analyze synchronous REST vs event-driven Kafka/RabbitMQ architectures and document trade-offs for team alignment.",
    learningOutcome: "Technical decision framing, ADR documentation standards, non-functional requirement analysis.",
    estimatedDuration: "25 mins",
    categories: ["Technical Leadership & Architecture", "Specialized Domain Excellence"],
    stages: ["final-year-grad"],
    whySuggested: "Exercises senior engineering communication and structured architectural governance.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Context & Problem Statement", instruction: "Define the operational bottleneck: high peak traffic causing API gateway timeouts." },
      { id: "step-2", stepNumber: 2, title: "Evaluate 2 Architectural Options", instruction: "Compare Option A (Horizontal HTTP scaling) vs Option B (Async message queue buffer)." },
      { id: "step-3", stepNumber: 3, title: "Assess Operational Trade-offs", instruction: "List infrastructure cost, eventual consistency complexity, and monitoring overhead." },
      { id: "step-4", stepNumber: 4, title: "State Final Decision & Justification", instruction: "Formulate the approved decision with concrete technical justifications." },
      { id: "step-5", stepNumber: 5, title: "Define Rollout & Rollback Plan", instruction: "Specify pilot service migration milestones and fallback rollback flags." },
    ],
  },
  {
    id: "ai_act_stakeholder_briefing_memo",
    title: "Draft an Executive 1-Page AI Strategy Memo for Leadership",
    description: "Synthesize business ROI, technical feasibility, and risk mitigation for integrating generative AI into existing workflows.",
    learningOutcome: "Executive communications, business case formulation, AI governance, and strategic prioritization.",
    estimatedDuration: "25 mins",
    categories: ["Product Strategy & Management", "Strategic Career Advancement"],
    stages: ["final-year-grad"],
    whySuggested: "Develops executive presence and strategic communication across non-technical stakeholders.",
    steps: [
      { id: "step-1", stepNumber: 1, title: "Frame the Business Opportunity", instruction: "Articulate how automating customer enquiry triage can reduce ticket resolution time by 30%." },
      { id: "step-2", stepNumber: 2, title: "Propose Minimum Viable Solution", instruction: "Outline a 4-week pilot leveraging secure enterprise LLM APIs with strict RAG context." },
      { id: "step-3", stepNumber: 3, title: "Address Data Privacy & Compliance", instruction: "Detail PII redaction protocols, data retention policies, and SOC2 alignment." },
      { id: "step-4", stepNumber: 4, title: "Model Resource & Cost Impact", instruction: "Estimate engineering effort (2 sprints) vs ongoing token usage costs ($150/mo)." },
      { id: "step-5", stepNumber: 5, title: "Define Success Metrics", instruction: "Establish clear go/no-go milestones: 95% classification accuracy and zero hallucination leak." },
    ],
  },
];

// =============================================================================
// MAIN POST HANDLER
// =============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      primaryFocus = "",
      activeInterests = [],
      academicStage = "classes-4-7",
      currentClass = "Class 6",
      startingPointAnswers = {},
      completedActivities = [],
      excludeActivityIds = [],
      count = 2,
    } = body;

    const excludedSet = new Set<string>(Array.isArray(excludeActivityIds) ? excludeActivityIds : []);
    const completedList = Array.isArray(completedActivities) ? completedActivities : [];

    // 1. Try Gemini API if server key is present in environment
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;
    if (apiKey) {
      try {
        const stageGuideline = getStagePedagogicalGuideline(academicStage, currentClass);

        // Compact Starting Point summary for token minimization (Section 9)
        const compactAnswers = Object.entries(startingPointAnswers || {})
          .filter(([, v]) => typeof v === "string" && (v as string).trim().length > 0)
          .slice(0, 5)
          .map(([k, v]) => `Q${k}: ${String(v).slice(0, 60)}`)
          .join(" | ");

        const promptText = `
You are an expert educational AI generating practical, age-appropriate activities for Next Move AI.

Student Context:
- Academic Stage: ${academicStage}
- Class/Age: ${currentClass}
- Primary Focus: ${primaryFocus || "Exploration & Growth"}
- Active Interests: ${Array.isArray(activeInterests) && activeInterests.length > 0 ? activeInterests.slice(0, 3).join(", ") : "General Discovery"}
- Starting Point: ${compactAnswers || "None"}
- Completed Titles: ${completedList.slice(0, 5).join(", ") || "None"}
- Excluded IDs: ${Array.from(excludedSet).slice(0, 10).join(", ") || "None"}

Pedagogical Criteria:
${stageGuideline}

Output Instructions:
1. Generate exactly ${count} distinct, personalized activities tailored to this student.
2. Requirements:
   - Practical, educational, achievable with simple everyday materials.
   - Concise text: 1-2 sentence description, 1 sentence learning outcome.
   - Exactly 4 or 5 actionable, clear steps (1-2 sentences per step).
   - Match exact academic stage/class.
   - Do NOT repeat completed or excluded activities. No markdown, reasoning, or conversational filler.
3. Return STRICTLY a valid JSON array adhering to this schema:
[
  {
    "id": "ai_gen_${academicStage}_${Date.now()}_1",
    "title": "string (engaging, specific title)",
    "description": "string (1-2 sentences)",
    "learningOutcome": "string (1 sentence)",
    "estimatedDuration": "20 mins",
    "categories": ["${activeInterests[0] || "Exploration"}"],
    "stages": ["${academicStage}"],
    "whySuggested": "string (why suitable for this student)",
    "steps": [
      { "id": "step-1", "stepNumber": 1, "title": "string", "instruction": "string (1-2 sentences)" },
      { "id": "step-2", "stepNumber": 2, "title": "string", "instruction": "string (1-2 sentences)" },
      { "id": "step-3", "stepNumber": 3, "title": "string", "instruction": "string (1-2 sentences)" },
      { "id": "step-4", "stepNumber": 4, "title": "string", "instruction": "string (1-2 sentences)" },
      { "id": "step-5", "stepNumber": 5, "title": "string", "instruction": "string (1-2 sentences)" }
    ]
  }
]
`;

        const models = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-2.5-flash"];
        let rawText: string | null = null;

        for (const model of models) {
          try {
            const geminiRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  contents: [{ parts: [{ text: promptText }] }],
                  generationConfig: {
                    response_mime_type: "application/json",
                    temperature: 0.7,
                    max_output_tokens: 1200,
                  },
                }),
                signal: AbortSignal.timeout(6000),
              }
            );

            if (geminiRes.ok) {
              const geminiData = await geminiRes.json();
              rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (rawText) break;
            }
          } catch {
            // Try next model if timeout or rate-limited
          }
        }

        if (rawText) {
          const parsed = JSON.parse(rawText);
          const candidateList: PersonalizedActivityOption[] = Array.isArray(parsed)
            ? parsed
            : parsed.activities || [];

          const validActivities = candidateList.filter((a) => {
            return (
              a.title &&
              a.description &&
              a.learningOutcome &&
              Array.isArray(a.steps) &&
              a.steps.length >= 4 &&
              a.steps.length <= 5 &&
              !excludedSet.has(a.id)
            );
          });

          if (validActivities.length >= count) {
            return NextResponse.json({
              success: true,
              activities: validActivities.slice(0, count).map((act, idx) => ({
                ...act,
                id: act.id || `ai_act_gemini_${Date.now()}_${idx + 1}`,
                estimatedDuration: act.estimatedDuration || "20 mins",
                categories: Array.isArray(act.categories) && act.categories.length > 0 ? act.categories : activeInterests,
                stages: [academicStage],
              })),
              source: "gemini_ai",
            });
          }
        }
      } catch (geminiError) {
        console.warn("Gemini API call failed or timed out, falling back to dynamic AI engine:", geminiError);
      }
    }

    // 2. Intelligent Dynamic Recommender Engine (Pedagogically tuned, reliable fallback)
    const available = DYNAMIC_AI_ACTIVITY_BANK.filter((act) => !excludedSet.has(act.id));

    // Score activities based on user's active interests, focus, and exact stage
    const scored = available.map((act) => {
      let score = 0;
      act.categories.forEach((cat) => {
        if (activeInterests.includes(cat)) score += 4;
        if (primaryFocus.toLowerCase().includes(cat.toLowerCase())) score += 3;
      });
      // Heavily reward exact matching stage
      if (act.stages.includes(academicStage)) score += 10;
      return { act, score };
    });

    // Filter to stage matches first if available
    const stageMatches = scored.filter((item) => item.act.stages.includes(academicStage));
    const poolToUse = stageMatches.length >= count ? stageMatches : scored;

    poolToUse.sort((a, b) => b.score - a.score);

    const picked: PersonalizedActivityOption[] = [];
    const usedCategories = new Set<string>();

    for (const item of poolToUse) {
      if (picked.length >= count) break;
      const primaryCat = item.act.categories[0];
      if (!usedCategories.has(primaryCat) || picked.length === 0) {
        picked.push(item.act);
        usedCategories.add(primaryCat);
      }
    }

    for (const item of poolToUse) {
      if (picked.length >= count) break;
      if (!picked.some((p) => p.id === item.act.id)) {
        picked.push(item.act);
      }
    }

    // Dynamic synthesizer if all preset bank activities for the stage are exhausted
    if (picked.length < count) {
      const needed = count - picked.length;
      for (let i = 0; i < needed; i++) {
        const uniqueId = `ai_act_synth_${Date.now()}_${i + 1}`;
        const interest = activeInterests[i % (activeInterests.length || 1)] || "Hands-on Discovery";
        const synthesized = synthesizeStageActivity(academicStage, currentClass, interest, primaryFocus, uniqueId);
        picked.push(synthesized);
      }
    }

    return NextResponse.json({
      success: true,
      activities: picked,
      source: "dynamic_ai_recommender",
    });
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to recommend activities",
        activities: [],
      },
      { status: 500 }
    );
  }
}

// =============================================================================
// STAGE GUIDELINES & SYNTHESIZER
// =============================================================================

function getStagePedagogicalGuideline(stage: string, currentClass: string): string {
  switch (stage) {
    case "classes-4-7":
      return `Target Audience: School children in Classes 4–7 (${currentClass}, ages 9–12).
Tone: Playful, encouraging, curious, everyday language without technical jargon.
Style: Fun drawing, observing nature, simple kitchen science, puzzles, storytelling, building with recycled household objects.`;

    case "classes-8-10":
      return `Target Audience: Students in Classes 8–10 (${currentClass}, ages 13–16).
Tone: Practical, engaging, curiosity-driven exploration.
Style: Practical challenges, creative projects, basic science & coding, problem-solving, stream exploration.`;

    case "classes-11-12":
      return `Target Audience: Senior school students in Classes 11–12 (${currentClass}, ages 16–18).
Tone: Rigorous, realistic, forward-looking.
Style: Deeper academic subject exploration, real-world mini-projects, practical experiments, creative or analytical challenges.`;

    case "diploma":
      return `Target Audience: Polytechnic / Technical Diploma students (${currentClass}).
Tone: Applied, hands-on, career and practical skills-focused.
Style: Technical troubleshooting, circuit design, 3D CAD modeling, practical engineering applications.`;

    case "degree-engineering":
      return `Target Audience: Engineering & Degree undergraduates (${currentClass}).
Tone: Professional, empirical, engineering rigor.
Style: Tech stacks, software architectures, ML pipelines, benchmarking, real-world portfolio evidence.`;

    case "final-year-grad":
      return `Target Audience: Working Professionals and Final-Year Transitioning Graduates (${currentClass}).
Tone: Executive, strategic, high-leverage.
Style: Modern system architectures, AI transformation, product leadership, specialized domain excellence, career acceleration.`;

    default:
      return `Target Audience: Student (${currentClass}). Tone: Engaging, practical, age-appropriate.`;
  }
}

function synthesizeStageActivity(
  stage: string,
  currentClass: string,
  interest: string,
  primaryFocus: string,
  id: string
): PersonalizedActivityOption {
  if (stage === "classes-4-7") {
    return {
      id,
      title: `Create a Fun Discovery Card for ${interest}`,
      description: `Draw, design, and share an imaginative discovery card based on curious observations in ${interest}.`,
      learningOutcome: `Observation skills, creative expression, and curiosity in ${interest}.`,
      estimatedDuration: "20 mins",
      categories: [interest, "Creativity & Media"],
      stages: [stage],
      whySuggested: `Tailored to your creative interests in ${interest}.`,
      steps: [
        { id: "step-1", stepNumber: 1, title: "Find an Inspiring Idea", instruction: `Pick one exciting question about ${interest} that sparks your curiosity.` },
        { id: "step-2", stepNumber: 2, title: "Gather Simple Drawing Tools", instruction: "Find a piece of paper, pencils, markers, or simple craft items." },
        { id: "step-3", stepNumber: 3, title: "Draw & Label Your Finding", instruction: "Draw a colorful diagram or character showing how your idea works." },
        { id: "step-4", stepNumber: 4, title: "Write a 2-Sentence Clue", instruction: "Add a fun fact or riddle about what makes this special." },
        { id: "step-5", stepNumber: 5, title: "Share Your Discovery", instruction: "Show your card to a friend or family member and explain what you learned!" },
      ],
    };
  }

  if (stage === "classes-11-12" || stage === "degree-engineering") {
    return {
      id,
      title: `Build a Micro-Analysis Framework in ${interest}`,
      description: `Apply empirical modeling or structured problem-solving to investigate a real-world scenario in ${interest}.`,
      learningOutcome: `Analytical decomposition, quantitative synthesis, and evidence-based problem solving in ${interest}.`,
      estimatedDuration: "25 mins",
      categories: [interest, "Problem Solving"],
      stages: [stage],
      whySuggested: `Advances your rigorous focus in ${primaryFocus || interest}.`,
      steps: [
        { id: "step-1", stepNumber: 1, title: "Define the Boundary Problem", instruction: `Frame a specific real-world question or operational parameter in ${interest}.` },
        { id: "step-2", stepNumber: 2, title: "Collect Baseline Metrics", instruction: "Gather 3–4 reference data points or theoretical constraints from verified sources." },
        { id: "step-3", stepNumber: 3, title: "Execute Empirical Trial", instruction: "Run a practical trial, calculation, or code simulation to test your hypothesis." },
        { id: "step-4", stepNumber: 4, title: "Evaluate Variance", instruction: "Compare measured output against expectations and document deviations." },
        { id: "step-5", stepNumber: 5, title: "Document Takeaways", instruction: "Write a concise technical summary outlining conclusions and next optimization steps." },
      ],
    };
  }

  return {
    id,
    title: `Practical Mini-Project in ${interest}`,
    description: `An investigative hands-on challenge designed to test and expand your capabilities in ${interest}.`,
    learningOutcome: `Practical problem-solving, structured design, and critical reflection in ${interest}.`,
    estimatedDuration: "20 mins",
    categories: [interest, "Problem Solving"],
    stages: [stage],
    whySuggested: `Dynamically tailored to your primary focus in ${primaryFocus || interest}.`,
    steps: [
      { id: "step-1", stepNumber: 1, title: "Identify a Curious Challenge", instruction: `Think of one practical challenge or question about ${interest} to solve.` },
      { id: "step-2", stepNumber: 2, title: "Gather Required Materials", instruction: "Assemble everyday items or digital tools needed for your trial." },
      { id: "step-3", stepNumber: 3, title: "Draft or Assemble Prototype", instruction: "Spend 10 minutes constructing, sketching, or assembling your initial solution." },
      { id: "step-4", stepNumber: 4, title: "Test & Record Observations", instruction: "Test your prototype and write down one surprising result." },
      { id: "step-5", stepNumber: 5, title: "Formulate Next Steps", instruction: "Reflect on how you could refine your creation or take it further." },
    ],
  };
}
