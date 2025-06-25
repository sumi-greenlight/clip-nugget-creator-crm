
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Play, Scissors, Zap } from 'lucide-react';
import { Clip } from '../types/video';

interface ClipsLibraryProps {
  clips: Clip[];
  onClipDeleted: (clipId: string) => void;
  onClipSelected: (clip: Clip) => void;
  selectedClip?: Clip | null;
}

const ClipsLibrary: React.FC<ClipsLibraryProps> = ({
  clips,
  onClipDeleted,
  onClipSelected,
  selectedClip
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds.toFixed(1)}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl h-fit">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Clips Library</h2>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {clips.length} clips
          </Badge>
        </div>

        {clips.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scissors className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm">No clips created yet</p>
            <p className="text-slate-400 text-xs mt-1">Create your first clip using the controls above</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {clips.map((clip) => (
              <div
                key={clip.id}
                className={`p-4 border rounded-lg transition-all cursor-pointer hover:shadow-md ${
                  selectedClip?.id === clip.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
                onClick={() => onClipSelected(clip)}
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-slate-800 truncate">
                        {clip.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          variant={clip.type === 'nugget' ? 'default' : 'secondary'}
                          className={`text-xs ${
                            clip.type === 'nugget'
                              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                        >
                          {clip.type === 'nugget' ? (
                            <Zap className="w-3 h-3 mr-1" />
                          ) : (
                            <Scissors className="w-3 h-3 mr-1" />
                          )}
                          {clip.type}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {formatDuration(clip.duration)}
                        </span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClipDeleted(clip.id);
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Timeline */}
                  <div className="text-xs text-slate-500 font-mono space-y-1">
                    <div className="flex justify-between">
                      <span>Start: {formatTime(clip.startTime)}</span>
                      <span>End: {formatTime(clip.endTime)}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full ${
                          clip.type === 'nugget' ? 'bg-amber-400' : 'bg-blue-400'
                        }`}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  {/* Play Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClipSelected(clip);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {selectedClip?.id === clip.id ? 'Currently Playing' : 'Play Clip'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ClipsLibrary;
