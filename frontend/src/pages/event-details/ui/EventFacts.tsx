import type { EventItem } from '../../../entities/event/model/types';
import { getEventFacts } from '../helpers/getEventFacts';

export function EventFacts({ event }: { event: EventItem }) {
  return (
    <div className="detail-facts">
      {getEventFacts(event).map(({ icon: Icon, label, value }) => (
        <div className="detail-fact" key={label}>
          <span>
            <Icon size={19} />
          </span>
          <p>
            <small>{label}</small>
            <b>{value}</b>
          </p>
        </div>
      ))}
    </div>
  );
}
