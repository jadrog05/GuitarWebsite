export type SessionCard = {
  id: string;
  type: 'theory' | 'technique' | 'learn';
  startedAt: string;
  completedAt: string | null;
  confidenceRating: number | null;
  title: string | null;
  itemCount: number;
};

export type User = {
  id: string;
  auth0Sub: string;
  name: string | null;
  email: string | null;
  genres: string[];
  favoriteArtists: string[];
  experienceLevel: string | null;
  experienceDescription: string | null;
  createdAt: string;
  tags: string[]; // just tag labels, not full objects
};

export type Session = {
  id: string;
  userId: string;
  type: 'theory' | 'technique' | 'learn';
  startedAt: string;
  completedAt: string | null;
  confidenceRating: number | null;
  skipped: boolean;
  title: string | null;
  youtubeUrl: string | null;
  tabUrl: string | null;
  notes: string | null;
  items: SessionItem[];
};

export type SessionItem = {
  id: string;
  sessionId: string;
  instruction: string;
  explanation: string | null;
  youtubeUrl: string | null;
  tabUrl: string | null;
  position: number;
  completed: boolean;
  topicTag: string | null;
};

export type TopicProgress = {
  id: string;
  userId: string;
  topicTag: string;
  topicType: 'theory' | 'technique';
  confidenceRating: number;
  lastPracticed: string;
};

export type UserTag = {
  id: string;
  userId: string;
  label: string;
};

