import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

type LoaderProps = {
  className?: string;
} & Pick<ComponentPropsWithoutRef<'span'>, 'aria-label'>;

export function Loader({ className, ...props }: LoaderProps) {
  return (
    <span
      className={clsx(
        'inline-block size-5 animate-spin rounded-full border-2 border-slate-200 border-t-primary',
        className,
      )}
      aria-label="Loading"
      {...props}
    />
  );
}

export function FullScreenLoader() {
  return (
    <main className="flex h-full min-h-[240px] items-center justify-center grow">
      <Loader className="size-50" />
    </main>
  );
}
