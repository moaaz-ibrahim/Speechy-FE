import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './style.css';
import { baseUrl } from '../../CONSTANTS.js';
import { useState, useEffect, useRef } from 'react';

const Player = ({ title, folder, darkMode, parts, currentPart, onCurrentPartChange }) => {
  const [internalCurrentPart, setInternalCurrentPart] = useState(currentPart || 1);
  const audioRef = useRef(null);

  useEffect(() => {
    console.log('Audio Ref ',audioRef);
    
  }, [audioRef]);

  useEffect(() => {
    if (currentPart !== undefined) {
      setInternalCurrentPart(currentPart);
    }
  }, [currentPart]);

  const nextPart = () => {
    if (internalCurrentPart < parts) {
      const newPart = internalCurrentPart + 1;
      setInternalCurrentPart(newPart);
      if (onCurrentPartChange) {
        onCurrentPartChange(newPart);
      }
    }
    console.log('End of part : ', internalCurrentPart);
  };

  const handlePlay = () => {
    console.log('Playing part: ', internalCurrentPart);
  };

  return (
    <div className={`player-div ${darkMode ? 'dark' : '' }  fixed-bottom `}>
      
      <p>{title} - {internalCurrentPart}/{parts}</p>
      {/* <p></p> */}
      <AudioPlayer
      ref={audioRef}
        onEnded={nextPart}
        src={`${baseUrl}/audioFiles/${folder}/${internalCurrentPart}.mp3`}
        onPlay={handlePlay}
        className={`audio-player ${darkMode ? "dark" : ''}`}
      />
    </div>
  );
};

export default Player;