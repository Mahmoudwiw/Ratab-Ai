export interface WaitlistEntry {
  email: string;
  role?: string;
  timestamp: number;
  queueNumber: number;
}

export interface BottleState {
  waterPercentage: number; // 0 to 100
  totalCapacityMl: number;
  currentIntakeMl: number;
  isReminding: boolean;
  isLifting: boolean;
  lastDrinkTime: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  track: string;
  contribution: string;
  avatarUrl?: string;
  initials: string;
}

export interface PitchDeckSlide {
  id: number;
  title: string;
  shortTitle: string;
  isDark?: boolean;
  speakerNotes: string;
}
