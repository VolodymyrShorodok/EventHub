import { CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Brand() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-heading-3 font-semibold tracking-[-0.03em] text-slate-800"
    >
      <span className="grid size-7 place-items-center rounded-[8px] bg-primary text-white shadow-sm">
        <CalendarDays size={15} strokeWidth={2.5} />
      </span>
      Event Hub
    </Link>
  );
}
