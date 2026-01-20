// App jingle using Web Audio API
let hasPlayedJingle = false;

export const playAppJingle = () => {
  // Only play once per session
  if (hasPlayedJingle) return;
  hasPlayedJingle = true;

  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Jingle notes: ascending cheerful melody
    const notes = [
      { freq: 523.25, start: 0, duration: 0.15 },      // C5
      { freq: 659.25, start: 0.15, duration: 0.15 },   // E5
      { freq: 783.99, start: 0.30, duration: 0.15 },   // G5
      { freq: 1046.50, start: 0.45, duration: 0.30 },  // C6 (longer)
    ];

    notes.forEach(note => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime + note.start);
      
      // Envelope for smoother sound
      gainNode.gain.setValueAtTime(0, audioContext.currentTime + note.start);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + note.start + 0.02);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + note.start + note.duration);
      
      oscillator.start(audioContext.currentTime + note.start);
      oscillator.stop(audioContext.currentTime + note.start + note.duration + 0.1);
    });
  } catch (error) {
    console.log('Could not play jingle:', error);
  }
};

export const resetJingle = () => {
  hasPlayedJingle = false;
};
