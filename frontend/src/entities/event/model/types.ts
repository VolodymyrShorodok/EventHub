export type EventSpeaker = {
  name: string;
  role: string;
  color: string;
};

export type EventTag = 'AI' | 'Frontend' | 'New Technology' | 'Backend' | 'Mobile';

export type EventItem = {
  id: number;
  title: string;
  category: EventTag[];
  img: string;
  date: string;
  time: string;
  location: string;
  description: string;
  color?: string;
  totalPeople: number;
  speakers: EventSpeaker[];
  benefits?: string[];
  createdBy: string;
};

export type BaseEvent = Omit<EventItem, 'schedule' | 'speakers' | 'totalPeople'>;
