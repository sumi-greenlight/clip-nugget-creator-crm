
import React, { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import ClipCreator from '../components/ClipCreator';
import ClipsLibrary from '../components/ClipsLibrary';
import { Clip } from '../types/video';

const Index = () => {
  const [clips, setClips] = useState<Clip[]>([]);
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);

  const handleClipCreated = (newClip: Clip) => {
    setClips(prev => [...prev, newClip]);
  };

  const handleClipDeleted = (clipId: string) => {
    setClips(prev => prev.filter(clip => clip.id !== clipId));
    if (selectedClip?.id === clipId) {
      setSelectedClip(null);
    }
  };

  const handleClipSelected = (clip: Clip) => {
    setSelectedClip(clip);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Video CRM Studio</h1>
          <p className="text-slate-600 text-lg">Create clips and nuggets from your videos</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Video Player and Clip Creator */}
          <div className="xl:col-span-2 space-y-6">
            <VideoPlayer selectedClip={selectedClip} />
            <ClipCreator onClipCreated={handleClipCreated} />
          </div>

          {/* Clips Library */}
          <div className="xl:col-span-1">
            <ClipsLibrary 
              clips={clips} 
              onClipDeleted={handleClipDeleted}
              onClipSelected={handleClipSelected}
              selectedClip={selectedClip}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
