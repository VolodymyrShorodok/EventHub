import { Bookmark, Share2 } from 'lucide-react';

type EventDetailHeroT = {
  eventImg: string;
};

export function EventDetailHero({ eventImg }: EventDetailHeroT) {
  return (
    <div className="relative mt-[22px] max-h-[400px] overflow-hidden rounded-[10px]">
      <img src={eventImg} className="h-[400px] w-full object-cover" alt="" />
      <div className="absolute right-3 top-3 z-10 flex gap-2">
        <button className="flex h-[31px] items-center gap-2 rounded-md border border-slate-200 bg-white/95 px-3 text-ui-sm font-semibold text-slate-700">
          <Bookmark size={14} /> Save
        </button>
        <button className="flex h-[31px] items-center gap-2 rounded-md border border-slate-200 bg-white/95 px-3 text-ui-sm font-semibold text-slate-700">
          <Share2 size={14} /> Share
        </button>
      </div>
    </div>
  );
}
