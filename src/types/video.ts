
export interface Clip {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  duration: number;
  type: 'clip' | 'nugget';
  createdAt: Date;
  thumbnail?: string;
}

export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
}
