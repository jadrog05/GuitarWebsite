export type Session = {
    sessionId: string;
    sessionType: 'theory' | 'technique' | 'learn';
    start: string;
    completed: string;
    confidence: number;
    items: string[];
  };

  export type User = {
    Exists : boolean;
  }
  