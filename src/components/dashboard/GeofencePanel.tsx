"use client";

import { useState, useRef, useEffect, memo } from "react";
import { Shield, X, Trash2, Crosshair, Plus } from "lucide-react";
import type { Geofence } from "@/lib/data/mock-geofences";
import { polygonArea } from "@/lib/geo-utils";

type GeofencePanelProps = {
  isOpen: boolean;
  onClose: () => void;
  geofences: Geofence[];
  breachedGeofenceIds: Set<string>;
  isDrawing: boolean;
  drawingVertices: [number, number][];
  selectedGeofenceId: string | null;
  onStartDrawing: () => void;
  onFinishDrawing: (name: string) => void;
  onCancelDrawing: () => void;
  onDeleteGeofence: (id: string) => void;
  onFocusGeofence: (id: string) => void;
  onSelectGeofence: (id: string | null) => void;
};

function formatArea(sqMeters: number): string {
  if (sqMeters > 1_000_000) return `${(sqMeters / 1_000_000).toFixed(2)} km²`;
  return `${Math.round(sqMeters).toLocaleString()} m²`;
}

export default memo(function GeofencePanel({
  isOpen,
  onClose,
  geofences,
  breachedGeofenceIds,
  isDrawing,
  drawingVertices,
  selectedGeofenceId,
  onStartDrawing,
  onFinishDrawing,
  onCancelDrawing,
  onDeleteGeofence,
  onFocusGeofence,
  onSelectGeofence,
}: GeofencePanelProps) {
  const [newName, setNewName] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const deleteTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (deleteTimeoutRef.current) clearTimeout(deleteTimeoutRef.current); };
  }, []);

  if (!isOpen) return null;

  const handleFinish = () => {
    const name = newName.trim() || `Zone ${geofences.length + 1}`;
    onFinishDrawing(name);
    setNewName("");
  };

  const handleCancel = () => {
    setNewName("");
    onCancelDrawing();
  };

  const handleDelete = (id: string) => {
    if (confirmDeleteId === id) {
      onDeleteGeofence(id);
      setConfirmDeleteId(null);
      if (deleteTimeoutRef.current) clearTimeout(deleteTimeoutRef.current);
    } else {
      setConfirmDeleteId(id);
      if (deleteTimeoutRef.current) clearTimeout(deleteTimeoutRef.current);
      deleteTimeoutRef.current = setTimeout(() => setConfirmDeleteId(null), 3000);
    }
  };

  return (
    <div className="absolute top-0 right-0 h-full w-full sm:w-[340px] border-l border-white/[0.06] flex flex-col z-20 bg-[#0c1019]">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Shield className={`w-4 h-4 ${breachedGeofenceIds.size > 0 ? "text-red-400" : "text-accent/60"}`} />
          <span className="font-semibold text-xs uppercase tracking-wider text-white/50">Geofences</span>
          <span className="text-[10px] font-mono text-white/30">({geofences.length})</span>
          {breachedGeofenceIds.size > 0 && (
            <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-400">
              {breachedGeofenceIds.size} BREACH
            </span>
          )}
        </div>
        <button
          aria-label="Close geofence panel"
          onClick={onClose}
          className="cursor-pointer transition-colors text-white/15 hover:text-white/50"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawing mode controls */}
      {isDrawing ? (
        <div className="px-4 py-3 border-b border-white/[0.06] bg-accent/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-white/50">Drawing Mode</span>
          </div>
          <p className="text-[11px] mb-2 text-white/30">
            Click on the map to place vertices. {drawingVertices.length} point{drawingVertices.length !== 1 ? "s" : ""} placed.
          </p>

          {drawingVertices.length >= 3 && (
            <input
              type="text"
              placeholder="Zone name (optional)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleFinish(); }}
              className="w-full text-xs px-2.5 py-1.5 rounded border mb-2 outline-none bg-white/[0.04] border-white/[0.06] text-white placeholder:text-white/30"
            />
          )}

          <div className="flex gap-2">
            <button
              disabled={drawingVertices.length < 3}
              onClick={handleFinish}
              className={`flex-1 text-xs py-1.5 px-3 rounded font-medium transition-colors ${
                drawingVertices.length >= 3
                  ? "bg-accent text-black hover:bg-accent/90 cursor-pointer"
                  : "bg-white/[0.06] text-white/15 cursor-not-allowed"
              }`}
            >
              Complete ({drawingVertices.length}/3+)
            </button>
            <button
              onClick={handleCancel}
              className="text-xs py-1.5 px-3 rounded font-medium cursor-pointer transition-colors bg-white/[0.06] text-white/50 hover:bg-white/[0.1]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="px-4 py-2 border-b border-white/[0.06]">
          <button
            onClick={onStartDrawing}
            className="w-full flex items-center justify-center gap-1.5 text-xs py-2 px-3 rounded font-medium bg-accent/10 text-accent hover:bg-accent/20 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            New Geofence
          </button>
        </div>
      )}

      {/* Geofence list */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {geofences.length === 0 && !isDrawing && (
          <div className="text-center py-8 text-white/15">
            <Shield className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-xs">No geofences in this region</p>
            <p className="text-[10px] mt-1 opacity-60">Create one to define drone boundaries</p>
          </div>
        )}

        {geofences.map((gf) => {
          const isSelected = selectedGeofenceId === gf.id;
          const isBreach = breachedGeofenceIds.has(gf.id);
          return (
          <div
            key={gf.id}
            onClick={() => onSelectGeofence(isSelected ? null : gf.id)}
            className={`border rounded-lg p-3 cursor-pointer transition-colors ${
              isBreach
                ? "bg-red-500/[0.06] border-red-500/30"
                : isSelected
                  ? "bg-white/[0.06] border-gray-400"
                  : "bg-[#111820]/50 border-white/[0.06] hover:border-white/[0.12]"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: isBreach ? "#ef4444" : isSelected ? "#d1d5db" : gf.color }}
                />
                <span className="text-sm truncate text-white">{gf.name}</span>
                {isBreach && (
                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-red-500/15 text-red-400">
                    BREACH
                  </span>
                )}
                {isSelected && !isBreach && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.08] text-white/30">
                    EDITING
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  aria-label={`Focus on ${gf.name}`}
                  onClick={(e) => { e.stopPropagation(); onFocusGeofence(gf.id); }}
                  className="text-accent/60 hover:text-accent p-1 transition-colors cursor-pointer"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                </button>
                <button
                  aria-label={confirmDeleteId === gf.id ? `Confirm delete ${gf.name}` : `Delete ${gf.name}`}
                  onClick={(e) => { e.stopPropagation(); handleDelete(gf.id); }}
                  className={`p-1 transition-colors cursor-pointer ${
                    confirmDeleteId === gf.id
                      ? "text-red-400 hover:text-red-300"
                      : "text-white/15 hover:text-red-400"
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-white/15">
              <span>{gf.vertices.length} vertices</span>
              <span>{formatArea(polygonArea(gf.vertices))}</span>
              {isBreach && (
                <span className="text-red-400/60 font-mono">ACTIVE BREACH</span>
              )}
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
});
