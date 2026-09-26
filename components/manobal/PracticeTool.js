'use client';

import BreathingTool from './BreathingTool';
import GroundingTool from './GroundingTool';
import ThoughtRecord from './ThoughtRecord';
import MoodTracker from './MoodTracker';
import FocusTimer from './FocusTimer';
import GratitudeJournal from './GratitudeJournal';
import CareerCompass from './CareerCompass';

const TOOLS = {
  breathing: BreathingTool,
  grounding: GroundingTool,
  'thought-record': ThoughtRecord,
  mood: MoodTracker,
  'focus-timer': FocusTimer,
  gratitude: GratitudeJournal,
  career: CareerCompass,
};

/** Renders one of the Manobal interactive practices by key. */
export default function PracticeTool({ tool, ...props }) {
  const Cmp = TOOLS[tool];
  return Cmp ? <Cmp {...props} /> : null;
}
