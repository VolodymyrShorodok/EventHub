import { Search } from 'lucide-react';
import { Input } from '@/shared/ui/Input';

type Props = { value: string; onChange: (value: string) => void };

export function EventSearch({ value, onChange }: Props) {
  return (
    <label className="flex h-7 w-full max-w-68.75 items-center gap-2 border border-slate-200 px-2 text-slate-400">
      <Search size={11} />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-auto w-full rounded-none border-0 bg-transparent px-0 text-overline text-slate-700 outline-none placeholder:text-slate-400 focus:ring-0"
        placeholder="Search titles or locations..."
      />
    </label>
  );
}
