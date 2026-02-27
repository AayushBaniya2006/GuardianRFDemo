"use client";

import { HudPanel } from "./HudPanel";
import type { SceneControls } from "./scene/types";

interface ControlsPanelProps {
  controls: SceneControls;
  onChange: (controls: SceneControls) => void;
}

export function ControlsPanel({ controls, onChange }: ControlsPanelProps) {
  return (
    <HudPanel title="Controls" className="w-[240px]">
      <div className="space-y-3">
        {/* Scan Rate Slider */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-white/50">Scan Rate</span>
            <span className="tabular-nums text-white/90">{controls.scanRate}s</span>
          </div>
          <input
            type="range"
            min={2}
            max={12}
            step={0.5}
            value={controls.scanRate}
            onChange={(e) =>
              onChange({ ...controls, scanRate: parseFloat(e.target.value) })
            }
            className="hud-slider w-full"
          />
        </div>

        {/* Sensitivity Slider */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-white/50">Sensitivity</span>
            <span className="tabular-nums text-white/90">
              {Math.round(controls.sensitivity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.05}
            value={controls.sensitivity}
            onChange={(e) =>
              onChange({ ...controls, sensitivity: parseFloat(e.target.value) })
            }
            className="hud-slider w-full"
          />
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-4 pt-1 border-t border-white/[0.06]">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={controls.showTracks}
              onChange={(e) =>
                onChange({ ...controls, showTracks: e.target.checked })
              }
              className="hud-checkbox"
            />
            <span className="text-white/60">Tracks</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={controls.showLabels}
              onChange={(e) =>
                onChange({ ...controls, showLabels: e.target.checked })
              }
              className="hud-checkbox"
            />
            <span className="text-white/60">Labels</span>
          </label>
        </div>
      </div>
    </HudPanel>
  );
}
