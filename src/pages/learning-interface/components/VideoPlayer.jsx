import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayer = ({ 
  videoUrl, 
  title, 
  duration, 
  currentTime = 0, 
  onTimeUpdate, 
  onProgress,
  chapters = [],
  onChapterSelect 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      onTimeUpdate?.(video?.currentTime);
    };

    const handleProgress = () => {
      if (video?.buffered?.length > 0) {
        const bufferedEnd = video?.buffered?.end(video?.buffered?.length - 1);
        const duration = video?.duration;
        onProgress?.(bufferedEnd / duration);
      }
    };

    video?.addEventListener('timeupdate', handleTimeUpdate);
    video?.addEventListener('progress', handleProgress);

    return () => {
      video?.removeEventListener('timeupdate', handleTimeUpdate);
      video?.removeEventListener('progress', handleProgress);
    };
  }, [onTimeUpdate, onProgress]);

  const togglePlay = () => {
    const video = videoRef?.current;
    if (video?.paused) {
      video?.play();
      setIsPlaying(true);
    } else {
      video?.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const video = videoRef?.current;
    const rect = e?.currentTarget?.getBoundingClientRect();
    const pos = (e?.clientX - rect?.left) / rect?.width;
    video.currentTime = pos * video?.duration;
  };

  const toggleMute = () => {
    const video = videoRef?.current;
    video.muted = !video?.muted;
    setIsMuted(video?.muted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const changePlaybackRate = (rate) => {
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef?.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef?.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  return (
    <div 
      ref={containerRef}
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        onClick={togglePlay}
        onLoadedMetadata={() => {
          videoRef.current.currentTime = currentTime;
        }}
      />
      {/* Loading Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
      {/* Play Button Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="w-20 h-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full"
          >
            <Icon name="Play" size={32} color="white" />
          </Button>
        </div>
      )}
      {/* Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        {/* Progress Bar */}
        <div className="mb-4">
          <div 
            className="w-full h-2 bg-white/20 rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-primary rounded-full relative"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" />
            </div>
          </div>
          
          {/* Chapter Markers */}
          {chapters?.map((chapter, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform"
              style={{ left: `${(chapter?.time / duration) * 100}%`, top: '50%' }}
              onClick={() => onChapterSelect?.(chapter)}
              title={chapter?.title}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
            >
              <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
            </Button>

            {/* Volume */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                className="text-white hover:bg-white/20"
              >
                <Icon 
                  name={isMuted || volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"} 
                  size={18} 
                />
              </Button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white/20 rounded-full appearance-none slider"
              />
            </div>

            {/* Time */}
            <span className="text-white text-sm font-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Playback Speed */}
            <div className="relative">
              <select
                value={playbackRate}
                onChange={(e) => changePlaybackRate(parseFloat(e?.target?.value))}
                className="bg-white/20 text-white text-sm rounded px-2 py-1 border-none outline-none"
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>

            {/* Chapters */}
            {chapters?.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChapters(!showChapters)}
                className="text-white hover:bg-white/20"
              >
                <Icon name="List" size={18} />
              </Button>
            )}

            {/* Fullscreen */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20"
            >
              <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={18} />
            </Button>
          </div>
        </div>
      </div>
      {/* Chapters Panel */}
      {showChapters && (
        <div className="absolute top-4 right-4 w-80 bg-black/90 backdrop-blur-sm rounded-lg p-4 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Chapters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChapters(false)}
              className="text-white hover:bg-white/20"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          
          <div className="space-y-2">
            {chapters?.map((chapter, index) => (
              <button
                key={index}
                onClick={() => {
                  onChapterSelect?.(chapter);
                  setShowChapters(false);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{chapter?.title}</span>
                  <span className="text-white/60 text-sm">{formatTime(chapter?.time)}</span>
                </div>
                {chapter?.description && (
                  <p className="text-white/80 text-sm mt-1">{chapter?.description}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;