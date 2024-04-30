import React, { useState } from 'react';

function VideoPlayer({ url, className = 'w-full' }) {
   const [isPlaying, setIsPlaying] = useState(false);
   const playPause = () => {
      setIsPlaying(!isPlaying);
   };

   return (
      <div className="relative w-full">
         <video src={url} onClick={playPause} controls={true} className={className} />
      </div>
   );
}

export default VideoPlayer;
