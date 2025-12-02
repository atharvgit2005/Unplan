// Sound Manager for UI interactions
class SoundManager {
    constructor() {
        this.sounds = {}
        this.enabled = true
        this.volume = 0.3
    }

    // Load a sound
    loadSound(name, url) {
        const audio = new Audio(url)
        audio.volume = this.volume
        this.sounds[name] = audio
    }

    // Play a sound
    play(name) {
        if (!this.enabled || !this.sounds[name]) return

        const sound = this.sounds[name].cloneNode()
        sound.volume = this.volume
        sound.play().catch(err => console.log('Audio play failed:', err))
    }

    // Toggle sound on/off
    toggle() {
        this.enabled = !this.enabled
        return this.enabled
    }

    // Set volume (0 to 1)
    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol))
        Object.values(this.sounds).forEach(sound => {
            sound.volume = this.volume
        })
    }
}

// Create singleton instance
const soundManager = new SoundManager()

// Preload sounds (you can add actual sound files later)
// soundManager.loadSound('hover', '/sounds/hover.mp3')
// soundManager.loadSound('click', '/sounds/click.mp3')

export default soundManager
