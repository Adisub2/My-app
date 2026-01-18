
export interface District {
  id: string;
  name: string;
  hindiName: string;
  description: string;
  culture: string;
  image: string;
  landmarks: string[];
}

export interface ItineraryItem {
  day: number;
  location: string;
  activity: string;
  time: string;
  costEstimate: string;
  safetyTip: string;
}

export interface Post {
  id: string;
  user: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  location: string;
  timestamp: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface SearchResult {
  text: string;
  sources: GroundingSource[];
}

export type ViewState = 'home' | 'explore' | 'vr' | 'planner' | 'maps' | 'community' | 'about';
