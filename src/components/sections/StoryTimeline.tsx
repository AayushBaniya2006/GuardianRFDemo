"use client";

import { motion } from "framer-motion";

type Milestone = {
  year: string;
  title: string;
  description: string;
};

export function StoryTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="space-y-10">
      {milestones.map((milestone, i) => (
        <motion.div
          key={milestone.title}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{
            duration: 0.7,
            ease: [0.33, 1, 0.68, 1],
            delay: i * 0.05,
          }}
        >
          <div className="grid grid-cols-[auto_auto_1fr] gap-x-6 items-start">
            <span className="text-xs font-mono text-gray-500 tracking-wider pt-1.5">
              {milestone.year}
            </span>
            <div className="flex flex-col items-center pt-2">
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{
                  type: "tween",
                  ease: "easeOut",
                  duration: 0.2,
                  delay: i * 0.05 + 0.2,
                }}
                className="w-2 h-2 rounded-full bg-accent/40 shrink-0"
              />
              <span className="w-px flex-1 bg-gray-800 mt-1" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">
                {milestone.title}
              </h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                {milestone.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
