import { ReactNode } from 'react';

interface PixelSceneProps {
  children: ReactNode;
}

export function PixelScene({ children }: PixelSceneProps) {
  return (
    <div className="w-full relative bg-[#1A1829] overflow-hidden select-none">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-2 left-6 w-1 h-1 bg-white" />
        <div className="absolute top-5 left-20 w-1 h-1 bg-[#FDE047]" />
        <div className="absolute top-8 left-48 w-1 h-1 bg-white" />
        <div className="absolute top-3 right-12 w-1 h-1 bg-white" />
        <div className="absolute top-6 right-36 w-1 h-1 bg-[#FDE047]" />
        <div className="absolute top-10 right-64 w-1 h-1 bg-white" />
      </div>
      <div className="w-full relative z-10">
        {children}
      </div>
    </div>  );
}