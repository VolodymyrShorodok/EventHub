import { CalendarDays, Info } from 'lucide-react';

export function OrganizerCard({ creator }: { creator: string }) {
  return (
    <>
      <section className="host-card">
        <b>Hosted by</b>
        <div className="host-profile">
          <span>
            <CalendarDays size={17} />
          </span>
          <p>
            <strong>{creator}</strong>
            <small>Verified Organizer</small>
          </p>
        </div>
        <button>Contact Organizer</button>
      </section>
      <div className="help-tip">
        <Info size={16} />
        <p>
          <b>Helpful tip</b>
          <span>
            Group registration for 5+ people qualifies for a 15% discount. Contact our sales team
            for more info.
          </span>
        </p>
      </div>
    </>
  );
}
