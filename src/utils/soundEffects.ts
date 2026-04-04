let sharedAudioContext: AudioContext | null = null;
let soundEffectsInitialized = false;

const getAudioContext = async () => {
  if (typeof window === 'undefined') return null;

  const AudioContextClass =
    window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextClass) return null;

  if (!sharedAudioContext) {
    sharedAudioContext = new AudioContextClass();
  }

  if (sharedAudioContext.state === 'suspended') {
    try {
      await sharedAudioContext.resume();
    } catch (error) {
      console.warn('Unable to resume audio context', error);
    }
  }

  return sharedAudioContext;
};

export const initializeSoundEffects = () => {
  if (typeof window === 'undefined' || soundEffectsInitialized) return;

  soundEffectsInitialized = true;

  const unlockAudio = () => {
    void getAudioContext();
  };

  window.addEventListener('pointerdown', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });
};

const playToneSequence = async (
  frequencies: number[],
  duration: number,
  type: OscillatorType,
  volume: number,
) => {
  const audioContext = await getAudioContext();
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.type = type;

  frequencies.forEach((frequency, index) => {
    oscillator.frequency.setValueAtTime(
      frequency,
      audioContext.currentTime + index * (duration / Math.max(frequencies.length, 1)),
    );
  });

  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
};

export const playSuccessSound = () => {
  void playToneSequence([523.25, 659.25, 783.99], 0.4, 'sine', 0.3);
};

export const playErrorSound = () => {
  void playToneSequence([300, 200], 0.3, 'sawtooth', 0.2);
};

export const playRecordingSuccessSound = () => {
  void playToneSequence([880, 1046.5, 1318.5], 0.5, 'sine', 0.25);
};

export const playCorrectSound = playSuccessSound;
export const playIncorrectSound = playErrorSound;
