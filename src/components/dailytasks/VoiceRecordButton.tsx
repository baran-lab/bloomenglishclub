import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, Square, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onRecorded: () => void;
}

export function VoiceRecordButton({ onRecorded }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
        onRecorded();
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch {
      // Mic not available
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const playAudio = () => {
    if (audioUrl) new Audio(audioUrl).play();
  };

  const retry = () => {
    setAudioUrl(null);
  };

  if (audioUrl) {
    return (
      <div className="flex gap-2 justify-center">
        <Button variant="outline" size="sm" onClick={playAudio} className="gap-1.5">
          <Play className="w-4 h-4" /> Play
        </Button>
        <Button variant="outline" size="sm" onClick={retry} className="gap-1.5">
          <RotateCcw className="w-4 h-4" /> Try Again
        </Button>
      </div>
    );
  }

  return (
    <Button
      size="sm"
      variant={isRecording ? "destructive" : "default"}
      onClick={isRecording ? stopRecording : startRecording}
      className="gap-1.5"
    >
      {isRecording ? (
        <>
          <Square className="w-3 h-3" /> Stop
        </>
      ) : (
        <>
          <Mic className="w-4 h-4" /> Record
        </>
      )}
    </Button>
  );
}
