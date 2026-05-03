import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
    Send, X, MessageSquare, Mic, Volume2, VolumeX, MicOff, RefreshCw, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenAI } from "@google/genai";
import { AI_INSTRUCTIONS } from './aiInstructions';

// FOR TESTING: Project env is preferred
const TEST_API_KEY = "AIzaSyCbCeBlZnZYE4Q3lpC9uIR6oWH5QFvcWaA"; 

interface ChatBotProps {
    isMuted: boolean;
    setIsMuted: (val: boolean) => void;
    showToast: (msg: string) => void;
    onNewQuery?: (query: string, response: string) => void;
}

export const ChatBot = React.memo(({ isMuted, setIsMuted, showToast, onNewQuery }: ChatBotProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{role: 'user'|'ai', content: string}[]>([
        { role: 'ai', content: "Ji! Main Sonia hoon, aapki beauty aur health expert. Aaj main aapki kya help kar sakti hoon? 😊" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [sendDelay, setSendDelay] = useState(1500); 
    const [showSettings, setShowSettings] = useState(false);
    
    const scrollRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const lastRequestTime = useRef<number>(0);

    const apiKey = useMemo(() => {
        try {
            return (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || TEST_API_KEY || "";
        } catch (e) {
            return TEST_API_KEY || "";
        }
    }, []).trim();

    const genAI = useMemo(() => {
        if (!apiKey) return null;
        return new GoogleGenAI({ apiKey });
    }, [apiKey]);

    useEffect(() => {
        const loadVoices = () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                setVoices(window.speechSynthesis.getVoices());
            }
        };
        loadVoices();
        if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            recognition.onresult = (event: any) => {
                setInput(event.results[0][0].transcript);
                setIsListening(false);
            };
            recognition.onerror = () => setIsListening(false);
            recognition.onend = () => setIsListening(false);
            recognitionRef.current = recognition;
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const speak = (text: string) => {
        if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const preferredVoices = voices.filter(v => v.lang.includes('ur') || v.lang.includes('hi') || v.lang.includes('en-GB') || v.name.includes('Female'));
        if (preferredVoices.length > 0) utterance.voice = preferredVoices[0];
        utterance.rate = 1.0;
        utterance.pitch = 1.05;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    const toggleListening = () => {
        if (!recognitionRef.current) return showToast("Mic not supported.");
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (e) {
                setIsListening(false);
            }
        }
    };

    const resetConnection = () => {
        setMessages([
            { role: 'ai', content: "Main wapas aa gayi! Koi baat nahi, abhi baat karte hain. Main Sonia hoon, aapki beauty guide. 😊" }
        ]);
        setHasError(false);
        setIsTyping(false);
        setInput('');
    };

    const sendMessage = async () => {
        if (!input.trim() || isTyping) return;
        
        const now = Date.now();
        if (now - lastRequestTime.current < 2000) {
            showToast("Thora intezar kijiye! Sonia soch rahi hai.");
            return;
        }
        lastRequestTime.current = now;

        if (!genAI || !apiKey) {
            setHasError(true);
            showToast("Connection issue. Please check config.");
            return;
        }

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setIsTyping(true);
        setHasError(false);

        try {
            // Debounce for rate limiting
            await new Promise(resolve => setTimeout(resolve, sendDelay));

            const chatHistory = messages.map(msg => ({
                role: msg.role === 'ai' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }));

            const result = await genAI.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [...chatHistory, { role: 'user', parts: [{ text: userMsg }] }],
                config: {
                    systemInstruction: AI_INSTRUCTIONS,
                    temperature: 0.7,
                }
            });

            const aiText = result.text;
            if (!aiText) throw new Error("Empty response");

            setMessages(prev => [...prev, { role: 'ai', content: aiText }]);
            speak(aiText);
            if (onNewQuery) onNewQuery(userMsg, aiText);
        } catch (error: any) {
            console.error("SONIA_API_ERROR:", error);
            setHasError(true);
            let displayError = "Maaf kijiye ga, thora technical issue lag raha hai.";
            if (error?.message?.includes('429')) displayError = "Bohat requests ho gayin! Thori dair baad koshish kijiye.";
            setMessages(prev => [...prev, { role: 'ai', content: displayError }]);
            speak(displayError);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                        className="bg-white w-[320px] md:w-[380px] h-[520px] rounded-[2.5rem] shadow-2xl overflow-hidden mb-6 border border-gray-100 flex flex-col"
                    >
                        <div className="bg-[#8B5E3C] p-5 text-white flex justify-between items-center relative">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/40 overflow-hidden shadow-inner">
                                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" alt="Sonia" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[11px] uppercase tracking-widest leading-none mb-1">Sonia Expert</h4>
                                    <div className="flex items-center gap-1.5">
                                        <span className={`w-1.5 h-1.5 rounded-full bg-green-400 ${isTyping ? 'animate-pulse' : ''}`} />
                                        <span className="text-[9px] font-medium opacity-80 italic">
                                            {isListening ? "Listening..." : (isTyping ? "Thinking..." : "Online")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setShowSettings(!showSettings)} className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-white/20' : 'hover:bg-white/10'}`}>
                                    <Settings className="w-4 h-4" />
                                </button>
                                <button onClick={() => setIsMuted(!isMuted)} className="p-2 hover:bg-white/10 rounded-full">
                                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {showSettings && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-gray-50 border-b overflow-hidden p-4 space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold text-[#8B5E3C] uppercase tracking-widest">
                                        <span>Response Delay</span>
                                        <span>{(sendDelay / 1000).toFixed(1)}s</span>
                                    </div>
                                    <input type="range" min="500" max="5000" step="100" value={sendDelay} onChange={(e) => setSendDelay(Number(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none accent-[#8B5E3C]" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 bg-gray-50/30" ref={scrollRef}>
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed ${
                                        msg.role === 'ai' ? 'bg-white border border-gray-100 text-[#4A3728] rounded-tl-none' : 'bg-[#8B5E3C] text-white rounded-tr-none'
                                    }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && <div className="text-[10px] italic text-[#8B5E3C]">Sonia is typing...</div>}
                            {hasError && <button onClick={resetConnection} className="self-center px-4 py-2 bg-red-50 text-red-600 rounded-full text-[10px] font-bold border border-red-100 shadow-sm"><RefreshCw className="w-3 h-3 inline mr-1" /> Reconnect Sonia</button>}
                        </div>

                        <div className="p-4 bg-white border-t">
                            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full border">
                                <button onClick={toggleListening} className={`p-3 rounded-full ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400'}`}>
                                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                                </button>
                                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} className="flex-1 px-4 bg-transparent outline-none text-[13px]" placeholder="Message Sonia..." disabled={hasError || isTyping} />
                                <button onClick={() => sendMessage()} className="bg-[#8B5E3C] text-white p-3 rounded-full disabled:opacity-30" disabled={!input.trim() || isTyping || hasError}>
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <button onClick={() => setIsOpen(!isOpen)} className="bg-[#2D241E] text-white p-5 rounded-[2.2rem] shadow-2xl border-4 border-white">
                <MessageSquare className="w-6 h-6" />
                {!isOpen && <span className="absolute top-2 right-2 bg-orange-500 text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">1</span>}
            </button>
        </div>
    );
});
