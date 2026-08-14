import { Search } from 'lucide-react';

type Props = { value: string; onChange: (value: string) => void };

export function EventSearch({ value, onChange }: Props) {
  return (
    <label className="flex h-7 w-full max-w-[275px] items-center gap-2 border border-slate-200 px-2 text-slate-400">
      <Search size={11} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full text-[10px] text-slate-700 outline-none placeholder:text-slate-400"
        placeholder="Search titles or locations..."
      />
    </label>
  );
}
