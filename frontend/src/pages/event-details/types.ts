import type { LucideIcon } from 'lucide-react';
import type { EventItem } from '@/entities/event/types';

export type EventDetailsTab = 'about' | 'speakers';

export type EventFact = { icon: LucideIcon; label: string; value: string };

export type { EventItem };
