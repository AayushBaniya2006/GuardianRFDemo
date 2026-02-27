"use client";

import { useEffect, useRef } from "react";
import type { DashboardEvent } from "@/hooks/useDashboardEvents";

type EventLogProps = {
  events: DashboardEvent[];
};

const LEVEL_COLORS: Record<DashboardEvent["level"], string> = {
  info: "text-white/30",
  warn: "text-amber-400",
  critical: "text-red-400",
};

const LEVEL_LABELS: Record<DashboardEvent["level"], string> = {
  info: "INFO",
  warn: "WARN",
  critical: "CRIT",
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function EventLog({ events }: EventLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isUserScrolledRef = useRef(false);

  // Auto-scroll to bottom on new events unless user scrolled up
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isUserScrolledRef.current) return;
    el.scrollTop = el.scrollHeight;
  }, [events]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    // User scrolled up if not at the bottom (with 20px tolerance)
    isUserScrolledRef.current = el.scrollTop + el.clientHeight < el.scrollHeight - 20;
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-white/15">
        <p className="text-xs font-mono">No events recorded</p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto font-mono text-[11px] leading-relaxed"
    >
      {events.map((event) => (
        <div
          key={event.id}
          className={`px-4 py-1 flex items-start gap-2 hover:bg-white/[0.02] ${
            event.level === "critical" ? "bg-red-500/[0.04]" : ""
          }`}
        >
          <span className="text-white/20 shrink-0">{formatTime(event.timestamp)}</span>
          <span className={`shrink-0 w-8 ${LEVEL_COLORS[event.level]}`}>
            {LEVEL_LABELS[event.level]}
          </span>
          <span className="text-white/40 shrink-0 w-24 truncate">{event.source}</span>
          <span className={event.level === "critical" ? "text-red-400/80" : "text-white/30"}>
            {event.message}
          </span>
        </div>
      ))}
    </div>
  );
}
