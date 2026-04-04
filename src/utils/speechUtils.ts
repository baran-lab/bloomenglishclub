let availableVoices: SpeechSynthesisVoice[] = [];
let isInitialized = false;

const canUseSpeechSynthesis = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window;

const refreshVoices = () => {
  if (!canUseSpeechSynthesis()) return;
  availableVoices = window.speechSynthesis.getVoices();
};

export function initializeSpeechSynthesis() {
  if (!canUseSpeechSynthesis() || isInitialized) return;

  isInitialized = true;
  refreshVoices();

  window.speechSynthesis.onvoiceschanged = refreshVoices;

  const unlockSpeech = () => {
    try {
      window.speechSynthesis.resume();
      refreshVoices();
    } catch (error) {
      console.warn('Unable to unlock speech synthesis', error);
    }
  };

  window.addEventListener('pointerdown', unlockSpeech, { passive: true });
  window.addEventListener('keydown', unlockSpeech, { passive: true });
}

export function speakText(text: string, rate = 0.7) {
  if (!canUseSpeechSynthesis()) {
    console.warn('Speech synthesis not available');
    return false;
  }

  const cleanedText = text.trim();
  if (!cleanedText) return false;

  initializeSpeechSynthesis();

  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(cleanedText);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  utterance.volume = 1;
  utterance.pitch = 1;

  const voice =
    availableVoices.find((item) => item.lang === 'en-US') ??
    availableVoices.find((item) => item.lang.startsWith('en'));

  if (voice) {
    utterance.voice = voice;
  }

  try {
    if (synth.speaking || synth.pending) {
      synth.cancel();
    }
    synth.resume();
    synth.speak(utterance);
    return true;
  } catch (error) {
    console.warn('Speech playback failed', error);
    return false;
  }
}
