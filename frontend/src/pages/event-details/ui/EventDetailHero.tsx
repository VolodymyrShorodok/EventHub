import { Bookmark, Share2 } from 'lucide-react';

type EventDetailHeroT = {
  eventImg: string;
};

export function EventDetailHero({ eventImg }: EventDetailHeroT) {
  return (
    <div className="detail-hero">
      <img src={eventImg} className='detail-hero-img' alt="" />
      <div className="detail-hero-actions">
        <button>
          <Bookmark size={14} /> Save
        </button>
        <button>
          <Share2 size={14} /> Share
        </button>
      </div>
    </div>
  );
}
