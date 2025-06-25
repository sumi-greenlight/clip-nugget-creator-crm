
import React, { useState, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';
import { Clip } from '../types/video';

interface TimelineControlsProps {
  currentTime: number;
  duration: number;
  onTimeChange: (time: number) => void;
  selectedClip?: Clip | null;
}

const TimelineControls: React.FC<TimelineControlsProps> = ({
  currentTime,
  duration,
  onTimeChange,
  selectedClip
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleValueChange = useCallback((value: number[]) => {
    if (isDragging) {
      onTimeChange(value[0]);
    }
  }, [isDragging, onTimeChange]);

  const handleValueCommit = useCallback((value: number[]) => {
    onTimeChange(value[0]);
    setIsDragging(false);
  }, [onTimeChange]);

  const getClipPosition = (clip: Clip) => {
    if (duration === 0) return { left: '0%', width: '0%' };
    
    const startPercent = (clip.startTime / duration) * 100;
    const widthPercent = ((clip.endTime - clip.startTime) / duration) * 100;
    
    return {
      left: `${startPercent}%`,
      width: `${widthPercent}%`
    };
  };

  return (
    <div className="relative">
      {/* Timeline Background */}
      <div className="relative h-12 bg-slate-100 rounded-lg overflow-hidden">
        {/* Selected Clip Highlight */}
        {selectedClip && duration > 0 && (
          <div
            className="absolute top-0 h-full bg-blue-200 border-l-2 border-r-2 border-blue-400 opacity-60"
            style={getClipPosition(selectedClip)}
          />
        )}
        
        {/* Main Timeline Slider */}
        <div className="absolute inset-0 flex items-center px-4">
          <Slider
            value={[currentTime]}
            max={duration}
            step={0.1}
            onValueChange={handleValueChange}
            onValueCommit={handleValueCommit}
            onPointerDown={() => setIsDragging(true)}
            className="w-full cursor-pointer"
          />
        </div>
        
        {/* Time Markers */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 pb-1">
          {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
            const time = fraction * duration;
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return (
              <span key={fraction} className="text-xs text-slate-500 font-mono">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineControls;
