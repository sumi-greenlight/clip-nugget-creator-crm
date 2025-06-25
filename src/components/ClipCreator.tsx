
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Scissors, Zap, Plus } from 'lucide-react';
import { Clip } from '../types/video';

interface ClipCreatorProps {
  onClipCreated: (clip: Clip) => void;
}

const ClipCreator: React.FC<ClipCreatorProps> = ({ onClipCreated }) => {
  const [startTime, setStartTime] = useState<string>('0');
  const [endTime, setEndTime] = useState<string>('10');
  const [title, setTitle] = useState<string>('');
  const [clipType, setClipType] = useState<'clip' | 'nugget'>('clip');

  const handleCreateClip = () => {
    const start = parseFloat(startTime);
    const end = parseFloat(endTime);
    
    if (start >= end) {
      alert('End time must be greater than start time');
      return;
    }
    
    if (!title.trim()) {
      alert('Please enter a title for your clip');
      return;
    }

    const newClip: Clip = {
      id: Date.now().toString(),
      title: title.trim(),
      startTime: start,
      endTime: end,
      duration: end - start,
      type: clipType,
      createdAt: new Date(),
    };

    onClipCreated(newClip);
    
    // Reset form
    setTitle('');
    setStartTime('0');
    setEndTime('10');
  };

  const formatTime = (seconds: string) => {
    const num = parseFloat(seconds) || 0;
    const minutes = Math.floor(num / 60);
    const secs = Math.floor(num % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Scissors className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-slate-800">Create Clip</h2>
        </div>

        {/* Clip Type Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Clip Type</Label>
          <div className="flex space-x-2">
            <Button
              variant={clipType === 'clip' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setClipType('clip')}
              className={clipType === 'clip' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              <Scissors className="w-4 h-4 mr-2" />
              Full Clip
            </Button>
            <Button
              variant={clipType === 'nugget' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setClipType('nugget')}
              className={clipType === 'nugget' ? 'bg-amber-500 hover:bg-amber-600' : ''}
            >
              <Zap className="w-4 h-4 mr-2" />
              Nugget
            </Button>
          </div>
          <p className="text-xs text-slate-500">
            {clipType === 'clip' 
              ? 'Create a longer video clip for detailed content'
              : 'Create a short nugget for quick highlights (recommended: under 30 seconds)'
            }
          </p>
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter clip title..."
            className="w-full"
          />
        </div>

        {/* Time Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startTime" className="text-sm font-medium">Start Time (seconds)</Label>
            <Input
              id="startTime"
              type="number"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              min="0"
              step="0.1"
              className="w-full"
            />
            <div className="text-xs text-slate-500 font-mono">
              {formatTime(startTime)}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endTime" className="text-sm font-medium">End Time (seconds)</Label>
            <Input
              id="endTime"
              type="number"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              min="0"
              step="0.1"
              className="w-full"
            />
            <div className="text-xs text-slate-500 font-mono">
              {formatTime(endTime)}
            </div>
          </div>
        </div>

        {/* Duration Display */}
        <div className="bg-slate-50 p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600">Duration:</span>
            <Badge variant="secondary" className="font-mono">
              {formatTime((parseFloat(endTime) - parseFloat(startTime)).toString())}
            </Badge>
          </div>
        </div>

        {/* Create Button */}
        <Button
          onClick={handleCreateClip}
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create {clipType === 'clip' ? 'Clip' : 'Nugget'}
        </Button>
      </div>
    </Card>
  );
};

export default ClipCreator;
