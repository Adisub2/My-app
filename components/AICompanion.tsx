
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { SearchResult, GroundingSource } from "../types";

const AICompanion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiText, setAiText] = useState('Namaste! Tap the orb and speak to me in Hindi, Garhwali, Kumaoni or English.');
  const [sources, setSources] = useState<GroundingSource[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'hi-IN';

      recognitionRef.current.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processVoiceCommand(text);
      };

      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onerror = () => setIsListening(false);
    }
  }, []);

  const processVoiceCommand = async (command: string) => {
    setIsSpeaking(true);
    setAiText('Consulting live Devbhoomi data...');
    setSources([]);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Step 1: Generate Grounded Response using Search Tool
      const textGenResult = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ 
          parts: [{ 
            text: `Act as Teerthlok Companion, an expert guide for Uttarakhand. 
            User Query: "${command}". 
            Respond naturally in their language. Use Google Search to find real-time info like weather, road blocks, current temple timings, or events.
            Keep it concise and cite relevant data.` 
          }] 
        }],
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const responseText = textGenResult.text || "I am processing your request.";
      setAiText(responseText);

      // Extract Grounding Chunks
      const groundingChunks: any[] = textGenResult.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const extractedSources = groundingChunks
        .filter(c => c.web)
        .map(c => ({ title: c.web.title, uri: c.web.uri }));
      setSources(extractedSources);

      // Step 2: Convert to Speech
      const audioResult = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: responseText }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          }
        }
      });

      const base64Audio = audioResult.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (base64Audio) {
        if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') await ctx.resume();

        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.onended = () => setIsSpeaking(false);
        source.start();
      } else {
        setIsSpeaking(false);
      }
    } catch (e) {
      console.error("Assistant Error:", e);
      setIsSpeaking(false);
      setAiText("Connection to Devbhoomi wisdom lost. Please try again.");
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setIsListening(true);
      setTranscript('');
      try {
        recognitionRef.current?.start();
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  function decode(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
    return buffer;
  }

  return (
    <div className="fixed bottom-24 right-6 md:bottom-12 md:right-12 z-[100]">
      {isOpen ? (
        <div className="w-80 md:w-[400px] glass rounded-[40px] shadow-2xl p-8 flex flex-col items-center gap-6 border-2 border-saffron/30 animate-scaleIn overflow-hidden max-h-[80vh]">
          <div className="flex justify-between w-full items-center">
            <h3 className="font-bold text-mountain flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
              Teerthlok AI Companion
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-earth">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div 
            onClick={toggleListening}
            className={`w-32 h-32 rounded-full cursor-pointer flex items-center justify-center transition-all duration-500 relative ${
              isListening ? 'bg-saffron scale-110 shadow-[0_0_50px_rgba(255,153,51,0.5)]' : 
              isSpeaking ? 'bg-mountain scale-105 shadow-[0_0_30px_rgba(45,90,39,0.2)]' : 'bg-white shadow-inner border border-gray-100 hover:border-saffron/40'
            }`}
          >
            <div className={`absolute inset-0 rounded-full ${isListening ? 'animate-ping bg-saffron/20' : ''}`} />
            {isSpeaking ? (
              <div className="flex gap-1.5 h-12 items-center">
                {[1,2,3,4,5,6].map(i => <div key={i} className="w-1.5 bg-white rounded-full animate-bounce" style={{animationDelay: `${i*0.1}s`, height: `${40 + Math.random() * 60}%`}} />)}
              </div>
            ) : (
              <svg className={`w-14 h-14 ${isListening ? 'text-white' : 'text-saffron'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
              </svg>
            )}
          </div>

          <div className="text-center space-y-3 w-full">
            <div className="max-h-48 overflow-y-auto px-2">
              <p className="text-sm font-medium text-gray-800 italic leading-relaxed">
                {transcript ? `“${transcript}”` : aiText}
              </p>
            </div>
            {!transcript && !isSpeaking && (
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold animate-pulse">Tap the orb to speak</p>
            )}
          </div>

          {sources.length > 0 && (
            <div className="w-full space-y-2 border-t border-gray-100 pt-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Grounding Sources</p>
              <div className="flex flex-wrap gap-2">
                {sources.slice(0, 3).map((s, i) => (
                  <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="text-[9px] bg-ganga/5 text-ganga hover:bg-ganga hover:text-white px-2 py-1 rounded-full border border-ganga/10 transition-colors truncate max-w-[120px]">
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
             <div className={`h-full bg-saffron transition-all duration-700 ease-in-out ${isListening || isSpeaking ? 'w-full' : 'w-0'}`} />
          </div>
          
          <div className="flex gap-2 w-full">
            {['Kedarnath Status', 'Auli Weather', 'Live News'].map(tag => (
              <button 
                key={tag}
                onClick={(e) => { e.stopPropagation(); processVoiceCommand(tag); }}
                className="flex-1 text-[9px] bg-gray-50 hover:bg-saffron/10 py-2.5 rounded-xl border border-gray-100 transition-all font-bold text-gray-600 hover:text-saffron"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-mountain text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-saffron rounded-full animate-ping opacity-20 group-hover:opacity-40" />
          <svg className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AICompanion;
