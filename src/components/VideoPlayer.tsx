
import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { VideoPlayerState, Clip } from '../types/video';
import TimelineControls from './TimelineControls';

interface VideoPlayerProps {
  selectedClip?: Clip | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ selectedClip }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playerState, setPlayerState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
  });

  // Sample video URL - in a real app, this would come from your CRM
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setPlayerState(prev => ({
        ...prev,
        currentTime: video.currentTime,
      }));
    };

    const updateDuration = () => {
      setPlayerState(prev => ({
        ...prev,
        duration: video.duration,
      }));
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  useEffect(() => {
    if (selectedClip && videoRef.current) {
      videoRef.current.currentTime = selectedClip.startTime;
    }
  }, [selectedClip]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (playerState.isPlaying) {
      video.pause();
    } else {
      video.play();
    }

    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  };

  const handleTimeChange = (time: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = time;
    setPlayerState(prev => ({
      ...prev,
      currentTime: time,
    }));
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setPlayerState(prev => ({
      ...prev,
      isMuted: !prev.isMuted,
    }));
  };

  const handleVolumeChange = (volume: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = volume[0];
    video.volume = newVolume;
    setPlayerState(prev => ({
      ...prev,
      volume: newVolume,
    }));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl">
      <div className="space-y-4">
        {/* Video Container */}
        <div className="relative rounded-lg overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full aspect-video"
            onClick={togglePlay}
          />
          {selectedClip && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Playing: {selectedClip.title}
            </div>
          )}
        </div>

        {/* Timeline Controls */}
        <TimelineControls
          currentTime={playerState.currentTime}
          duration={playerState.duration}
          onTimeChange={handleTimeChange}
          selectedClip={selectedClip}
        />

        {/* Player Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={togglePlay}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {playerState.isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </Button>
            
            <div className="text-sm font-mono text-slate-600">
              {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={toggleMute}
              variant="outline"
              size="sm"
            >
              {playerState.isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <div className="w-24">
              <Slider
                value={[playerState.isMuted ? 0 : playerState.volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoPlayer;
