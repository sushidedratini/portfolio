"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const ICONS_PATH = '/portfolio/images/icons/win98_icons';

// Always 12-hour format, e.g. "11:18 PM". Newer ICU puts a narrow no-break space before AM/PM; normalize it.
const formatTime = (date: Date) =>
  date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(/ /g, ' ');
const formatDate = (date: Date) => date.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

/** Notification area at the right end of the taskbar: tray icons + clock. */
const SystemTray = () => {
  // Set on the client only, so the static export doesn't freeze the build time.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 h-8 mr-0.5 pl-1.5 pr-2.5 select-none
      border border-t-win98-dark-gray border-l-win98-dark-gray border-b-white border-r-white">
      {/* TODO: clicking opens the volume control */}
      <button className="flex items-center" title="Volume">
        <Image src={`${ICONS_PATH}/loudspeaker_rays-1.png`} alt="Volume" width={16} height={16} />
      </button>

      {/* TODO: double-clicking opens Date/Time properties */}
      <span className="font-win98 whitespace-nowrap" title={now ? formatDate(now) : undefined}>
        {now ? formatTime(now) : ''}
      </span>
    </div>
  );
};

export default SystemTray;
