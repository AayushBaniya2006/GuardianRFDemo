"use client";

import { HudPanel } from "./HudPanel";
import type { LogEvent } from "./scene/types";

interface EventLogProps {
  events: LogEvent[];
}

const typeColors: Record<LogEvent["type"], string> = {
  detected: "text-accent",
  classified: "text-accent",
  reacquired: "text-amber-400",
  lost: "text-red-400",
};

export function EventLog({ events }: EventLogProps) {
  return (
    <HudPanel title="Event Log" className="w-[280px]">
      <div className="space-y-1">
        {events.length === 0 && (
          <div className="text-white/30">Awaiting events...</div>
        )}
        {events.map((evt, i) => (
          <div
            key={`${evt.time}-${i}`}
            className="flex items-start gap-2"
            style={{
              opacity: 1 - i * 0.15,
            }}
          >
            <span className="shrink-0 text-white/30">{evt.time}</span>
            <span className={typeColors[evt.type]}>{evt.message}</span>
          </div>
        ))}
      </div>
    </HudPanel>
  );
}
