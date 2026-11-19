import React from 'react';
import Grip from './Grip';

/**
 * The grooved container that stacks command bands (menu bar, toolbar...)
 * at the top of Explorer-like windows.
 */
export const Rebar = ({ children }: { children: React.ReactNode }) => {
  const bands = React.Children.toArray(children).filter(Boolean);

  return (
    <div className="flex flex-col my-0.5 border-t-2 border-2 border-win98-dark-gray">
      {bands.map((band, index) => (
        <React.Fragment key={index}>
          {index > 0 && <hr className="border-t-2 border-t-win98-dark-gray" />}
          {band}
        </React.Fragment>
      ))}
    </div>
  );
};

interface RebarBandProps {
  children: React.ReactNode;
  /** Optional content pinned to the right edge of the band. */
  trailing?: React.ReactNode;
}

export const RebarBand = ({ children, trailing }: RebarBandProps) => (
  <section className="flex flex-row justify-between border-t-2 border-t-white border-l-2 border-l-white">
    <div className="flex items-start mx-0.5 bg-win98-gray text-black text-xs select-none">
      <div className="flex items-start my-0.5">
        <Grip className="h-5 mr-1" />
        {children}
      </div>
    </div>
    {trailing}
  </section>
);
