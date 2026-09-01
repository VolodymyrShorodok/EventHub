import { Sparkles } from 'lucide-react';

export function OrbitIllustration() {
  return (
    <div className="relative grid h-[285px] w-full place-items-center overflow-hidden rounded-[14px] border border-border-illustration bg-illustration-radial">
      <div className="absolute -ml-[70px] h-[82px] w-[82px] rounded-full bg-illustration-blue/90 blur-[0.2px]" />
      <div className="absolute mr-[-70px] mt-[14px] h-[70px] w-[70px] rounded-full bg-illustration-indigo/80 blur-[0.2px]" />
      <div className="absolute ml-[68px] -mt-[40px] h-[46px] w-[46px] rounded-full bg-illustration-light" />
      <div className="absolute h-[92px] w-[220px] rotate-[-22deg] rounded-full border border-illustration-border" />
      <Sparkles
        className="relative z-10 text-illustration-icon"
        size={46}
        fill="var(--color-illustration-fill)"
      />
    </div>
  );
}
