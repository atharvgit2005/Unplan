import React, { useState, useRef, useEffect } from 'react';

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => {
                    console.error("Audio playback failed:", error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.4;

            const playAudio = () => {
                audio.play()
                    .then(() => {
                        setIsPlaying(true);
                        // Remove listener once played
                        document.removeEventListener('click', playAudio);
                    })
                    .catch(error => {
                        console.log("Autoplay prevented. Waiting for user interaction.", error);
                        setIsPlaying(false);
                    });
            };

            // Attempt autoplay immediately
            playAudio();

            // If autoplay fails, play on first click
            document.addEventListener('click', playAudio);

            return () => {
                document.removeEventListener('click', playAudio);
            };
        }
    }, []);

    return (
        <div className="music-toggle-container">
            <audio ref={audioRef} loop autoPlay>
                <source src="/background-music.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <button
                onClick={togglePlay}
                className="music-toggle-btn"
                aria-label={isPlaying ? "Pause Music" : "Play Music"}
            >
                {isPlaying ? (
                    // Pause Icon
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                ) : (
                    // Play Icon
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px' }}>
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                )}

                <span className="music-toggle-tooltip">
                    {isPlaying ? 'Pause Music' : 'Play Music'}
                </span>
            </button>
        </div>
    );
};

export default BackgroundMusic;
