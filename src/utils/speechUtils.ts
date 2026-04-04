// Robust speech synthesis utility that handles common browser quirks

let voicesLoaded = false;
let voicesPromise: Promise<SpeechSynthesisVoice[]> | null = null;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (voicesPromise) return voicesPromise;
  
  voicesPromise = new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve([]);
      return;
    }
    
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      voicesLoaded = true;
      resolve(voices);
      return;
    }
    
    // Wait for voices to load (Chrome loads them async)
    speechSynthesis.onvoiceschanged = () => {
      voicesLoaded = true;
      resolve(speechSynthesis.getVoices());
    };
    
    // Fallback timeout - speak without voice selection
    setTimeout(() => {
      if (!voicesLoaded) {
        resolve(speechSynthesis.getVoices());
      }
    }, 1000);
  });
  
  return voicesPromise;
}

// Initialize on import
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
}

export async function speakText(text: string, rate = 0.7): Promise<void> {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not available');
    return;
  }

  // Cancel any ongoing speech
  speechSynthesis.cancel();

  const voices = await loadVoices();
  
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.volume = 1;
    
    // Select an English voice if available
    if (voices.length > 0) {
      const englishVoice = voices.find(v => v.lang === 'en-US') 
        || voices.find(v => v.lang.startsWith('en'));
      if (englishVoice) utterance.voice = englishVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (e) => {
      console.warn('Speech error:', e.error);
      resolve();
    };

    // Chrome bug workaround: schedule speak in next tick after cancel
    requestAnimationFrame(() => {
      speechSynthesis.speak(utterance);
    });
  });
}
