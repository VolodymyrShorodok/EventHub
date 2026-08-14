export type EventScheduleItem = {
  time: string;
  title: string;
  description: string;
};

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
  schedule?: EventScheduleItem[];
  speakers: EventSpeaker[];
  benefits?: string[];
  createdBy: string;
};
