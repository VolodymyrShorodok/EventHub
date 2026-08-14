import { eventDetailsTabs } from '../helpers/tabs';
import type { EventDetailsTab } from '../helpers/types';

type Props = { activeTab: EventDetailsTab; onChange: (tab: EventDetailsTab) => void };

export function EventDetailsTabs({ activeTab, onChange }: Props) {
  return (
    <div className="detail-tabs">
      {eventDetailsTabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={activeTab === tab.value ? 'active' : ''}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
