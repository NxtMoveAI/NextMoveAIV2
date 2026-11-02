/**
 * NEXT MOVE AI V2 — PARENT DASHBOARD MOCK DATA & ADAPTERS
 * 
 * Typed mock fixtures representing verified linked minor students.
 * Strictly bounded: unauthorized IDs cannot access data.
 */

import { type ParentProfile, type LinkedStudentSummary } from "../types";

export const MOCK_PARENT_PROFILE: ParentProfile = {
  id: "parent_sunita_sharma",
  name: "Sunita Sharma",
  email: "s.sharma@example.com",
  phone: "+91 98765 43210",
  relationship: "mother",
};

export const MOCK_LINKED_STUDENTS: LinkedStudentSummary[] = [
  {
    id: "student_aarav_9",
    name: "Aarav Sharma",
    academicStageId: "classes-8-10",
    academicStageLabel: "Class 9 • Secondary School",
    gradeLevel: "Class 9",
    schoolName: "Delhi Public School, R.K. Puram",
    age: 14,
    isMinor: true,
    lastActiveFormatted: "Today at 4:15 PM",
    consentStatus: "granted",
    exploredPathways: [
      {
        id: "ev-systems",
        title: "Clean Energy & Electric Vehicles",
        cluster: "Engineering & Applied Sciences",
        stream: "Science / STEM",
      },
      {
        id: "applied-robotics",
        title: "Robotics & Embedded Systems",
        cluster: "Technology & Computing",
        stream: "Science / STEM",
      },
      {
        id: "computational-math",
        title: "Data Science & Mathematical Modeling",
        cluster: "Mathematics & Computing",
        stream: "Science / Commerce with Math",
      },
    ],
    curiosityTopics: [
      "Solar Cell Efficiency",
      "Microcontroller Programming",
      "Sustainable Grid Design",
    ],
    practicalTrialsCount: 3,
    observations: [
      {
        id: "obs-1",
        activityTitle: "Household Energy Audit Simulation",
        category: "Applied Science",
        completedDate: "October 28, 2026",
        observationSummary: "Demonstrated systematic problem solving by identifying appliance phantom loads. Noted in his reflection that analyzing real electricity bills made theoretical physics far more relatable.",
        learningEvidenceType: "practical_trial",
      },
      {
        id: "obs-2",
        activityTitle: "Arduino Sensor Circuit Debugging",
        category: "Electronics",
        completedDate: "October 31, 2026",
        observationSummary: "Successfully isolated a ground wire fault without seeking external answers immediately. Exhibited patience and iterative troubleshooting.",
        learningEvidenceType: "practical_trial",
      },
      {
        id: "obs-3",
        activityTitle: "Starter Project: Mini Solar Tracker",
        category: "Engineering Project",
        completedDate: "November 2, 2026",
        observationSummary: "Completed Milestone 1 (Component Selection & Schematic Draft). Self-identified a preference for physical hardware over pure abstract coding.",
        learningEvidenceType: "project_artifact",
      },
    ],
    activeProjects: [
      {
        id: "proj-solar-tracker",
        title: "Miniature Dual-Axis Solar Tracker",
        status: "Active (Milestone 2 of 4)",
        currentMilestone: "Sensor calibration & light gradient testing",
      },
    ],
    discussionPrompts: [
      "Ask Aarav what surprised him most when measuring appliance energy usage at home.",
      "Discuss how robotics blends both mechanical hardware and software coding, and what balance he enjoys most.",
      "Support his exploration of Class 11 subject options without pressuring early stream lock-in.",
    ],
  },
  {
    id: "student_ananya_6",
    name: "Ananya Sharma",
    academicStageId: "classes-4-7",
    academicStageLabel: "Class 6 • Middle School",
    gradeLevel: "Class 6",
    schoolName: "Kendriya Vidyalaya, Sector 4",
    age: 11,
    isMinor: true,
    lastActiveFormatted: "Yesterday at 5:30 PM",
    consentStatus: "granted",
    exploredPathways: [
      {
        id: "wildlife-ecology",
        title: "Wildlife Biology & Ecosystem Conservation",
        cluster: "Life & Environmental Sciences",
        stream: "Science / Nature",
      },
      {
        id: "creative-storytelling",
        title: "Visual Storytelling & Animation",
        cluster: "Media, Arts & Design",
        stream: "Creative Arts",
      },
    ],
    curiosityTopics: [
      "Forest Canopy Biodiversity",
      "Stop-Motion Animation Basics",
      "Bird Migration Mapping",
    ],
    practicalTrialsCount: 2,
    observations: [
      {
        id: "obs-4",
        activityTitle: "Backyard Biodiversity Spotting Guide",
        category: "Life Sciences",
        completedDate: "October 29, 2026",
        observationSummary: "Carefully recorded 8 distinct local plant and insect species with hand-drawn field sketches. Showed strong attentiveness to detail and natural curiosity.",
        learningEvidenceType: "practical_trial",
      },
      {
        id: "obs-5",
        activityTitle: "Storyboarding a 30-Second Conservation Video",
        category: "Creative Media",
        completedDate: "November 1, 2026",
        observationSummary: "Created a 6-frame storyboard addressing plastic reduction in school canteens. Expressed eagerness to share ideas with classmates.",
        learningEvidenceType: "reflection",
      },
    ],
    activeProjects: [
      {
        id: "proj-nature-journal",
        title: "Local Eco-System Nature Journal",
        status: "Active (Milestone 1 of 3)",
        currentMilestone: "Collecting autumn leaf and soil samples",
      },
    ],
    discussionPrompts: [
      "Ask Ananya to show you her biodiversity sketchpad from her outdoor observation task.",
      "Celebrate her initiative in creating conservation stories rather than focusing on career definitions.",
    ],
  },
];

/**
 * Safe retrieval of linked student by ID.
 * Returns null if the ID is not an authorized linked child of this parent.
 */
export function getLinkedStudentById(studentId: string): LinkedStudentSummary | null {
  const match = MOCK_LINKED_STUDENTS.find((s) => s.id === studentId);
  return match || null;
}

