/**
 * NEXT MOVE AI V2 — CLASSES 4–7 CHILD EXPLORATIONS CATALOG & RECOMMENDATION ENGINE
 * 
 * Strict Personalization Principles:
 * 1. Strict Academic Stage & Class Filtering:
 *    - Recommendations are strictly filtered by the student's exact class ("Class 4", "Class 5", "Class 6", "Class 7").
 *    - An exploration is only shown if explicitly tagged as suitable for that exact class.
 * 2. Interest-Based Personalization:
 *    - Scored dynamically based on My Starting Point answers, primary focus, active interests, and completed activities.
 *    - Two Class 6 students with different interests (e.g. Creative vs Science/Tech) receive distinctly different recommendations.
 * 3. 5–6 Age-Appropriate Experiences (Never adult careers):
 *    - Focus on hands-on challenges, creative making, experiments, nature detective work, and logic puzzles.
 *    - Zero corporate job titles, salaries, or adult career paths.
 */

import { type UserStartingPoint, type StudentNextMoveActivity, type UserProfile } from "@/lib/firestore-service";
import { type StudentIntelligenceProfile } from "@/features/onboarding/schemas/types";

export type ValidChildClass = "Class 4" | "Class 5" | "Class 6" | "Class 7";

export interface ChildExploration {
  id: string;
  title: string;
  badge: string;
  categoryLabel: string;
  categories: string[];
  suitableClasses: ValidChildClass[];
  shortDescription: string;
  whatYouCanTry: string;
  whatYouWillLearn: string;
  estimatedTime: string;
  difficulty: "Easy" | "Medium";
  materialsNeeded: string[];
  challengeSteps: string[];
  suggestedWhy: string;
}

// =============================================================================
// COMPREHENSIVE CHILD EXPLORATIONS CATALOG (TAGGED BY EXACT CLASS & INTERESTS)
// =============================================================================

export const CHILD_EXPLORATIONS_CATALOG: ChildExploration[] = [
  // ---------------------------------------------------------------------------
  // CLASS 4 SPECIFIC / FOUNDATIONAL (Ages 9–10)
  // ---------------------------------------------------------------------------
  {
    id: "exp_c4_color_splash",
    title: "Color Mixing & Optical Illusions",
    badge: "Color Studio",
    categoryLabel: "Creativity & Media",
    categories: ["Creativity & Media", "Science & Discovery"],
    suitableClasses: ["Class 4", "Class 5"],
    shortDescription: "Discover how colors combine and fool the eye by mixing primary paints and constructing spinning optical illusion tops.",
    whatYouCanTry: "Create a circular cardboard disc with black-and-white spiral patterns, spin it on a pencil tip, and watch phantom colors magically appear.",
    whatYouWillLearn: "Primary and secondary color theory, visual persistence of vision, and playful optical science.",
    estimatedTime: "20 mins",
    difficulty: "Easy",
    materialsNeeded: ["Cardboard circle", "Pencil", "Black marker", "Color paints or markers"],
    challengeSteps: [
      "Cut a 10cm cardboard circle and poke a small hole in the exact center.",
      "Draw Benham's spiral patterns with a black marker on one half.",
      "Push a short pencil through the center and spin it like a top to watch the illusion!",
    ],
    suggestedWhy: "Matches your excitement for drawing, bright colors, and discovering how eyes see art.",
  },
  {
    id: "exp_c4_shadow_puppetry",
    title: "Shadow Puppets & Folk Tale Theatre",
    badge: "Folk Puppet Studio",
    categoryLabel: "Creativity & Media",
    categories: ["Creativity & Media", "Stories & Imagination"],
    suitableClasses: ["Class 4", "Class 5"],
    shortDescription: "Cut silhouette animal characters with jointed limbs, shining a flashlight against a white sheet to tell an imaginative animal fable.",
    whatYouCanTry: "Craft a movable elephant or bird puppet with jointed paper limbs and perform a 1-minute bedtime story for a family member.",
    whatYouWillLearn: "Light and shadow projection, jointed mechanical linkages, voice modulation, and oral storytelling.",
    estimatedTime: "25 mins",
    difficulty: "Easy",
    materialsNeeded: ["Black card paper", "Pencil", "Scissors", "Brass paper fasteners or tape", "Ice-cream sticks", "Flashlight"],
    challengeSteps: [
      "Draw the outline of an animal on dark card paper and cut it out.",
      "Attach movable legs or trunk using fasteners or tape hinges on sticks.",
      "Dim the room lights, shine a flashlight at a wall, and bring your puppet to life!",
    ],
    suggestedWhy: "Tailored to your love of animal stories, drawing characters, and playful imaginative performances.",
  },
  {
    id: "exp_c4_plant_sprout",
    title: "Seed Sprouting & Sunlight Growth Diary",
    badge: "Botanical Explorer",
    categoryLabel: "Nature & Environment",
    categories: ["Nature & Environment", "Science & Discovery"],
    suitableClasses: ["Class 4", "Class 5"],
    shortDescription: "Sprout fast-growing moong or bean seeds in moist cotton, measuring root vs shoot growth daily in a mini illustrated field log.",
    whatYouCanTry: "Place 4 soaked moong seeds in two clear cups (one in bright sunlight, one in a dark cupboard) to observe how stems seek the light.",
    whatYouWillLearn: "Phototropism (how plants chase sunlight), germination conditions, root hairs, and daily observation records.",
    estimatedTime: "15 mins",
    difficulty: "Easy",
    materialsNeeded: ["Cotton wool", "Clear plastic cup", "4 moong or mustard seeds", "Water", "Ruler", "Notebook"],
    challengeSteps: [
      "Wet a cotton ball gently and line the bottom of two clear cups.",
      "Place 2 soaked seeds in each cup and place one near a window and one in shade.",
      "Record sprout length daily for 3 days and sketch the tiny green leaves.",
    ],
    suggestedWhy: "Connects with your curiosity about plants, gardening, and living nature.",
  },
  {
    id: "exp_c4_origami_geometry",
    title: "Origami Animals & Geometry Folding",
    badge: "Paper Craft Studio",
    categoryLabel: "Creativity & Media",
    categories: ["Creativity & Media", "Problem Solving"],
    suitableClasses: ["Class 4", "Class 5"],
    shortDescription: "Transform flat square paper into 3D jumping frogs, soaring birds, and modular paper structures using zero tape or glue.",
    whatYouCanTry: "Fold an origami jumping frog from an index card and test how far it hops across your desk when you press its spring back.",
    whatYouWillLearn: "Spatial symmetry, paper crease physics, angles, and step-by-step sequential dexterity.",
    estimatedTime: "20 mins",
    difficulty: "Easy",
    materialsNeeded: ["Square origami paper or colored square sheets"],
    challengeSteps: [
      "Fold diagonal cross creases to form the frog's spring water-bomb base.",
      "Fold the front legs forward and accordion-fold the rear legs to create the spring.",
      "Gently tap the frog's back with your fingertip to launch its high leap!",
    ],
    suggestedWhy: "Combines your love for making things with your hands, spatial puzzles, and creative crafts.",
  },
  {
    id: "exp_c4_secret_treasure_map",
    title: "Illustrated Treasure Map & Backyard Grid",
    badge: "Adventure Cartographer",
    categoryLabel: "Creativity & Media",
    categories: ["Stories & Imagination", "Problem Solving", "Creativity & Media"],
    suitableClasses: ["Class 4", "Class 5"],
    shortDescription: "Create an aged, antique-style map of your house or garden with coordinate grids, compass roses, and hidden riddle clues.",
    whatYouCanTry: "Dab a paper sheet with damp tea water to give it an authentic aged pirate parchment look, then draw a grid with 4 hidden clues.",
    whatYouWillLearn: "Map scale, cardinal directions (North, South, East, West), spatial layout, and clue creation.",
    estimatedTime: "25 mins",
    difficulty: "Easy",
    materialsNeeded: ["Plain paper", "Tea bag or coffee dip", "Brown/black gel pen", "Ruler"],
    challengeSteps: [
      "Wipe paper lightly with a used tea bag and let it dry to create parchment texture.",
      "Draw your room layout with an ornamental compass rose in the corner.",
      "Mark a secret 'X' where you hide a small token and write 2 rhyming clues.",
    ],
    suggestedWhy: "Inspires your imagination with adventure quests, mystery mapping, and creative drawing.",
  },
  {
    id: "exp_c4_magnets_compass",
    title: "Floating Needle Magnetic Compass",
    badge: "Magnetic Detective",
    categoryLabel: "Technology & Software",
    categories: ["Science & Discovery", "Technology & Building"],
    suitableClasses: ["Class 4", "Class 5"],
    shortDescription: "Magnetize a sewing needle using a fridge magnet and float it on water to build your own real navigation compass.",
    whatYouCanTry: "Rub a steel needle 30 times with a fridge magnet, float it on a tiny cork leaf in a water bowl, and watch it swing to North.",
    whatYouWillLearn: "Magnetic poles, Earth's invisible geomagnetic field, friction, and navigation basics.",
    estimatedTime: "20 mins",
    difficulty: "Easy",
    materialsNeeded: ["Sewing needle (under adult supervision)", "Fridge magnet", "Small cork slice or leaf", "Shallow bowl of water"],
    challengeSteps: [
      "Stroke the needle in one direction 30 times with your fridge magnet.",
      "Gently place a cork slice on the water surface and lay the needle on top.",
      "Watch the needle rotate freely until it aligns with the Earth's North pole!",
    ],
    suggestedWhy: "Satisfies your curiosity about how invisible forces like magnetism and navigation work.",
  },
  {
    id: "exp_c4_balance_sculpture",
    title: "Kinetic Balancing Sculptures",
    badge: "Physics Maker",
    categoryLabel: "Technology & Software",
    categories: ["Technology & Building", "Problem Solving"],
    suitableClasses: ["Class 4", "Class 5"],
    shortDescription: "Defy gravity by engineering balancing counterweights using toothpicks, playdough balls, and forks balanced on a pinpoint.",
    whatYouCanTry: "Interlock two metal forks around a toothpick and balance the tiny tip on the edge of a drinking glass without falling.",
    whatYouWillLearn: "Center of mass, rotational equilibrium, stability points, and trial-and-error engineering.",
    estimatedTime: "20 mins",
    difficulty: "Easy",
    materialsNeeded: ["2 forks", "1 wooden toothpick", "A drinking glass"],
    challengeSteps: [
      "Interlock the tines of two identical forks at a slight V-angle.",
      "Thread a toothpick through the middle tine of the forks.",
      "Rest the very tip of the toothpick on the rim of a glass and observe the balance!",
    ],
    suggestedWhy: "Engages your hands in tinkering, balancing physics, and surprising your friends.",
  },
  {
    id: "exp_kitchen_science",
    title: "Fun Kitchen Science Experiments",
    badge: "Science Discovery",
    categoryLabel: "Science & Discovery",
    categories: ["Science & Discovery", "Problem Solving"],
    suitableClasses: ["Class 4", "Class 5"],
    shortDescription: "Investigate density, buoyancy, and fizzing chemical reactions using everyday household liquids and safe kitchen supplies.",
    whatYouCanTry: "Layer oil, water, and honey in a clear glass to build a 3-tier density column, then test which everyday objects sink or float.",
    whatYouWillLearn: "Scientific method, relative density, buoyancy, and observational hypothesis testing.",
    estimatedTime: "20 mins",
    difficulty: "Easy",
    materialsNeeded: ["Tall clear glass", "Water", "Cooking oil", "Honey or dish soap", "Small items (grape, coin, plastic cap)"],
    challengeSteps: [
      "Pour 2 tablespoons of honey into the glass first.",
      "Slowly pour water down the glass side, followed by cooking oil.",
      "Drop in small items and record which layer each object floats upon.",
    ],
    suggestedWhy: "Gives you hands-on science experiments to discover physics and chemistry in action.",
  },

  // ---------------------------------------------------------------------------
  // CLASS 5 & 6 BRIDGE & CLASS 6 CREATIVE / STORYTELLING
  // ---------------------------------------------------------------------------
  {
    id: "exp_comic_worlds",
    title: "Visual Storytelling & Comic Worlds",
    badge: "Creative Storytelling",
    categoryLabel: "Creativity & Media",
    categories: ["Creativity & Media", "Stories & Imagination"],
    suitableClasses: ["Class 5", "Class 6"],
    shortDescription: "Invent original characters, sketch story panels, and write exciting illustrated adventures where heroes solve creative mysteries.",
    whatYouCanTry: "Create your own 3-panel adventure comic featuring two original characters with special quirks solving a neighborhood puzzle.",
    whatYouWillLearn: "Character design, visual storytelling, dialogue writing, and creative narrative planning.",
    estimatedTime: "25 mins",
    difficulty: "Easy",
    materialsNeeded: ["Paper", "Pencil", "Colored pens or markers"],
    challengeSteps: [
      "Invent two characters with contrasting personalities.",
      "Sketch a 3-panel strip: the mystery discovery, a funny clue, and a clever solution.",
      "Add speech bubbles and hand-lettered sound effects.",
    ],
    suggestedWhy: "Matches your passion for creative ideas, drawing, and imaginative storytelling.",
  },
  {
    id: "exp_stop_motion",
    title: "Mini Animation & Stop-Motion Video",
    badge: "Animation Studio",
    categoryLabel: "Creativity & Media",
    categories: ["Creativity & Media", "Stories & Imagination"],
    suitableClasses: ["Class 6", "Class 7"],
    shortDescription: "Make everyday toys, clay figures, or drawings come alive by snapping frame-by-frame photos to produce your first mini animation.",
    whatYouCanTry: "Set up a phone or tablet camera and photograph a toy taking 10 tiny steps across your desk to see it walk in video.",
    whatYouWillLearn: "Patience, frame rates, movement physics, and visual timing.",
    estimatedTime: "30 mins",
    difficulty: "Medium",
    materialsNeeded: ["Phone or tablet with camera", "Small toy or clay figure", "Good desk lighting"],
    challengeSteps: [
      "Prop your camera steadily against a book so it doesn't shake.",
      "Move your figure just 1 centimeter and take a picture. Repeat 10 times.",
      "Play back your photos rapidly to watch your character magically walk!",
    ],
    suggestedWhy: "Expands your creative storytelling into the world of moving digital animation.",
  },
  {
    id: "exp_c6_digital_scrapbook",
    title: "Illustrated Story Zine & Character Lore",
    badge: "Zine Maker",
    categoryLabel: "Creativity & Media",
    categories: ["Creativity & Media", "Stories & Imagination"],
    suitableClasses: ["Class 6"],
    shortDescription: "Fold an 8-page mini-magazine from a single sheet of paper, filling it with illustrated character profiles, lore, and imaginary maps.",
    whatYouCanTry: "Fold a single A4 sheet into an 8-page pocket booklet without glue, dedicating each page to a chapter of your fantasy world.",
    whatYouWillLearn: "Book folding structures, page layout design, concise character bios, and thematic world-building.",
    estimatedTime: "25 mins",
    difficulty: "Easy",
    materialsNeeded: ["A4 plain paper sheet", "Scissors", "Pencils / colored pens"],
    challengeSteps: [
      "Fold an A4 sheet into 8 equal rectangles, cut a slit in the middle fold, and assemble into a mini book.",
      "Design a punchy front cover and an author logo on the back.",
      "Fill the 6 inside pages with character illustrations, maps, and secret clues.",
    ],
    suggestedWhy: "Perfect for students who enjoy writing stories, illustrating worlds, and publishing their own art.",
  },
  {
    id: "exp_c6_claymation_sculpt",
    title: "Clay Creature Sculpting & Pose Armatures",
    badge: "Sculpture Studio",
    categoryLabel: "Creativity & Media",
    categories: ["Creativity & Media", "Stories & Imagination"],
    suitableClasses: ["Class 6", "Class 7"],
    shortDescription: "Sculpt expressive creature figurines using modeling clay, testing dynamic poses and facial expressions that convey emotion.",
    whatYouCanTry: "Sculpt two contrasting alien characters (one sleepy and rounded, one alert and spiky) and design an expressive accessory for each.",
    whatYouWillLearn: "Form, proportions, facial expression physics, and 3D character design fundamentals.",
    estimatedTime: "30 mins",
    difficulty: "Medium",
    materialsNeeded: ["Modeling clay or dough in 2–3 colors", "Toothpick for detailing"],
    challengeSteps: [
      "Roll basic spheres and cylinders as foundational body shapes.",
      "Use toothpicks to sculpt eye sockets, mouth curves, and textural patterns.",
      "Pose the figures to convey happiness, surprise, or mischievous curiosity.",
    ],
    suggestedWhy: "Takes your drawing and visual creativity into tactile, 3-dimensional sculpture.",
  },
  {
    id: "exp_sound_foley",
    title: "Rhythm, Sounds & Foley Effects Studio",
    badge: "Sound Explorer",
    categoryLabel: "Creativity & Media",
    categories: ["Creativity & Media"],
    suitableClasses: ["Class 5", "Class 6"],
    shortDescription: "Discover how movie sound effects are made using kitchen pots, crinkled paper, and shoes to create a live audio drama.",
    whatYouCanTry: "Create a 30-second audio story of 'A thunderstorm in a forest' using only everyday objects recorded on a voice app.",
    whatYouWillLearn: "Active listening, acoustic textures, audio pacing, and soundtrack storytelling.",
    estimatedTime: "20 mins",
    difficulty: "Easy",
    materialsNeeded: ["Voice recorder or phone app", "Pots, paper, or keys"],
    challengeSteps: [
      "Gently tap fingers on a desk to recreate early raindrops.",
      "Gently shake a baking sheet for deep rolling thunder.",
      "Crinkle wrapping paper for the sound of wind in autumn trees.",
    ],
    suggestedWhy: "Lets you explore the surprising world of acoustic rhythms and sound effects.",
  },
  {
    id: "exp_game_creator",
    title: "Create Your Own Board Game or Quest",
    badge: "Game Design",
    categoryLabel: "Creativity & Media",
    categories: ["Problem Solving", "Creativity & Media", "Stories & Imagination"],
    suitableClasses: ["Class 5", "Class 6", "Class 7"],
    shortDescription: "Design a playable board game on a sheet of card paper with custom rules, surprise obstacle tiles, and custom hero tokens.",
    whatYouCanTry: "Draw a 20-space path with 3 trap tiles and 2 secret shortcut portals, then playtest it with a sibling or friend.",
    whatYouWillLearn: "Game balance, rule creation, spatial design, and constructive user testing.",
    estimatedTime: "30 mins",
    difficulty: "Medium",
    materialsNeeded: ["Paper or card sheet", "Pencils / markers", "Coin or die for rolling"],
    challengeSteps: [
      "Draw a winding path from 'Start' to the 'Treasure Castle'.",
      "Add 3 mystery challenge spaces (e.g., 'Recite a tongue-twister to advance').",
      "Play with a partner and adjust any rule that feels unfair.",
    ],
    suggestedWhy: "Combines your creativity, storytelling, and problem-solving into a game others can play.",
  },

  // ---------------------------------------------------------------------------
  // CLASS 6 SCIENCE / TECHNOLOGY / BUILDING / LOGIC
  // ---------------------------------------------------------------------------
  {
    id: "exp_c6_hydraulic_arm",
    title: "Cardboard & Syringe Hydraulic Lift Arm",
    badge: "Fluid Mechanics",
    categoryLabel: "Technology & Software",
    categories: ["Technology & Building", "Science & Discovery"],
    suitableClasses: ["Class 6", "Class 7"],
    shortDescription: "Build a fluid-powered robotic lifting arm using two plastic syringes, flexible tubing, and cardboard hinges that lift small objects.",
    whatYouCanTry: "Connect two water-filled syringes with 30cm tubing, and use one syringe plunger to smoothly push up a cardboard crane platform.",
    whatYouWillLearn: "Pascal's Law of fluid pressure, hydraulic force transmission, mechanical leverage, and closed-loop circuits.",
    estimatedTime: "35 mins",
    difficulty: "Medium",
    materialsNeeded: ["2 plastic 10ml syringes (without needles)", "Aquarium tubing or straw", "Water with food coloring", "Cardboard scraps"],
    challengeSteps: [
      "Fill one syringe and tubing completely with colored water, eliminating air bubbles.",
      "Attach the second syringe to create a closed hydraulic system.",
      "Mount one syringe on a cardboard hinged crane arm and test lifting an eraser!",
    ],
    suggestedWhy: "Appeals directly to your curiosity about machines, robotics, and fluid engineering.",
  },
  {
    id: "exp_c6_circuit_paper",
    title: "Conductive Pencil Circuits & Paper Electronics",
    badge: "Circuit Builder",
    categoryLabel: "Technology & Software",
    categories: ["Technology & Building", "Science & Discovery"],
    suitableClasses: ["Class 6", "Class 7"],
    shortDescription: "Draw dark graphite tracks with a soft pencil on paper to conduct electric current from a coin battery and light up an LED without wires.",
    whatYouCanTry: "Draw a thick 6B pencil circuit path connecting a 3V coin cell battery to a miniature LED to make a light-up greeting card.",
    whatYouWillLearn: "Electrical conductivity of carbon graphite, open vs closed circuits, polarity, and circuit resistance.",
    estimatedTime: "25 mins",
    difficulty: "Medium",
    materialsNeeded: ["Soft 6B or 8B pencil", "Plain paper", "3V coin battery (CR2032)", "1 small LED bulb"],
    challengeSteps: [
      "Draw two thick, dark parallel graphite lines about 5mm wide on paper.",
      "Tape the LED legs across the gap at one end.",
      "Press the coin cell battery across the other end and watch the LED glow!",
    ],
    suggestedWhy: "Allows you to explore electronic circuits through simple, hands-on drawing experiments.",
  },
  {
    id: "exp_cardboard_robot",
    title: "Makerspace Inventions & Everyday Tinkering",
    badge: "Hands-on Maker",
    categoryLabel: "Technology & Software",
    categories: ["Technology & Building", "Science & Discovery", "Problem Solving"],
    suitableClasses: ["Class 6", "Class 7"],
    shortDescription: "Build cardboard machines, simple levers, and playful contraptions using recycled boxes, straws, and rubber bands.",
    whatYouCanTry: "Construct a 4-wheel cardboard vehicle propelled across your floor using nothing more than rubber-band axle tension.",
    whatYouWillLearn: "Mechanical levers, friction, trial-and-error building, and structural balance.",
    estimatedTime: "35 mins",
    difficulty: "Medium",
    materialsNeeded: ["Cardboard piece", "4 bottle caps", "2 wooden skewers or straws", "Rubber bands"],
    challengeSteps: [
      "Tape two straws parallel under a cardboard base.",
      "Insert skewers with bottle cap wheels at both ends.",
      "Hook a rubber band to the front, wind it backwards around the rear axle, and release!",
    ],
    suggestedWhy: "Tailored to your joy in taking things apart, tinkering, and seeing how machines move.",
  },
  {
    id: "exp_everyday_tech",
    title: "Explore How Everyday Technology Works",
    badge: "Tech Detective",
    categoryLabel: "Technology & Software",
    categories: ["Technology & Building", "Science & Discovery"],
    suitableClasses: ["Class 6", "Class 7"],
    shortDescription: "Investigate the hidden tech around your house: how TV remotes send invisible light, how barcodes store numbers, and how touchscreens work.",
    whatYouCanTry: "Point a TV remote at your smartphone camera to see the invisible infrared beam flash in bright purple on screen.",
    whatYouWillLearn: "Infrared spectrum, digital signal transmission, sensors, and practical curiosity about devices.",
    estimatedTime: "20 mins",
    difficulty: "Easy",
    materialsNeeded: ["TV remote", "Smartphone camera"],
    challengeSteps: [
      "Open your phone's camera app in a dim room.",
      "Point the TV remote front bulb directly at the camera lens and press any button.",
      "Notice the bright purple light flashing on screen that human eyes can't see!",
    ],
    suggestedWhy: "Reveals how the hidden technology all around you actually operates behind the scenes.",
  },
  {
    id: "exp_c6_solar_cooker",
    title: "Cardboard Box Solar Heat Concentrator",
    badge: "Solar Engineer",
    categoryLabel: "Science & Discovery",
    categories: ["Science & Discovery", "Nature & Environment", "Technology & Building"],
    suitableClasses: ["Class 6", "Class 7"],
    shortDescription: "Build a miniature greenhouse solar oven from a shoebox, foil, and plastic wrap that traps solar rays to melt cheese or chocolate.",
    whatYouCanTry: "Line the inside of a shoe box with aluminum foil, cover the opening with clear cling film, and measure how hot it gets in 15 minutes of sun.",
    whatYouWillLearn: "Greenhouse effect, reflective angles, thermal insulation, and renewable solar energy.",
    estimatedTime: "30 mins",
    difficulty: "Medium",
    materialsNeeded: ["Small shoebox", "Aluminum foil", "Clear plastic wrap", "Black paper", "Thermometer or chocolate square"],
    challengeSteps: [
      "Tape black paper to the bottom inside of the box to absorb heat.",
      "Line the angled lid with shiny foil to bounce sunlight into the box.",
      "Seal the top tightly with transparent cling wrap and place in direct sunlight.",
    ],
    suggestedWhy: "Combines hands-on building with renewable energy science and outdoor experiments.",
  },
  {
    id: "exp_logic_mysteries",
    title: "Mathematical Puzzles & Secret Ciphers",
    badge: "Logic & Mystery",
    categoryLabel: "Analysis & Logic",
    categories: ["Problem Solving", "Analysis & Logic"],
    suitableClasses: ["Class 6", "Class 7"],
    shortDescription: "Crack secret codes, invent substitution ciphers, and solve pattern riddles that challenge your detective brain.",
    whatYouCanTry: "Write and decode secret messages using a Caesar cipher wheel, then test if a friend can break your coded puzzle.",
    whatYouWillLearn: "Algorithmic thinking, substitution encryption, pattern recognition, and systematic deduction.",
    estimatedTime: "20 mins",
    difficulty: "Easy",
    materialsNeeded: ["Paper", "Pencil", "Alphabet strip"],
    challengeSteps: [
      "Write the alphabet A–Z and shift each letter by +3 (A becomes D, B becomes E).",
      "Encrypt a secret 5-word message about an imaginary mission.",
      "Provide a reverse decryption clue and challenge a family member to solve it.",
    ],
    suggestedWhy: "Challenges your love for solving riddles, cracking codes, and logic games.",
  },
  {
    id: "exp_imaginary_invention",
    title: "Design an Imaginary Invention for the Future",
    badge: "Future Inventor",
    categoryLabel: "Technology & Software",
    categories: ["Technology & Building", "Creativity & Media"],
    suitableClasses: ["Class 5", "Class 6"],
    shortDescription: "Brainstorm and illustrate a clever futuristic invention that solves an everyday problem in the year 2050.",
    whatYouCanTry: "Draw a detailed invention blueprint for a solar-powered ocean cleaner or a homework-organizing robot.",
    whatYouWillLearn: "Design thinking, futuristic empathy, blueprint annotation, and environmental problem-solving.",
    estimatedTime: "25 mins",
    difficulty: "Easy",
    materialsNeeded: ["Paper", "Colored pens", "Ruler"],
    challengeSteps: [
      "Pick one real-world problem you want your invention to solve.",
      "Draw the invention with labels pointing to its power source, sensors, and user buttons.",
      "Write a short 3-sentence user manual explaining how a family would operate it.",
    ],
    suggestedWhy: "Unlocks your imagination to design positive inventions that help people and the planet.",
  },
  {
    id: "exp_community_helping",
    title: "Community Helping & School Leadership",
    badge: "Community Leader",
    categoryLabel: "Social Impact & People",
    categories: ["Helping & People", "Social Impact & People"],
    suitableClasses: ["Class 6", "Class 7"],
    shortDescription: "Learn how listening, organizing book swaps, and teamwork make school and neighborhoods friendlier and more collaborative.",
    whatYouCanTry: "Design a colorful poster for a classroom book swap corner where students can exchange favorite adventure novels.",
    whatYouWillLearn: "Collaborative leadership, active listening, community empathy, and inclusive project planning.",
    estimatedTime: "25 mins",
    difficulty: "Easy",
    materialsNeeded: ["Card paper", "Colored markers"],
    challengeSteps: [
      "Interview 2 classmates about what books or games they'd love to share.",
      "Draft 3 fair guidelines for sharing and returning books safely.",
      "Create a bright, welcoming announcement poster.",
    ],
    suggestedWhy: "Builds on your strength in helping others, working with friends, and solving practical community dilemmas.",
  },

  // ---------------------------------------------------------------------------
  // CLASS 6 & 7 NATURE / ENVIRONMENT / OUTDOOR INVESTIGATIONS
  // ---------------------------------------------------------------------------
  {
    id: "exp_nature_detective",
    title: "Nature Observation & Habitat Journals",
    badge: "Nature Detective",
    categoryLabel: "Nature & Environment",
    categories: ["Nature & Environment", "Science & Discovery"],
    suitableClasses: ["Class 5", "Class 6"],
    shortDescription: "Explore plants, insects, and wildlife in your neighborhood like a detective, recording discoveries in an illustrated field notebook.",
    whatYouCanTry: "Map a 1-meter square micro-habitat near a tree or balcony pot, cataloging 3 plant leaves and every tiny insect you spot.",
    whatYouWillLearn: "Botanical leaf vein patterns, insect observation, habitat recording, and environmental awareness.",
    estimatedTime: "25 mins",
    difficulty: "Easy",
    materialsNeeded: ["Field notebook or paper", "Pencil", "Magnifying glass (optional)"],
    challengeSteps: [
      "Find an outdoor tree, balcony garden, or park corner for a 10-minute quiet study.",
      "Sketch 3 distinct fallen leaves, noting their serrated edges and vein paths.",
      "Watch quietly for pollinators and write down what insects visit which flowers.",
    ],
    suggestedWhy: "Connects with your curiosity about plants, animals, and exploring the outdoors.",
  },
  {
    id: "exp_c7_water_filtration",
    title: "Multi-Stage DIY Water Filtration Column",
    badge: "Eco Hydrologist",
    categoryLabel: "Nature & Environment",
    categories: ["Nature & Environment", "Science & Discovery"],
    suitableClasses: ["Class 7"],
    shortDescription: "Engineer a water filtration column using sand, gravel, activated charcoal, and cotton to clarify cloudy rainwater.",
    whatYouCanTry: "Cut an inverted plastic bottle into a funnel, layer coarse stones, fine sand, and charcoal, and pour muddy water through to measure clarity.",
    whatYouWillLearn: "Physical particulate filtration, adsorption of odors, turbidity, and environmental watershed protection.",
    estimatedTime: "30 mins",
    difficulty: "Medium",
    materialsNeeded: ["Clear 1-liter plastic bottle", "Cotton ball", "Fine sand", "Gravel / pebbles", "Powdered charcoal", "Dirty water sample"],
    challengeSteps: [
      "Cut the bottom off a plastic bottle and invert it into a glass receiver.",
      "Plug the neck with cotton, then add successive layers of charcoal, sand, and pebbles.",
      "Slowly pour muddy water in and observe the clarified drops collect below!",
    ],
    suggestedWhy: "Tailored to your passion for environmental protection, clean water solutions, and outdoor science.",
  },
  {
    id: "exp_c7_weather_station",
    title: "DIY Anemometer & Rain Gauge Weather Station",
    badge: "Meteorologist",
    categoryLabel: "Nature & Environment",
    categories: ["Nature & Environment", "Science & Discovery", "Technology & Building"],
    suitableClasses: ["Class 7"],
    shortDescription: "Build a revolving cup anemometer and calibrated rain gauge to track real-time wind speed and rainfall on your balcony or roof.",
    whatYouCanTry: "Assemble 4 paper cups on crossed straws with a central pushpin to count rotations per minute during afternoon breezes.",
    whatYouWillLearn: "Aerodynamics, wind measurement, meteorological logging, and micro-climate patterns.",
    estimatedTime: "30 mins",
    difficulty: "Medium",
    materialsNeeded: ["4 small paper cups (one colored differently)", "2 drinking straws", "Pushpin", "Pencil with eraser top"],
    challengeSteps: [
      "Staple straws in an X-shape and attach a paper cup facing the same direction to each end.",
      "Pin the center through the pencil eraser so the anemometer spins freely.",
      "Count how many times the colored cup revolves in 30 seconds outside!",
    ],
    suggestedWhy: "Appeals to your interest in meteorology, outdoor observation, and building environmental instruments.",
  },
  {
    id: "exp_c7_biodiversity_quadrat",
    title: "Ecological Micro-Habitats & Quadrat Survey",
    badge: "Field Ecologist",
    categoryLabel: "Nature & Environment",
    categories: ["Nature & Environment", "Science & Discovery"],
    suitableClasses: ["Class 6", "Class 7"],
    shortDescription: "Perform a standardized 1-meter square biodiversity quadrat survey in a local park or garden, calculating species density.",
    whatYouCanTry: "Tie four 1-meter sticks with string to form a quadrat frame, place it on grass, and count every distinct insect and plant inside.",
    whatYouWillLearn: "Ecological sampling methods, biodiversity density, species richness, and soil health indicators.",
    estimatedTime: "30 mins",
    difficulty: "Medium",
    materialsNeeded: ["1-meter square string loop or 4 rulers", "Field notebook", "Pencil", "Smartphone for photo log (optional)"],
    challengeSteps: [
      "Lay your 1m² quadrat down gently in an undisturbed grassy or garden area.",
      "Spend 15 minutes systematically recording every distinct weed, grass, insect, or worm.",
      "Calculate what percentage of the ground is covered by green foliage vs bare soil.",
    ],
    suggestedWhy: "Matches your deep interest in biological ecosystems, species identification, and outdoor field work.",
  },
  {
    id: "exp_c7_solar_distillation",
    title: "Solar Desalination & Clean Water Still",
    badge: "Clean Tech Pioneer",
    categoryLabel: "Nature & Environment",
    categories: ["Nature & Environment", "Science & Discovery"],
    suitableClasses: ["Class 7"],
    shortDescription: "Harness solar evaporation and condensation to extract pure distilled drinking water from salt water in a bowl-in-basin solar still.",
    whatYouCanTry: "Set a small empty cup in the middle of a saltwater bowl, cover with plastic wrap weighed down by a small pebble, and collect freshwater in the sun.",
    whatYouWillLearn: "Hydrologic water cycle, solar distillation, condensation physics, and global freshwater scarcity solutions.",
    estimatedTime: "25 mins",
    difficulty: "Easy",
    materialsNeeded: ["Large bowl with salty water", "Small empty ceramic cup", "Cling wrap", "Small clean pebble", "Sunny outdoor spot"],
    challengeSteps: [
      "Place the small empty cup upright in the center of the large salty bowl.",
      "Cover the large bowl tightly with cling film and place the pebble directly above the small cup.",
      "Leave in afternoon sun for 2 hours and taste the pure, salt-free water drops that condensate inside!",
    ],
    suggestedWhy: "Combines green technology, clean water innovations, and hands-on solar physics.",
  },
  {
    id: "exp_c7_soil_testing",
    title: "Soil Composition, pH & Percolation Study",
    badge: "Soil Detective",
    categoryLabel: "Nature & Environment",
    categories: ["Nature & Environment", "Science & Discovery"],
    suitableClasses: ["Class 7"],
    shortDescription: "Collect soil samples from three different locations to measure clay vs sand sediment settling speed, drainage, and acidity.",
    whatYouCanTry: "Shake soil with water in a tall glass bottle and observe how sand, silt, and clay separate into distinct geological layers over 20 minutes.",
    whatYouWillLearn: "Soil horizons, sediment settling velocities, drainage rates, and plant agriculture requirements.",
    estimatedTime: "25 mins",
    difficulty: "Medium",
    materialsNeeded: ["3 small soil samples (garden, roadside, potted plant)", "Clear glass jar with lid", "Water"],
    challengeSteps: [
      "Fill a glass jar 1/3 with soil and 2/3 with water, then shake vigorously for 1 minute.",
      "Let the jar sit quietly on a table and observe sand settling first, followed by fine silt and clay.",
      "Measure the thickness of each layer with a ruler to calculate soil composition percentage.",
    ],
    suggestedWhy: "Connects with your enthusiasm for earth sciences, geology, and environmental investigations.",
  },
  {
    id: "exp_c7_astronomy_sky",
    title: "Night Sky Constellation Watch & Polaris Finder",
    badge: "Sky Watcher",
    categoryLabel: "Nature & Environment",
    categories: ["Nature & Environment", "Science & Discovery"],
    suitableClasses: ["Class 6", "Class 7"],
    shortDescription: "Navigate the night sky using pointer stars in the Big Dipper (Saptarshi) to locate the North Star (Polaris) and track lunar crater shadows.",
    whatYouCanTry: "Step outside on a clear night, identify the 7 stars of Ursa Major, and trace an imaginary line through the front two stars to find Polaris.",
    whatYouWillLearn: "Celestial navigation, constellation patterns, Earth's rotational axis, and astronomical observation skills.",
    estimatedTime: "20 mins",
    difficulty: "Easy",
    materialsNeeded: ["Clear night sky", "Compass app or physical compass", "Field notebook"],
    challengeSteps: [
      "Find an unobstructed view facing North around 8:00 PM.",
      "Locate the characteristic kite/saucepan shape of Ursa Major (the Big Dipper).",
      "Extend a line five times the distance between pointer stars Merak and Dubhe to find Polaris!",
    ],
    suggestedWhy: "Fulfills your wonder about astronomy, night sky navigation, and space exploration.",
  },
];

// =============================================================================
// HELPER: EXTRACT EXACT STUDENT CLASS
// =============================================================================

export function extractStudentClass(params: {
  studentClass?: ValidChildClass | string | null;
  userProfile?: UserProfile | null;
  profile?: StudentIntelligenceProfile | null;
  startingPoint?: UserStartingPoint | null;
}): ValidChildClass {
  const { studentClass, userProfile, profile, startingPoint } = params;

  // 1. Explicit argument
  if (studentClass) {
    const raw = String(studentClass).trim().toLowerCase();
    if (raw.includes("4")) return "Class 4";
    if (raw.includes("5")) return "Class 5";
    if (raw.includes("6")) return "Class 6";
    if (raw.includes("7")) return "Class 7";
  }

  // 2. Authenticated user profile currentClass
  if (userProfile?.currentClass) {
    const raw = String(userProfile.currentClass).trim().toLowerCase();
    if (raw.includes("4")) return "Class 4";
    if (raw.includes("5")) return "Class 5";
    if (raw.includes("6")) return "Class 6";
    if (raw.includes("7")) return "Class 7";
  }

  // 3. Authenticated user profile academicStage
  if (userProfile?.academicStage) {
    const raw = String(userProfile.academicStage).trim().toLowerCase();
    if (raw === "class-4" || raw === "class 4" || raw === "classes-4") return "Class 4";
    if (raw === "class-5" || raw === "class 5" || raw === "classes-5") return "Class 5";
    if (raw === "class-6" || raw === "class 6" || raw === "classes-6") return "Class 6";
    if (raw === "class-7" || raw === "class 7" || raw === "classes-7") return "Class 7";
  }

  // 4. StartingPoint academicStage or answers
  if (startingPoint?.academicStage) {
    const raw = String(startingPoint.academicStage).trim().toLowerCase();
    if (raw === "class-4" || raw === "class 4") return "Class 4";
    if (raw === "class-5" || raw === "class 5") return "Class 5";
    if (raw === "class-6" || raw === "class 6") return "Class 6";
    if (raw === "class-7" || raw === "class 7") return "Class 7";
  }

  // 5. Demo / Persona academic context (development mode)
  if (profile?.academicContext?.type === "classes-4-7") {
    const cls = profile.academicContext.data?.currentClass;
    if (cls && ["Class 4", "Class 5", "Class 6", "Class 7"].includes(cls)) {
      return cls as ValidChildClass;
    }
  }

  // 6. Starting point answers keyword scan
  if (startingPoint?.answers) {
    for (const ans of Object.values(startingPoint.answers)) {
      const lower = String(ans).toLowerCase();
      if (lower.includes("class 4") || lower.includes("grade 4")) return "Class 4";
      if (lower.includes("class 5") || lower.includes("grade 5")) return "Class 5";
      if (lower.includes("class 6") || lower.includes("grade 6")) return "Class 6";
      if (lower.includes("class 7") || lower.includes("grade 7")) return "Class 7";
    }
  }

  // Default fallback for Classes 4–7 middle school
  return "Class 6";
}

// =============================================================================
// RECOMMENDATION ALGORITHM: EXACT CLASS + INTEREST-BASED SCORING
// =============================================================================

export function getPersonalizedChildExplorations(params: {
  studentClass?: ValidChildClass | string | null;
  startingPoint?: UserStartingPoint | null;
  activeInterests?: string[];
  completedActivity?: StudentNextMoveActivity | null;
  profile?: StudentIntelligenceProfile | null;
  userProfile?: UserProfile | null;
}): ChildExploration[] {
  const { studentClass, startingPoint, activeInterests, completedActivity, profile, userProfile } = params;

  // 1. Resolve exact student class
  const targetClass = extractStudentClass({
    studentClass,
    userProfile,
    profile,
    startingPoint,
  });

  // 2. STRICT CLASS FILTERING: Disqualify any activity not suitable for this exact class
  const eligibleExplorations = CHILD_EXPLORATIONS_CATALOG.filter((exp) =>
    exp.suitableClasses.includes(targetClass)
  );

  // 3. Extract interest signals
  const interests =
    activeInterests ||
    startingPoint?.activeInterests ||
    [];

  const answers = startingPoint?.answers || {};
  const primaryFocus = startingPoint?.primaryFocus?.toLowerCase() || "";
  const answersText = Object.values(answers).join(" ").toLowerCase();

  // 4. Score each eligible exploration
  interface ScoredExploration {
    exploration: ChildExploration;
    score: number;
  }

  const scored: ScoredExploration[] = eligibleExplorations.map((exp) => {
    let score = 0;

    // A. Active Interests Match
    interests.forEach((interest, index) => {
      const isPrimary = index === 0;
      if (exp.categories.includes(interest)) {
        score += isPrimary ? 20 : 10;
      }
    });

    // B. Answers Text Semantic Match
    const expCategoriesText = exp.categories.join(" ").toLowerCase();

    // Creativity / Storytelling signals
    if (
      answersText.includes("drawing") ||
      answersText.includes("painting") ||
      answersText.includes("art") ||
      answersText.includes("craft") ||
      answersText.includes("creating")
    ) {
      if (exp.categories.includes("Creativity & Media")) score += 8;
    }
    if (
      answersText.includes("stories") ||
      answersText.includes("imagining") ||
      answersText.includes("story") ||
      answersText.includes("reading")
    ) {
      if (exp.categories.includes("Stories & Imagination")) score += 8;
    }

    // Technology / Building / Tinkering signals
    if (
      answersText.includes("building") ||
      answersText.includes("fixing") ||
      answersText.includes("machines") ||
      answersText.includes("robots") ||
      answersText.includes("technology")
    ) {
      if (exp.categories.includes("Technology & Building")) score += 10;
    }

    // Science / Experiments signals
    if (
      answersText.includes("science") ||
      answersText.includes("experiment") ||
      answersText.includes("experiments") ||
      answersText.includes("how things work")
    ) {
      if (exp.categories.includes("Science & Discovery")) score += 10;
    }

    // Nature / Environment signals
    if (
      answersText.includes("nature") ||
      answersText.includes("animals") ||
      answersText.includes("plants") ||
      answersText.includes("outdoors") ||
      answersText.includes("adventure")
    ) {
      if (exp.categories.includes("Nature & Environment")) score += 10;
    }

    // Puzzles / Logic signals
    if (
      answersText.includes("puzzle") ||
      answersText.includes("mystery") ||
      answersText.includes("solving") ||
      answersText.includes("riddle")
    ) {
      if (exp.categories.includes("Problem Solving") || exp.categories.includes("Analysis & Logic")) {
        score += 8;
      }
    }

    // C. Primary Focus match
    if (primaryFocus) {
      if (primaryFocus.includes("creative") || primaryFocus.includes("drawing")) {
        if (expCategoriesText.includes("creativity") || expCategoriesText.includes("stories")) score += 6;
      }
      if (primaryFocus.includes("building") || primaryFocus.includes("machines") || primaryFocus.includes("technology")) {
        if (expCategoriesText.includes("technology") || expCategoriesText.includes("problem solving")) score += 6;
      }
      if (primaryFocus.includes("science") || primaryFocus.includes("experiment")) {
        if (expCategoriesText.includes("science")) score += 6;
      }
      if (primaryFocus.includes("nature") || primaryFocus.includes("animals")) {
        if (expCategoriesText.includes("nature")) score += 6;
      }
    }

    // D. Completed Activity Continuity Boost
    if (completedActivity?.status === "completed") {
      const actId = completedActivity.activityId;
      if (actId === "act_cardboard_machine" && exp.categories.includes("Technology & Building")) score += 8;
      if (actId === "act_comic_story" && exp.categories.includes("Creativity & Media")) score += 8;
      if (actId === "act_kitchen_science" && exp.categories.includes("Science & Discovery")) score += 8;
    }

    // E. Demo Persona fallback signals (when using dev demo personas)
    if (profile?.interests) {
      const catIds = profile.interests.selectedCategoryIds || [];
      const subIds = profile.interests.selectedSubInterestIds || [];
      const statement = profile.clarity?.studentStatement?.toLowerCase() || "";

      if (catIds.includes("creativity") && expCategoriesText.includes("creativity")) score += 10;
      if (subIds.includes("creat_storytelling") && expCategoriesText.includes("stories")) score += 8;
      if (subIds.includes("creat_visual_design") && expCategoriesText.includes("creativity")) score += 6;

      // Nature & living world signals
      if (
        (catIds.includes("nature") || subIds.includes("sci_biology_life") || statement.includes("animals") || statement.includes("nature")) &&
        expCategoriesText.includes("nature")
      ) {
        score += 14;
        if (exp.id === "exp_nature_detective" || exp.shortDescription.toLowerCase().includes("wildlife")) {
          score += 6;
        }
      }

      if (catIds.includes("science_discovery") && expCategoriesText.includes("science")) score += 8;
      if (catIds.includes("technology") && expCategoriesText.includes("technology")) score += 8;
    }

    return { exploration: exp, score };
  });

  // 5. Rank scored items descending
  scored.sort((a, b) => b.score - a.score);

  // 6. Selection: prioritize positive relevance matches
  const relevantMatches = scored.filter((s) => s.score > 0).map((s) => s.exploration);

  // If we have at least 4 genuinely relevant matches, present up to 6 of them (strictly matching interests)
  if (relevantMatches.length >= 4) {
    return relevantMatches.slice(0, 6);
  }

  // If few or no specific interests recorded yet, provide the best scored items within the exact class
  const finalResults: ChildExploration[] = [];
  for (const s of scored) {
    if (!finalResults.some((r) => r.id === s.exploration.id)) {
      finalResults.push(s.exploration);
    }
    if (finalResults.length >= 6) break;
  }

  return finalResults.slice(0, 6);
}

// =============================================================================
// PERSONALIZED CONTEXT EXPLANATION SUBTITLE
// =============================================================================

export function getChildExplorationsExplanation(params: {
  studentClass?: ValidChildClass | string | null;
  startingPoint?: UserStartingPoint | null;
  activeInterests?: string[];
  completedActivity?: StudentNextMoveActivity | null;
  profile?: StudentIntelligenceProfile | null;
  userProfile?: UserProfile | null;
}): string {
  const { studentClass, startingPoint, activeInterests, completedActivity, profile, userProfile } = params;

  const targetClass = extractStudentClass({
    studentClass,
    userProfile,
    profile,
    startingPoint,
  });

  const interests = activeInterests || startingPoint?.activeInterests || [];
  const primary = interests[0] || "";
  const answersText = Object.values(startingPoint?.answers || {}).join(" ").toLowerCase();

  if (completedActivity && completedActivity.status === "completed") {
    return `Awesome job completing "${completedActivity.title}"! Based on what you enjoy doing in your Starting Point and recent hands-on effort, here are ${targetClass} experiences and mini-challenges to explore next.`;
  }

  if (primary.includes("Creativity") || primary.includes("Stories") || answersText.includes("drawing") || answersText.includes("painting")) {
    return `Based on what you enjoy doing in your Starting Point — hands-on drawing, art, and creative storytelling curated specifically for your ${targetClass} exploration without any pressure to choose a career!`;
  }

  if (primary.includes("Technology") || primary.includes("Building") || answersText.includes("building") || answersText.includes("machines")) {
    return `Based on what you enjoy doing in your Starting Point — building, tinkering, and seeing how machines work curated specifically for your ${targetClass} exploration!`;
  }

  if (primary.includes("Nature") || primary.includes("Science") || answersText.includes("nature") || answersText.includes("plants") || answersText.includes("animals")) {
    return `Based on what you enjoy doing in your Starting Point — observing wildlife, plants, and environmental science curated specifically for your ${targetClass} exploration!`;
  }

  if (primary.includes("Problem") || primary.includes("Logic") || answersText.includes("puzzle") || answersText.includes("mystery")) {
    return `Based on what you enjoy doing in your Starting Point — solving puzzles, riddles, and secret codes curated specifically for your ${targetClass} exploration!`;
  }

  return `Based on what you enjoy doing in your Starting Point. In ${targetClass}, exploration is about trying fun experiences and discovering what you enjoy without any adult career pressure!`;
}
