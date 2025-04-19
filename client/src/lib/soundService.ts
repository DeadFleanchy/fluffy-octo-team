// Sound service for playing button sounds

// Create base64-encoded click sound (short beep)
const clickSoundBase64 = 'data:audio/wav;base64,UklGRpQFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXAFAACBgIF/gnyCfYJ8gnuCeoJ5gneCdoJ0gnOCcoJwgm+CboJtgmyCa4JpgmiCZ4JmgmWCZIJjgmKCYYJggmCCX4Jegl2CXIJbgluCWoJZglmCWIJXgleCVoJWglWCVYJUglSCU4JTglKCUoJRglGCUIJQgk+CT4JOgk6CToJNgk2CTIJMgkuCS4JLgkqCSoJKgkmCSYJJgkiCSIJIgkeCR4JHgkaCRoJGgkWCRYJFgkSCRIJEgkOCQ4JDgkKCQoJCgkGCQYJBgkCCQIJAgj+CP4I/gj6CPoI+gj2CPYI9gjyCPII8gjuCO4I7gjqCOoI6gjmCOYI5gjiCOII4gjeCN4I3gjaCNoI2gjWCNYI1gjSCNII0gjOCM4IzgjKCMoIygjGCMYIxgjCCMIIwgi+CL4Ivgi6CLoIugi2CLYItgiyCLIIsgiuCK4IrgiuCKoIqgiqCKYIpgimCKIIogiiCJ4IngieCJoImgiaCJYIlgiWCJIIkgiSCI4IjgiOCIoIigiKCIYIhgiGCIIIggiCCH4Ifgh+CHoIegh6CHYIdgh2CHIIcghyCG4IbghuCGoIaghqCGYIZghmCGIIYghiCF4IXgheCFoIWghaCFYIVghWCFIIUghSCE4ITghOCEoISghKCEYIRghGCEIIQghCCD4IPgg+CDoIOgg6CDYINgg2CDIIMggyCC4ILgguCCoIKggqCCYIJggmCCIIIggiCB4IHggeCBoIGggaCBYIFggWCBIIEggSCA4IDggOCAoICggKCAYIBggGCAIIAggCCAIIAggCCAYIBggGCAoICggKCA4IDggOCBIIEggSCBYIFggWCBoIGggaCB4IHggeCCIIIggiCCYIJggmCCoIKggqCC4ILgguCDIIMggyDDYMNgw2DDoMOgw6DD4MPgw+DEIMQghCCEYIRghGCEoISghKCE4ITghOCFIIUghSCFYIVghWCFoIWghaCF4IXgheCGIIYghiCGYIZghmCGoIaghqCG4IbghuCHIIcghyCHYIdgh2CHoIegh6CH4Ifgh+CIIIggiCCIYIhgiGCIoIigiKCI4IjgiOCJIIkgiSCJYIlgiWCJoImgiaCJ4IngieCKIIogiiCKYIpgimCKoIqgiqCK4IrgiuCLIIsgiyCLYItgi2CLoIugi6CL4Ivgi+CMIIwgjCCMYIxgjGCMoIygjKCM4IzgjOCNII0gjSCNYI1gjWCNoI2gjaCN4I3gjeCOII4gjiCOYI5gjmCOoI6gjqCO4I7gjuCPII8gjyCPYI9gj2CPoI+gj6CP4I/gj+CQIJAgkCCQYJBgkGCQoJCgkKCQ4JDgkOCRIJEgkSCRYJFgkWCRoJGgkaCR4JHgkeCR4JIgkiCSYJJgkmCSoJKgkqCS4JLgkuCTIJMgkyCTYJNgk2CToJOgk6CT4JPgk+CUIJQglCCUIJRglGCUYJSglKCUoJTglOCU4JUglSCVIJVglWCVYJWglaCVoJXgleCWIJYglmCWYJZglqCWoJbgluCXIJcgl2CXYJegl6CX4Jfgl+CYIJggmGCYYJigmKCY4JjgmSCZIJlgmWCZoJmgmeCZ4JogmiCaYJpgmqCaoJrgmuCbIJsgm2CbYJugm6Cb4Jvgm+CcIJwgnCCcYJxgnGCcoJygnKCc4JzgnOCdIJ0gnSCdYJ1gnWCdoJ2gnaCd4J3gneCeIJ4gniCeYJ5gnmCeoJ6gnqCe4J7gnuCfIJ8gnyC';

// Create base64-encoded click sound (short beep)
const secondClickSoundBase64 = 'data:audio/wav;base64,UklGRpAEAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YWwEAAAAAQEDBAYHCQsMDhATFRcaHB8hJCYpLC4xNDc6PD9CREZITVBTWF1gY2ZrbXJ1eHuAg4aJjI+SlZibnqKlqKuusLO2ubzAw8XIy87S1dne4eTn6+7y9vr9/v38+/n29PPw7uzp5uPg3dnW09DOysbCvbm1sKyoo5+al5KOiYWAfHh0cGxnY19aVlJNSURAPDcyLiomIh4aFhIPCwcEAAD9+ff08/Hu6+jl4t/c2dbSz8zJxsO/vLm1sq+rqKShnpuXlJCNiYaDf3t4dHBsaGRgXFlVUU1JREBAOzc0MCwpJSIeGxcUEAwJBgMA/fv5+Pb08e/s6efi39zZ1tPQzcnGw7+8ubayr6uopKGem5eUkI2JhoN/e3h0cGxoZGBcWVVRTUlFQUA7NzQwLColIh4bFxQQDAkGAwD9+/n49vTx7+zp5eLf3NnW09DNycbDv7y5trKvq6ikoZ6bl5SQjYmGg397eHRwbGhkYFxZVVFNSUVBQDs3NDAsKSUiHhsXFBAMCQYDAP37+fj29PHv7Onl4t/c2dbT0M3JxsO/vLm2sq+rqKShnpuXlJCNiYaDf3t4dHBsaGRgXFlVUU1JRUFAO7YwLCklIh4bFxQQDAkGAwD9+/n49vTx7+3p5eLf3NnW09DNycbDv7y5trKvq6ikoZ6bl5SQjYmGg397eHRwbGhkYFxZVVFNSUVBQDs3NDAsKSUiHhsXFBAMCQYDAP37+fj29PHv7Onl4t/c2dbT0M3JxsO/vLm2sq+rqKShnpuXlJCNiYaDf3t4dHBsaGRgXFlVUU1JRUFAO7YwLCklIh4bFxQQDAkGAwD9+/n49vTx7+zp5eLf3NnW09DNycbDv7y5trKvq6ikoZ6bl5SQjYmGg397eHRwbGhkYFxZVVFNSUVBQDs3NDAsKSUiHhsXFBAMCQYDAP37+fj29PHv7Onl4t/c2dbT0M3JxsO/vLm2sq+rqKShnpuXlJCNiYaDfnl0cGxoZGBcWVVRTUlFQUA7NzQwLColIh4bFxQQDAkGAwD9+/n49vTx7+zp5eLf3NnW09DNycbDv7y5trKvq6ikoZ6bl5SQjYmGg397eHRwbGhkYFxZVVFNSUVBQDs3NDAsKSUiHhsXFBAMCQYDAP37+fj29PHv7Onl4t/c2dbT0M3JxsO/vLm2sq+rqKShnpuXlJCNiYaDf3t4dHBsaGRgXFlVUU1JRUFAO7YwLCklIh4bFxQQDAkGAwD9+/n49fPx7+zp5eLf3NnW09DNycbDv7y5trKvq6iko5+bl5SQjYmGg397eHRwbGhkYFxZVVFNSUVBQDs3NDAsKSUiHhsXFBAMCQYDAP37+fj19PHv7Onl4t/c2dbT0M3JxsO/vLm2sq+rqKOgnpqWko6Kh4N+eXVxbWlkYFtXU09LRUFA';

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
      // Use the base64 encoded sound
      const sound = new Audio(clickSoundBase64);
      sound.volume = 0.3; // Set volume to 30%
      sound.play().catch(e => console.log('Audio play failed:', e));
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
      // Use the base64 encoded sound
      const sound = new Audio(secondClickSoundBase64);
      sound.volume = 0.2; // Set volume to 20%
      sound.play().catch(e => console.log('Audio play failed:', e));
    } catch (error) {
      console.error('Error playing release sound:', error);
    }
  }
}

export default SoundService.getInstance();