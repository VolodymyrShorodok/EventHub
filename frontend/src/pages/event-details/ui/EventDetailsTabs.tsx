import { eventDetailsTabs } from '@/pages/event-details/helpers/tabs';
import type { EventDetailsTab } from '@/pages/event-details/helpers/types';

type Props = { activeTab: EventDetailsTab; onChange: (tab: EventDetailsTab) => void };

export function EventDetailsTabs({ activeTab, onChange }: Props) {
  return (
    <div className="mt-8 flex gap-7 border-b border-slate-200">
      {eventDetailsTabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={
            activeTab === tab.value
              ? 'border-b-2 border-primary pb-3 text-ui font-semibold text-slate-700'
              : 'border-b-2 border-transparent pb-3 text-ui font-semibold text-slate-400'
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
