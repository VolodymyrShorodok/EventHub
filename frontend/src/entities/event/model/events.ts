import type { EventItem, EventSpeaker } from './types';

type BaseEvent = Omit<EventItem, 'schedule' | 'speakers' | 'totalPeople'>;

const speakers: EventSpeaker[] = [
  {
    name: 'Dr. Maya Patel',
    role: 'AI Research Director, Luma Labs',
    color: '#5b7cfa',
  },
  { name: 'Jordan Lee', role: 'VP of Product, Northstar', color: '#2d9ce9' },
  { name: 'Sofia Martinez', role: 'Founder, Horizon Studio', color: '#bb5bd4' },
  { name: 'David Chen', role: 'Growth Lead, Orbit Systems', color: '#e57965' },
];

const baseEvents: BaseEvent[] = [
  {
    id: 1,
    img: '../../../public/images.jpg',
    title: 'Future of AI: 2024 Global Summit',
    category: ['New Technology'],
    date: 'Oct 24, 2024',
    time: '10:00 AM',
    location: 'Online',
    description:
      'A deep dive into generative models, ethical AI frameworks, and the next decade of innovation.',
    color: 'violet',
    benefits: ['Coffee', 'Cookies'],
    createdBy: 'BigTech company',
  },
  {
    id: 2,
    img: '../../../public/images.jpg',
    title: 'Product Design Craftsmanship Workshop',
    category: ['Backend'],
    date: 'Nov 05, 2024',
    time: '02:00 PM',
    location: 'Design District, New York',
    description:
      'Hands-on session focusing on high-fidelity prototyping, design systems, and user-centric thinking.',
    color: 'blue',
    createdBy: 'Prod company',
  },
  {
    id: 3,
    title: 'SaaS Growth & Marketing Masterclass',
    img: '../../../public/images.jpg',
    category: ['AI', 'Frontend'],
    date: 'Dec 12, 2024',
    time: '09:00 AM',
    location: 'Virtual Event',
    description: 'Learn the exact playbooks used by top SaaS companies to scale from $1M to $50M.',
    color: 'pink',
    createdBy: 'BigTech company',
  },
  {
    id: 4,
    title: 'Sustainability in Modern Business',
    img: '../../../public/images.jpg',
    category: ['New Technology', 'Backend'],
    date: 'Sep 15, 2024',
    time: '11:30 AM',
    location: 'Green Hall, London',
    description:
      'Exploring how environmental responsibility and profitability go hand-in-hand in the 21st century.',
    color: 'indigo',
    createdBy: 'Prod company',
  },
  {
    id: 5,
    title: 'Startup Pitch Night: Winter Batch',
    img: '../../../public/images.jpg',
    category: ['AI'],
    date: 'Oct 20, 2024',
    time: '06:00 PM',
    location: 'Innovation Hub, Austin',
    description:
      'Join us for an evening of networking and high-stakes pitches from 12 promising startups.',
    color: 'cyan',
    createdBy: 'Supported by portal',
  },
];

export const events: EventItem[] = baseEvents.map((event, index) => ({
  ...event,
  totalPeople: [842, 86, 317, 221, 144][index],
  speakers: speakers.map((speaker, speakerIndex) => ({
    ...speaker,
    color: speakers[(speakerIndex + index) % speakers.length].color,
  })),
}));
