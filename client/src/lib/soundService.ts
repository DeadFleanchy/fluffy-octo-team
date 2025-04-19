// Sound service for playing button sounds

/**
 * Creates a mechanical keyboard click sound using Web Audio API
 * This gives us a more realistic keyboard click than a prerecorded sound
 */
function createKeyboardClickSound(audioContext: AudioContext): AudioBuffer {
  // Create a short audio buffer (100ms)
  const sampleRate = audioContext.sampleRate;
  const duration = 0.08; // 80ms
  const bufferSize = Math.floor(sampleRate * duration);
  const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);
  
  // Generate a mechanical keyboard click sound
  // First part: quick attack
  const attackTime = Math.floor(sampleRate * 0.005); // 5ms attack
  for (let i = 0; i < attackTime; i++) {
    // Sharp attack with some randomness for a crisp click
    data[i] = 0.5 * Math.random() * (i / attackTime);
  }
  
  // Middle part: strong but short body
  const bodyLength = Math.floor(sampleRate * 0.01); // 10ms body
  for (let i = 0; i < bodyLength; i++) {
    const idx = attackTime + i;
    // Add some mid-frequency components
    data[idx] = 0.6 * Math.sin(i * 0.2) * Math.exp(-i / (bodyLength * 0.5));
  }
  
  // Decay part: fast decay with slight resonance
  for (let i = attackTime + bodyLength; i < bufferSize; i++) {
    // Exponential decay with added overtones for a mechanical feel
    const decayProgress = (i - (attackTime + bodyLength)) / (bufferSize - (attackTime + bodyLength));
    const decay = Math.exp(-decayProgress * 12);
    const resonance = Math.sin(decayProgress * 120) * 0.1;
    data[i] = (decay + resonance) * 0.3;
  }
  
  return buffer;
}

/**
 * Creates a mechanical keyboard release sound using Web Audio API
 */
function createKeyboardReleaseSound(audioContext: AudioContext): AudioBuffer {
  // Create a short audio buffer (60ms)
  const sampleRate = audioContext.sampleRate;
  const duration = 0.06; // 60ms
  const bufferSize = Math.floor(sampleRate * duration);
  const buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);
  
  // Generate a keyboard key release sound
  // Shorter attack and more subtle
  const attackTime = Math.floor(sampleRate * 0.002); // 2ms attack
  for (let i = 0; i < attackTime; i++) {
    data[i] = 0.3 * Math.random() * (i / attackTime);
  }
  
  // Very short body
  const bodyLength = Math.floor(sampleRate * 0.008); // 8ms body
  for (let i = 0; i < bodyLength; i++) {
    const idx = attackTime + i;
    data[idx] = 0.4 * Math.sin(i * 0.3) * Math.exp(-i / (bodyLength * 0.7));
  }
  
  // Quick decay
  for (let i = attackTime + bodyLength; i < bufferSize; i++) {
    const decayProgress = (i - (attackTime + bodyLength)) / (bufferSize - (attackTime + bodyLength));
    const decay = Math.exp(-decayProgress * 15);
    data[i] = decay * 0.2;
  }
  
  return buffer;
}

/**
 * AudioContext singleton for playing sounds
 */
class SoundService {
  private static instance: SoundService;
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  private constructor() {
    // Create audio context on first user interaction to comply with browser autoplay policies
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.error('Web Audio API is not supported in this browser');
    }
  }

  public static getInstance(): SoundService {
    if (!SoundService.instance) {
      SoundService.instance = new SoundService();
    }
    return SoundService.instance;
  }

  /**
   * Toggle sound on/off
   */
  public toggleSound(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * Play click sound when button is pressed
   */
  public playClickSound(): void {
    if (!this.enabled || !this.audioContext) return;

    try {
      // Create the sound buffer if audioContext is initialized
      const buffer = createKeyboardClickSound(this.audioContext);
      
      // Create source node, connect to destination and play
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      
      // Create gain node to control volume and connect to destination
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = 0.4; // Set volume to 40%
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      source.start();
    } catch (error) {
      console.error('Error playing click sound:', error);
    }
  }

  /**
   * Play second click sound when button is released
   */
  public playReleaseSound(): void {
    if (!this.enabled || !this.audioContext) return;

    try {
      // Create the sound buffer if audioContext is initialized
      const buffer = createKeyboardReleaseSound(this.audioContext);
      
      // Create source node, connect to destination and play
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      
      // Create gain node to control volume and connect to destination
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = 0.3; // Set volume to 30%
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      source.start();
    } catch (error) {
      console.error('Error playing release sound:', error);
    }
  }
}

export default SoundService.getInstance();