import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
    BrowserRouter as Router, 
    Routes, 
    Route, 
    Link, 
    useParams, 
    useNavigate,
    useLocation,
    Navigate
} from 'react-router-dom';
import { 
    Flower, Heart, ShoppingBag, Send, X, Star, 
    Menu, RefreshCw, Trash2, 
    CheckCircle, Sparkles, MapPin, 
    Phone, Mail, Instagram, Facebook, ShieldAlert,
    Check, Minus, Plus, Twitter, Play, Volume2, VolumeX, Film,
    ExternalLink, Settings, LayoutDashboard, Eye,
    LogOut, AlertCircle, Clock, Save, ArrowLeft,
    TrendingUp, Users, Package, DollarSign, User, Upload,
    ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { ChatBot } from './ChatBot';
import { Product, Review, Order, AppState, Reel } from './types';

// --- Default Data ---
const defaultProducts: Product[] = [
    { id: 1, name: "Glow Radiance Serum", slug: "glow-serum", price: 1850, compareAtPrice: 2600, desc: "Best for dark spots and 10-year-old freckles. Highly concentrated formula with high-grade Niacinamide and Alpha Arbutin specially for Pakistani skin.", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600", stock: 120, category: 'Beauty', sku: 'BB-GLW-01' },
    { id: 4, name: "Herbal Detox Tea", slug: "herbal-detox", price: 1200, compareAtPrice: 1500, desc: "Best for weight loss and natural skin glow. 100% Organic blend of green tea, senna, and lemon grass.", image: "https://images.unsplash.com/photo-1544787210-2213d84ad96b?q=80&w=600", stock: 150, category: 'Wellness', sku: 'BB-DTX-04' },
    { id: 5, name: "Vitality Max Supplement", slug: "vitality-max", price: 2450, compareAtPrice: 3500, desc: "Premium energy and performance booster for men. Natural ingredients for long-lasting health benefits and stamina.", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600", stock: 65, category: 'Sexual Wellness', sku: 'BB-VIT-05' },
    { id: 2, name: "Midnight Recovery Oil", slug: "midnight-recovery", price: 3150, compareAtPrice: 4000, desc: "Lavender & Botanical Extracts for overnight repair. Replenishes moisture levels and restores damaged skin barrier.", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600", stock: 45, category: 'Beauty', sku: 'BB-MNT-02' }
];

const defaultReviews: Review[] = [
    { id: 1, reviewer: "Shah Kabish", rating: 5, comment: "The quality of these beauty products is unmatched.", verified: true },
    { id: 2, reviewer: "Tooba", rating: 5, comment: "Excellent delivery speed and lovely packaging.", verified: true },
    { id: 3, reviewer: "Farzana Bilal", rating: 5, comment: "Detox tea is a life changer for bloating.", verified: true }
];

// --- Components ---

const Navbar = ({ wishlistCount, openWishlist, logoClicks, setLogoClicks, triggerAdmin }: any) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#F0E6D8] py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-[100]">
            <Link to="/" className="flex items-center gap-3 group" onClick={() => {
                const newCount = logoClicks + 1;
                if (newCount >= 10) {
                    setLogoClicks(0);
                    triggerAdmin();
                } else {
                    setLogoClicks(newCount);
                    setTimeout(() => setLogoClicks(0), 3000);
                }
            }}>
                <div className="bg-[#8B5E3C] p-2 rounded-2xl shadow-xl transition-all group-hover:scale-110 group-hover:rotate-6 ring-4 ring-[#F0E6D8]">
                    <Flower className="text-white w-6 h-6" />
                </div>
                <span className="font-bold text-xl tracking-tighter uppercase font-sans text-[#2D241E]">
                    BULLSEYE <span className="text-[#8B5E3C] font-light">BEAUTY</span>
                </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-xs font-sans font-bold uppercase tracking-[0.2em]">
                <Link to="/" className="hover:text-[#8B5E3C] transition-colors">Home</Link>
                <a href="#collection" className="hover:text-[#8B5E3C] transition-colors">Collection</a>
                <a href="#reviews" className="hover:text-[#8B5E3C] transition-colors">Reviews</a>
                <button onClick={openWishlist} className="relative">
                    <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#C44536] text-[#C44536]' : ''}`} />
                    {wishlistCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center">{wishlistCount}</span>}
                </button>
            </div>

            <div className="flex items-center gap-4 md:hidden">
                <button onClick={openWishlist} className="relative">
                    <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#C44536] text-[#C44536]' : ''}`} />
                </button>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
};

const Footer = () => (
    <footer className="bg-[#2D241E] text-white py-24 px-6 md:px-12 mt-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-8">
                    <Flower className="w-8 h-8 text-[#8B5E3C]" />
                    <span className="font-bold text-2xl tracking-tighter uppercase">BULLSEYE <span className="font-light text-[#8B5E3C]">BEAUTY</span></span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed max-w-md mb-8">
                    Bringing premium, medical-grade formulations to South Asian skin. Science-backed results for lasting beauty and wellness.
                </p>
                <div className="flex gap-4">
                    <Instagram className="w-5 h-5 opacity-50 hover:opacity-100 cursor-pointer transition-opacity" />
                    <Facebook className="w-5 h-5 opacity-50 hover:opacity-100 cursor-pointer transition-opacity" />
                    <Twitter className="w-5 h-5 opacity-50 hover:opacity-100 cursor-pointer transition-opacity" />
                </div>
            </div>
            <div>
                <h4 className="font-bold text-xs uppercase tracking-widest mb-8 text-[#8B5E3C]">Explore</h4>
                <ul className="text-sm space-y-4 text-white/60">
                    <li className="hover:text-white transition-colors cursor-pointer">All Products</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Brand Story</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Shipping Policy</li>
                    <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-xs uppercase tracking-widest mb-8 text-[#8B5E3C]">Support</h4>
                <ul className="text-sm space-y-4 text-white/60">
                    <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#8B5E3C]" /> +92 341 6740158</li>
                    <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#8B5E3C]" /> support@bullseye.pk</li>
                    <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#8B5E3C]" /> Lahore, Pakistan</li>
                </ul>
            </div>
        </div>
        <div className="mt-24 pt-8 border-t border-white/5 text-center text-white/20 text-[10px] uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Bullseye Beauty & Health &bull; All Rights Reserved
        </div>
    </footer>
);

export default function App() {
    const [state, setState] = useState<AppState>(() => {
        const saved = localStorage.getItem('bullseye_state');
        if (saved) return JSON.parse(saved);
        return {
            products: defaultProducts,
            reels: [],
            reviews: defaultReviews,
            orders: [],
            wishlist: [],
            aiQueries: [],
            settings: {
                tickerText: "FREE home delivery in all Pakistan • Season Sale 30% Off • CASH ON DELIVERY 🚚",
                discountPercentage: 30
            },
            stats: { revenue: 0, orders: 0, totalVisits: 0, uniqueVisitors: [] }
        };
    });

    const [isMuted, setIsMuted] = useState(false);
    const [toast, setToast] = useState<{msg: string, visible: boolean}>({ msg: '', visible: false });
    const [logoClicks, setLogoClicks] = useState(0);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('bullseye_state', JSON.stringify(state));
    }, [state]);

    useEffect(() => {
        const userId = localStorage.getItem('bullseye_userId') || Math.random().toString(36).substr(2, 9);
        if (!localStorage.getItem('bullseye_userId')) localStorage.setItem('bullseye_userId', userId);
        setState(prev => {
            const visitors = [...prev.stats.uniqueVisitors];
            if (!visitors.includes(userId)) visitors.push(userId);
            return {
                ...prev,
                stats: {
                    ...prev.stats,
                    totalVisits: (prev.stats.totalVisits || 0) + 1,
                    uniqueVisitors: visitors
                }
            };
        });
    }, []);

    const showToast = useCallback((msg: string) => {
        setToast({ msg, visible: true });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
    }, []);

    const toggleWishlist = useCallback((id: number) => {
        setState(prev => {
            const wishlist = [...prev.wishlist];
            const idx = wishlist.indexOf(id);
            if (idx === -1) {
                wishlist.push(id);
                showToast("Added to Wishlist! ❤️");
            } else {
                wishlist.splice(idx, 1);
                showToast("Removed from Wishlist");
            }
            return { ...prev, wishlist };
        });
    }, [showToast]);

    const logAIQuery = useCallback((query: string, response: string) => {
        setState(prev => ({
            ...prev,
            aiQueries: [
                { id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toLocaleString(), query, response },
                ...(prev.aiQueries || []).slice(0, 49) // Keep last 50
            ]
        }));
    }, []);

    return (
        <Router>
            <div className="bg-[#FDFBF7] min-h-screen text-[#4A3728] font-sans selection:bg-[#8B5E3C] selection:text-white">
                <div className="bg-[#C44536] text-white py-2 overflow-hidden sticky top-0 z-[110] border-b border-black/10">
                    <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] px-4 font-sans text-xs tracking-widest uppercase">
                        {[1,2,3].map(i => (
                            <span key={i} className="mr-8">
                                {state.settings?.tickerText || "FREE home delivery in all Pakistan • CASH ON DELIVERY 🚚"} &nbsp; | &nbsp; 
                            </span>
                        ))}
                    </div>
                </div>

                <Navbar 
                    wishlistCount={state.wishlist.length} 
                    openWishlist={() => setIsWishlistOpen(true)}
                    logoClicks={logoClicks}
                    setLogoClicks={setLogoClicks}
                    triggerAdmin={() => window.location.href = '/admin-hidden-portal-786'}
                />

                <Routes>
                    <Route path="/" element={<Home state={state} onWishlist={toggleWishlist} onBuy={() => {}} />} />
                    <Route path="/product/:id" element={<ProductPage state={state} setState={setState} showToast={showToast} />} />
                    <Route path="/admin-hidden-portal-786" element={<AdminPortal state={state} setState={setState} showToast={showToast} />} />
                    {/* Alias for easy reach if needed during dev, can be removed */}
                    <Route path="/admin" element={<Navigate to="/admin-hidden-portal-786" replace />} />
                </Routes>

                <AnimatePresence>
                    {isWishlistOpen && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex justify-end">
                            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="bg-[#FDFBF7] w-full max-w-md h-full shadow-2xl p-8 flex flex-col">
                                <div className="flex justify-between items-center mb-8 border-b border-[#F0E6D8] pb-6">
                                    <h2 className="font-serif text-3xl">Your <span className="italic text-[#8B5E3C]">Wishlist</span></h2>
                                    <button onClick={() => setIsWishlistOpen(false)} className="p-2 hover:bg-[#F0E6D8] rounded-full"><X className="w-6 h-6" /></button>
                                </div>
                                <div className="flex-1 overflow-y-auto space-y-6">
                                    {state.wishlist.map(id => {
                                        const p = state.products.find(prod => prod.id === id);
                                        if (!p) return null;
                                        return (
                                            <div key={p.id} className="flex gap-4 group">
                                                <img src={p.image} className="w-24 h-24 object-cover rounded-2xl" />
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-xs uppercase tracking-widest">{p.name}</h4>
                                                    <p className="font-bold text-[#8B5E3C] mt-1 text-sm">Rs. {p.price}</p>
                                                    <div className="flex gap-4 mt-3">
                                                        <Link to={`/product/${p.id}`} className="text-[10px] uppercase font-bold tracking-widest text-[#2D241E] hover:text-[#8B5E3C]" onClick={() => setIsWishlistOpen(false)}>View</Link>
                                                        <button onClick={() => toggleWishlist(p.id)} className="text-[10px] uppercase font-bold tracking-widest text-red-400">Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {state.wishlist.length === 0 && <div className="py-20 text-center opacity-40 italic">Nothing magic here yet.</div>}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <ChatBot 
                    isMuted={isMuted} 
                    setIsMuted={setIsMuted} 
                    showToast={showToast} 
                    onNewQuery={logAIQuery}
                />
                <Footer />
                
                {toast.visible && (
                    <div className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-[#2D241E] text-white px-8 py-4 rounded-full shadow-2xl z-[300] font-bold text-xs uppercase tracking-widest animate-bounce">
                        {toast.msg}
                    </div>
                )}
            </div>
        </Router>
    );
}


// --- Video Reels Components ---

const ReelCard = ({ reel, product, isMuted, toggleMute }: { reel: Reel, product?: Product, isMuted: boolean, toggleMute: () => void, key?: any }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoRef.current?.play().catch(() => {});
                    setIsPlaying(true);
                } else {
                    videoRef.current?.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.6 }
        );

        if (videoRef.current) observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="relative aspect-[9/16] w-full bg-black rounded-[2.5rem] overflow-hidden shadow-2xl group border border-white/10">
            <video 
                ref={videoRef}
                src={reel.videoUrl} 
                loop 
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
                onClick={() => {
                    if (videoRef.current?.paused) {
                        videoRef.current.play();
                        setIsPlaying(true);
                    } else {
                        videoRef.current?.pause();
                        setIsPlaying(false);
                    }
                }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none"></div>

            {/* UI Overlays */}
            <div className="absolute top-6 right-6 z-10">
                <button 
                    onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                    className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-all border border-white/10"
                >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
            </div>

            <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col gap-4">
                <div className="space-y-1">
                    <h4 className="text-white font-bold text-sm tracking-tight drop-shadow-md">{reel.title}</h4>
                    {product && <p className="text-white/60 text-[10px] uppercase tracking-widest font-black">{product.category}</p>}
                </div>

                {product && (
                    <Link 
                        to={`/product/${product.id}`}
                        className="bg-white text-black py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-[#8B5E3C] hover:text-white transition-all shadow-xl active:scale-95"
                    >
                        <ShoppingBag className="w-3 h-3" /> Shop Now
                    </Link>
                )}
            </div>

            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="p-6 bg-white/20 backdrop-blur-sm rounded-full text-white animate-pulse">
                        <Play className="w-8 h-8 fill-current" />
                    </div>
                </div>
            )}
        </div>
    );
};

const ProductReels = ({ state }: { state: AppState }) => {
    const [isMuted, setIsMuted] = useState(true);

    if (!state.reels || state.reels.length === 0) return null;

    return (
        <section className="py-32 px-6 md:px-12 bg-[#2D241E]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 overflow-hidden">
                    <div>
                        <motion.h4 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-[#8B5E3C] font-bold uppercase tracking-[0.3em] text-[10px] mb-4"
                        >
                            Shop the Vibe
                        </motion.h4>
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-serif text-5xl md:text-6xl font-light text-white italic"
                        >
                            Featured <span className="not-italic text-[#E6D5C3]">Reels</span>
                        </motion.h2>
                    </div>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-bold max-w-xs leading-loose">
                        Watch our latest promos and beauty tips. Tap to shop the products directly.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {state.reels.map(reel => {
                        const product = state.products.find(p => p.id === reel.productId);
                        return (
                            <ReelCard 
                                key={reel.id} 
                                reel={reel} 
                                product={product} 
                                isMuted={isMuted} 
                                toggleMute={() => setIsMuted(!isMuted)} 
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// --- AI Consultation Component ---

const SoniaConsultation = ({ state }: { state: AppState }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [recommendations, setRecommendations] = useState<Product[]>([]);

    const questions = [
        {
            id: 'category',
            text: "Ji! Sonia here. Aaj hum kis bare mein baat karenge? Aapka primary goal kya hai?",
            options: [
                { label: 'Glowing Skin', value: 'Beauty', icon: <Sparkles className="w-4 h-4" /> },
                { label: 'Weight & Energy', value: 'Wellness', icon: <TrendingUp className="w-4 h-4" /> },
                { label: 'Intimate Wellness', value: 'Sexual Wellness', icon: <ShieldCheck className="w-4 h-4" /> }
            ]
        },
        {
            id: 'skin_type',
            condition: (ans: Record<string, string>) => ans.category === 'Beauty',
            text: "Bohat acha. Aap ki skin type kya hai?",
            options: [
                { label: 'Oily / Acne Prone', value: 'oily' },
                { label: 'Dry / Dull', value: 'dry' },
                { label: 'Sensitive / Damaged', value: 'sensitive' }
            ]
        },
        {
            id: 'wellness_goal',
            condition: (ans: Record<string, string>) => ans.category === 'Wellness',
            text: "Health hi sab kuch hai. Aap kya improve karna chahte hain?",
            options: [
                { label: 'Weight Loss / Detox', value: 'detox' },
                { label: 'Energy & Stamina', value: 'energy' },
                { label: 'Better Digestion', value: 'digestion' }
            ]
        }
    ];

    const currentQuestion = questions[step];

    const handleAnswer = (value: string) => {
        const newAnswers = { ...answers, [currentQuestion.id]: value };
        setAnswers(newAnswers);
        let nextStep = step + 1;
        while (nextStep < questions.length && questions[nextStep].condition && !questions[nextStep].condition!(newAnswers)) {
            nextStep++;
        }
        if (nextStep < questions.length) {
            setStep(nextStep);
        } else {
            const category = newAnswers.category;
            const filtered = state.products.filter(p => p.category === category);
            setRecommendations(filtered.slice(0, 3));
            setStep(99);
        }
    };

    const reset = () => {
        setStep(0);
        setAnswers({});
        setRecommendations([]);
    };

    return (
        <section className="py-24 px-6">
            <div id="ai-consultation" className="max-w-4xl mx-auto bg-white rounded-[2rem] border border-gray-100 shadow-xl relative overflow-hidden">
                <div className="relative p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-40 h-40 shrink-0 relative">
                        <img 
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" 
                            className="w-full h-full object-cover rounded-[2rem] shadow-lg border-2 border-white"
                            alt="Sonia AI"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-white px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2 border border-gray-50">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#8B5E3C]">Sonia</span>
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <AnimatePresence mode="wait">
                            {step !== 99 ? (
                                <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                                    <div>
                                        <h4 className="text-[#8B5E3C] font-bold uppercase tracking-widest text-[9px] mb-2">Fast Consultation</h4>
                                        <p className="font-serif text-2xl md:text-3xl leading-snug">{currentQuestion?.text}</p>
                                    </div>
                                    <div className="grid gap-3">
                                        {currentQuestion?.options.map(opt => (
                                            <button key={opt.value} onClick={() => handleAnswer(opt.value)} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:border-[#8B5E3C] hover:bg-gray-50 transition-all text-left">
                                                <div className="flex items-center gap-3">
                                                    {opt.icon && <div className="text-[#8B5E3C]">{opt.icon}</div>}
                                                    <span className="font-bold text-xs uppercase tracking-widest">{opt.label}</span>
                                                </div>
                                                <ArrowLeft className="w-3 h-3 rotate-180 text-gray-300" />
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                    <div>
                                        <h4 className="text-[#8B5E3C] font-bold uppercase tracking-widest text-[9px] mb-2">Results</h4>
                                        <p className="font-serif text-2xl md:text-3xl">Aapke liye ye <span className="italic">behtareen</span> hain:</p>
                                    </div>
                                    <div className="grid gap-4">
                                        {recommendations.map(p => (
                                            <Link key={p.id} to={`/product/${p.id}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                                                <img src={p.image} className="w-12 h-12 object-cover rounded-xl" />
                                                <div className="flex-1">
                                                    <h5 className="font-bold text-[10px] uppercase">{p.name}</h5>
                                                    <span className="text-[10px] text-[#8B5E3C] font-bold">Rs. {p.price.toLocaleString()}</span>
                                                </div>
                                                <ExternalLink className="w-3 h-3 text-gray-400" />
                                            </Link>
                                        ))}
                                    </div>
                                    <button onClick={reset} className="text-[9px] font-bold uppercase tracking-widest text-[#8B5E3C] underline underline-offset-4">Restart</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Quick View Modal ---

const QuickViewModal = ({ product, onClose, discount }: { product: Product, onClose: () => void, discount: number }) => {
    if (!product) return null;
    const salePrice = product.price * (1 - discount / 100);

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
            onClick={onClose}
        >
            <motion.div 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="bg-white w-full max-w-4xl rounded-[4rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row h-[700px] md:h-[550px]"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-8 right-8 z-20 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all text-white border border-white/20 md:text-gray-500 md:border-gray-100 md:bg-gray-50 md:hover:bg-gray-100"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Left side: Image */}
                <div className="w-full md:w-5/12 h-2/5 md:h-full relative shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    {discount > 0 && (
                        <div className="absolute top-8 left-8 bg-black text-white text-[10px] font-black px-5 py-2 rounded-full shadow-lg z-10 border border-white/20">
                            {discount}% OFF
                        </div>
                    )}
                </div>

                {/* Right side: Details */}
                <div className="w-full md:w-7/12 p-10 md:p-16 overflow-y-auto flex flex-col">
                    <div className="mb-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-[#8B5E3C] text-white px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">
                                {product.category}
                            </span>
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-[#C44536] text-[#C44536]" />)}
                            </div>
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">{product.name}</h2>
                        <div className="flex items-center gap-6 mb-8">
                            <span className="text-4xl font-light text-[#2D241E]">Rs. {salePrice.toLocaleString()}</span>
                            {product.compareAtPrice && product.compareAtPrice > product.price && (
                                <span className="text-sm text-gray-400 line-through decoration-red-400">Rs. {product.compareAtPrice.toLocaleString()}</span>
                            )}
                        </div>
                        <p className="text-sm text-[#6B5A4E] leading-relaxed mb-10 border-l-4 border-[#8B5E3C] pl-8 italic opacity-80">
                            {product.desc}
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col justify-center">
                                <h5 className="font-bold text-[9px] uppercase tracking-widest text-[#8B5E3C] mb-2">Inventory</h5>
                                <p className="text-xs font-black">{product.stock > 0 ? `${product.stock} units left` : 'Out of Stock'}</p>
                            </div>
                            <div className="bg-[#FDFBF7] p-6 rounded-[2rem] border border-[#F0E6D8] flex flex-col justify-center">
                                <h5 className="font-bold text-[9px] uppercase tracking-widest text-[#8B5E3C] mb-2">Shipping Info</h5>
                                <p className="text-xs font-black text-green-600">FREE Cash on Delivery</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link 
                            to={`/product/${product.id}`} 
                            onClick={onClose}
                            className="w-full flex items-center justify-center gap-4 bg-[#2D241E] text-white py-6 rounded-[2rem] font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#8B5E3C] hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                        >
                            View Full Details & Purchase <ShoppingBag className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- Home Page ---

const Home = ({ state, onWishlist }: { state: AppState, onWishlist: (id: number) => void, onBuy: (p: Product) => void }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);
    const discount = state.settings?.discountPercentage || 0;

    useEffect(() => {
        const timer = setInterval(() => setCurrentSlide(s => (s + 1) % 3), 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero */}
            <header className="relative h-[90vh] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0">
                    {[
                        'https://images.unsplash.com/photo-1522338221027-2f45f9a395c5?q=80&w=1600',
                        'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1600',
                        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1600'
                    ].map((img, i) => (
                        <motion.div
                            key={img}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: currentSlide === i ? 1 : 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${img})` }}
                        />
                    ))}
                </div>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <motion.h1 initial={{ y: 20 }} animate={{ y: 0 }} className="text-6xl md:text-8xl font-light leading-[0.9] mb-6 drop-shadow-2xl">
                        Radiance & <br /><span className="italic text-[#E6D5C3] font-serif">Vitality</span>
                    </motion.h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-[#F5E6D3] opacity-90 tracking-wide font-sans">
                        Premium beauty and health solutions delivered to your doorstep across Pakistan.
                    </p>
                    <a href="#collection" className="bg-[#8B5E3C] text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-all inline-block shadow-2xl">
                        View Collection
                    </a>
                </div>
            </header>

            {/* Benefits */}
            <section className="py-24 bg-[#FDFBF7]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <motion.div 
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            initial: {},
                            animate: { transition: { staggerChildren: 0.15 } }
                        }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
                    >
                        {[
                            { icon: Sparkles, title: "Premium Formulations", text: "Medical-grade ingredients for South Asian skin types." },
                            { icon: ShieldAlert, title: "Dermatologist Tested", text: "Safe and effective for humid Pakistan weather." },
                            { icon: MapPin, title: "Nationwide Luxury", text: "Complimentary home delivery from Karachi to Gilgit." }
                        ].map((b, i) => (
                            <motion.div 
                                key={i} 
                                variants={{
                                    initial: { opacity: 0, y: 20 },
                                    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                }}
                                className="group"
                            >
                                <div className="inline-flex p-6 rounded-[2rem] bg-white border border-[#F0E6D8] mb-6 group-hover:bg-[#8B5E3C] group-hover:text-white transition-all shadow-sm">
                                    <b.icon className="w-7 h-7" />
                                </div>
                                <h4 className="font-serif text-2xl mb-4 text-[#2D241E]">{b.title}</h4>
                                <p className="text-[10px] leading-relaxed text-[#6B5A4E] uppercase tracking-widest px-4">{b.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Collection */}
            <section id="collection" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="mb-20 overflow-hidden">
                    <motion.h4 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-[#8B5E3C] font-bold uppercase tracking-[0.3em] text-[10px] mb-4"
                    >
                        Verified High Quality
                    </motion.h4>
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-serif text-5xl md:text-6xl font-light"
                    >
                        The Prestige <span className="italic">Catalog</span>
                    </motion.h2>
                </div>
                <motion.div 
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        initial: {},
                        animate: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
                >
                    {state.products.map(p => (
                        <motion.div 
                            key={p.id}
                            variants={{
                                initial: { opacity: 0, y: 30 },
                                animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                            }}
                            className="group bg-white rounded-[2.5rem] overflow-hidden border border-[#F0E6D8] p-6 hover:shadow-2xl transition-all h-[500px] flex flex-col"
                        >
                            <div className="h-60 overflow-hidden relative rounded-[2rem] mb-6 block">
                                <Link to={`/product/${p.id}`} className="block h-full w-full">
                                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                                    {discount > 0 && (
                                        <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg z-10">
                                            {discount}% OFF
                                        </div>
                                    )}
                                </Link>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 gap-3 pointer-events-none">
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setSelectedQuickView(p);
                                        }}
                                        className="bg-white/90 backdrop-blur-md text-[#2D241E] p-3.5 rounded-full hover:scale-110 active:scale-90 transition-all shadow-xl border border-white/20 pointer-events-auto"
                                        title="Quick View"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <Link to={`/product/${p.id}`} className="bg-white text-[#2D241E] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl pointer-events-auto">
                                        Details
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-xs uppercase tracking-tight">{p.name}</h3>
                                {p.stock < 10 && <span className="text-[9px] font-bold text-red-500 animate-pulse">Low Stock</span>}
                            </div>
                            <p className="text-xs text-[#6B5A4E] mb-6 line-clamp-2">{p.desc}</p>
                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex flex-col">
                                    <span className="font-bold text-xl">Rs. {(p.price * (1 - discount / 100)).toLocaleString()}</span>
                                    {p.compareAtPrice && p.compareAtPrice > p.price && (
                                        <span className="text-[10px] text-gray-400 line-through">Rs. {p.compareAtPrice.toLocaleString()}</span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => onWishlist(p.id)} className="p-3 bg-[#FDFBF7] border border-[#F0E6D8] rounded-xl text-[#8B5E3C] hover:bg-[#F0E6D8] transition-colors">
                                        <Heart className={`w-4 h-4 ${state.wishlist.includes(p.id) ? 'fill-[#C44536] text-[#C44536]' : ''}`} />
                                    </button>
                                    <Link to={`/product/${p.id}`} className="bg-[#2D241E] text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#8B5E3C] transition-colors">BUY</Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* AI Consultation */}
            <SoniaConsultation state={state} />

            {/* Product Reels */}
            <ProductReels state={state} />

            {/* Reviews */}
            <section id="reviews" className="py-32 bg-[#F0E6D8]/30">
                <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                    <motion.h4 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-[#8B5E3C] font-bold uppercase tracking-[0.3em] text-[10px] mb-4"
                    >
                        Customer Love
                    </motion.h4>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-5xl md:text-6xl font-light mb-20"
                    >
                        Real <span className="italic text-[#8B5E3C]">Transformations</span>
                    </motion.h2>
                    <motion.div 
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={{
                            initial: {},
                            animate: { transition: { staggerChildren: 0.2 } }
                        }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {state.reviews.map(r => (
                            <motion.div 
                                key={r.id} 
                                variants={{
                                    initial: { opacity: 0, scale: 0.95 },
                                    animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
                                }}
                                className="bg-white p-10 rounded-[3rem] text-left shadow-sm flex flex-col border border-[#F0E6D8]"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < r.rating ? 'fill-[#C44536] text-[#C44536]' : 'text-gray-100'}`} />)}
                                </div>
                                <p className="text-sm italic mb-8 flex-1 leading-relaxed opacity-80">"{r.comment}"</p>
                                
                                {r.video && (
                                    <div className="mb-6 rounded-2xl overflow-hidden aspect-video bg-black border border-gray-100">
                                        <video src={r.video} controls className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <div className="flex items-center gap-4">
                                    <div className="bg-[#8B5E3C] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs">{r.reviewer.charAt(0)}</div>
                                    <div>
                                        <h5 className="font-bold text-xs uppercase">{r.reviewer}</h5>
                                        <span className="text-[10px] text-green-600 flex items-center gap-1 font-bold italic"><CheckCircle className="w-3 h-3" /> Verified Purchase</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {selectedQuickView && (
                    <QuickViewModal 
                        product={selectedQuickView} 
                        onClose={() => setSelectedQuickView(null)} 
                        discount={discount} 
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// --- Product Page ---

const ProductPage = ({ state, setState, showToast }: { state: AppState, setState: React.Dispatch<React.SetStateAction<AppState>>, showToast: (m: string) => void }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const [isOrdering, setIsOrdering] = useState(false);
    const [activeMedia, setActiveMedia] = useState(0);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [videoControls, setVideoControls] = useState(false);
    const discount = state.settings?.discountPercentage || 0;

    useEffect(() => {
        return () => {
            if (videoPreview) URL.revokeObjectURL(videoPreview);
        };
    }, [videoPreview]);

    const product = useMemo(() => state.products.find(p => p.id === Number(id)), [state.products, id]);

    if (!product) return <div className="py-40 text-center">Product not found. <Link to="/" className="text-[#8B5E3C] underline">Go Home</Link></div>;

    const salePrice = product.price * (1 - discount / 100);
    
    // Gallery Logic: Image first, Promo Video second if available
    const gallery = [
        { type: 'image', url: product.image },
        ...(product.promoVideo ? [{ type: 'video', url: product.promoVideo }] : [])
    ];

    const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const order: Order = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toLocaleString(),
            product: product.name,
            quantity: qty,
            price: salePrice,
            name: fd.get('name') as string,
            phone: fd.get('phone') as string,
            city: fd.get('city') as string,
            address: fd.get('address') as string,
            status: 'pending'
        };

        setState(prev => ({
            ...prev,
            orders: [order, ...prev.orders],
            stats: { 
                ...prev.stats, 
                revenue: (prev.stats.revenue || 0) + (salePrice * qty),
                orders: (prev.stats.orders || 0) + 1
            },
            products: prev.products.map(p => p.id === product.id ? { ...p, stock: (p.stock || 0) - qty } : p)
        }));

        setIsOrdering(false);
        showToast("Order Placed Successfully! 🚚");
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-24 pb-40 px-6 md:px-12 max-w-7xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8B5E3C] mb-12 hover:gap-4 transition-all">
                <ArrowLeft className="w-4 h-4" /> Go Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="sticky top-40 h-fit space-y-6">
                    <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white bg-black">
                        <AnimatePresence mode="wait">
                            {gallery[activeMedia].type === 'image' ? (
                                <motion.img 
                                    key={`img-${activeMedia}`}
                                    initial={{ opacity: 0, scale: 0.95 }} 
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    src={gallery[activeMedia].url} 
                                    className="w-full h-full object-cover" 
                                />
                            ) : (
                                <div 
                                    className="relative w-full h-full group cursor-pointer"
                                    onMouseEnter={() => setVideoControls(true)}
                                    onMouseLeave={() => setVideoControls(false)}
                                >
                                    <motion.video 
                                        key={`vid-${activeMedia}`}
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        src={gallery[activeMedia].url} 
                                        className="w-full h-full object-cover"
                                        controls={videoControls}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                    {!videoControls && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="bg-black/20 backdrop-blur-sm p-8 rounded-full scale-90 group-hover:scale-100 transition-transform duration-300">
                                                <Play className="w-10 h-10 text-white fill-current opacity-80" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {gallery.length > 1 && (
                        <div className="flex gap-4 px-4">
                            {gallery.map((item, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setActiveMedia(i)}
                                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${activeMedia === i ? 'border-[#8B5E3C] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    {item.type === 'image' ? (
                                        <img src={item.url} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-black flex items-center justify-center">
                                            <Play className="w-5 h-5 text-white fill-current" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="bg-[#8B5E3C] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse">Official Store</span>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#C44536] text-[#C44536]" />)}
                        </div>
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl mb-8 leading-tight">{product.name}</h1>
                    <div className="flex items-center gap-6 mb-12">
                        <span className="text-4xl font-light">Rs. {salePrice.toLocaleString()}</span>
                        {discount > 0 && <span className="text-white bg-[#C44536] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ">{discount}% OFF</span>}
                    </div>
                    <div className={`mb-12 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest ${product.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        {product.stock > 0 ? `${product.stock} Units Available` : 'Out of Stock'}
                    </div>
                    {product.category === 'Sexual Wellness' && (
                        <div className="mb-8 flex flex-col gap-4">
                            <div className="bg-[#2D241E] text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg border border-white/10 group hover:scale-[1.02] transition-transform">
                                <ShieldAlert className="w-5 h-5 text-[#8B5E3C]" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest">100% Discreet Packaging</span>
                                    <span className="text-[9px] opacity-60">No product name or shop details on the external box</span>
                                </div>
                            </div>
                            <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3">
                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                <p className="text-[10px] text-red-700 leading-relaxed font-medium">
                                    <span className="font-bold uppercase">Disclaimer:</span> Please consult a medical specialist before use. Individual results may vary. This product is not intended to diagnose, treat, or cure any disease.
                                </p>
                            </div>
                        </div>
                    )}
                    <p className="text-lg leading-relaxed text-[#4A3728]/70 mb-12 border-l-4 border-[#8B5E3C] pl-8">
                        {product.desc}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-12">
                        <div className="bg-white border border-[#F0E6D8] p-6 rounded-3xl">
                            <Sparkles className="w-6 h-6 text-[#8B5E3C] mb-4" />
                            <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Results</h4>
                            <p className="text-[10px] opacity-60">Visible change in 14 days</p>
                        </div>
                        <div className="bg-white border border-[#F0E6D8] p-6 rounded-3xl">
                            <ShieldAlert className="w-6 h-6 text-[#8B5E3C] mb-4" />
                            <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Tested</h4>
                            <p className="text-[10px] opacity-60">100% Skin Safe Formula</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 p-8 bg-white border-2 border-[#F0E6D8] rounded-[3rem] shadow-sm">
                        <div className="flex justify-between items-center bg-[#FDFBF7] p-4 rounded-2xl">
                            <span className="font-bold text-xs uppercase tracking-widest">Quantity</span>
                            <div className="flex items-center gap-6">
                                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-[#F0E6D8] rounded-lg transition-colors"><Minus className="w-4 h-4" /></button>
                                <span className="font-bold w-4 text-center">{qty}</span>
                                <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-[#F0E6D8] rounded-lg transition-colors"><Plus className="w-4 h-4" /></button>
                            </div>
                        </div>
                        <button 
                            disabled={product.stock <= 0}
                            onClick={() => setIsOrdering(true)}
                            className="w-full bg-[#2D241E] text-white py-6 rounded-3xl font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#8B5E3C] hover:scale-[1.02] transition-all disabled:opacity-50"
                        >
                            {product.stock > 0 ? `Confirm Order - Rs. ${(salePrice * qty).toLocaleString()}` : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Review Submission Section */}
            <section className="mt-32 pt-32 border-t border-[#F0E6D8]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <h4 className="text-[#8B5E3C] font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Feedback</h4>
                        <h2 className="font-serif text-5xl mb-8">Tell us about your <span className="italic text-[#8B5E3C]">experience</span></h2>
                        <p className="text-[#4A3728]/60 text-sm leading-relaxed mb-12">
                            Aapka feedback humare liye bohat ahem hai. Share your journey and help others choose the right wellness path.
                        </p>
                    </div>
                    
                    <div className="bg-[#FDFBF7] p-12 rounded-[4rem] border border-[#F0E6D8]">
                        <form className="space-y-8" onSubmit={(e) => {
                            e.preventDefault();
                            const fd = new FormData(e.currentTarget);
                            const name = fd.get('name') as string;
                            const comment = fd.get('comment') as string;
                            const rating = parseInt(fd.get('rating') as string);
                            const videoFile = fd.get('video') as File;
                            
                            const submitReview = (videoUrl?: string) => {
                                const newReview: Review = {
                                    id: Date.now(),
                                    reviewer: name,
                                    comment,
                                    rating,
                                    verified: true,
                                    video: videoUrl
                                };
                                setState(prev => ({
                                    ...prev,
                                    reviews: [newReview, ...prev.reviews]
                                }));
                                showToast("Shukriya! Your review has been posted.");
                                setVideoPreview(null);
                                (e.target as HTMLFormElement).reset();
                            };

                            if (videoFile && videoFile.size > 0) {
                                const reader = new FileReader();
                                reader.onloadend = () => submitReview(reader.result as string);
                                reader.readAsDataURL(videoFile);
                            } else {
                                submitReview();
                            }
                        }}>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-3 ml-2">Display Name</label>
                                    <input name="name" required placeholder="Ayesha K." className="w-full bg-white border border-[#F0E6D8] p-5 rounded-2xl outline-none focus:border-[#8B5E3C] text-sm" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-3 ml-2">Rating</label>
                                    <select name="rating" className="w-full bg-white border border-[#F0E6D8] p-5 rounded-2xl outline-none focus:border-[#8B5E3C] text-sm font-bold">
                                        <option value="5">⭐⭐⭐⭐⭐ (Perfect)</option>
                                        <option value="4">⭐⭐⭐⭐ (Good)</option>
                                        <option value="3">⭐⭐⭐ (Average)</option>
                                        <option value="2">⭐⭐ (Needs Work)</option>
                                        <option value="1">⭐ (Poor)</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-3 ml-2">Your Experience</label>
                                <textarea name="comment" required placeholder="Main ne ye product 2 weeks use kiya aur..." rows={4} className="w-full bg-white border border-[#F0E6D8] p-5 rounded-2xl outline-none focus:border-[#8B5E3C] text-sm"></textarea>
                            </div>
                            
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-3 ml-2">Video Testimonial (Optional)</label>
                                <div className="space-y-4">
                                    <input 
                                        type="file" 
                                        name="video"
                                        accept="video/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                if (videoPreview) URL.revokeObjectURL(videoPreview);
                                                setVideoPreview(URL.createObjectURL(file));
                                            } else {
                                                setVideoPreview(null);
                                            }
                                        }}
                                        className="w-full bg-white border border-[#F0E6D8] p-5 rounded-2xl outline-none focus:border-[#8B5E3C] text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F0E6D8] file:text-[#8B5E3C] hover:file:bg-[#8B5E3C] hover:file:text-white file:transition-colors" 
                                    />
                                    {videoPreview && (
                                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
                                            <video src={videoPreview} controls className="w-full h-full object-cover" />
                                            <button 
                                                type="button" 
                                                onClick={() => {
                                                    if (videoPreview) URL.revokeObjectURL(videoPreview);
                                                    setVideoPreview(null);
                                                }}
                                                className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-xl hover:scale-110 transition-all"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                    <p className="text-[9px] text-gray-400 italic ml-2">Max length recommended: 30 seconds. Video reviews build 10x more trust!</p>
                                </div>
                            </div>

                            <button className="w-full bg-[#2D241E] text-white py-6 rounded-3xl font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#8B5E3C] transition-all">
                                Post Public Review
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {isOrdering && (
                <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setIsOrdering(false)}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-white w-full max-w-xl p-10 rounded-[4rem] shadow-2xl relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <button onClick={() => setIsOrdering(false)} className="absolute top-8 right-8 p-3 bg-[#FDFBF7] rounded-full"><X className="w-6 h-6" /></button>
                        <h2 className="font-serif text-4xl mb-2">Checkout <span className="italic text-[#8B5E3C]">Details</span></h2>
                        <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40 mb-10">Cash on Delivery - Free Shipping</p>
                        
                        <form onSubmit={handlePlaceOrder} className="space-y-6">
                            <input name="name" required placeholder="Your Full Name" className="w-full bg-[#FDFBF7] border border-[#F0E6D8] p-5 rounded-2xl outline-none focus:border-[#8B5E3C] transition-all" />
                            <input name="phone" required placeholder="Phone Number (e.g. 03xx-xxxxxxx)" className="w-full bg-[#FDFBF7] border border-[#F0E6D8] p-5 rounded-2xl outline-none focus:border-[#8B5E3C] transition-all" />
                            <div className="grid grid-cols-2 gap-6">
                                <input name="city" required placeholder="City" className="w-full bg-[#FDFBF7] border border-[#F0E6D8] p-5 rounded-2xl outline-none focus:border-[#8B5E3C] transition-all" />
                                <input name="area" placeholder="Area / Landmark" className="w-full bg-[#FDFBF7] border border-[#F0E6D8] p-5 rounded-2xl outline-none focus:border-[#8B5E3C] transition-all" />
                            </div>
                            <textarea name="address" required placeholder="Full Home Address" rows={3} className="w-full bg-[#FDFBF7] border border-[#F0E6D8] p-5 rounded-2xl outline-none focus:border-[#8B5E3C] transition-all" />
                            <button className="w-full bg-[#8B5E3C] text-white py-6 rounded-3xl font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:brightness-110 shadow-xl transition-all">
                                Complete Order <ArrowLeft className="w-5 h-5 rotate-180" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

// --- Admin Portal (Shopify Style) ---

const AdminPortal = ({ state, setState, showToast }: { state: AppState, setState: React.Dispatch<React.SetStateAction<AppState>>, showToast: (m: string) => void }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('admin_session') === 'active');
    const [pass, setPass] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [lockedUntil, setLockedUntil] = useState<number | null>(() => {
        const saved = localStorage.getItem('admin_lockout');
        return saved ? parseInt(saved) : null;
    });
    const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'inventory' | 'customers' | 'settings'>('overview');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [invFilter, setInvFilter] = useState<'All' | 'Beauty' | 'Wellness' | 'Sexual Wellness'>('All');
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const bulkDelete = () => {
        if (confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) {
            setState(prev => ({
                ...prev,
                products: prev.products.filter(p => !selectedIds.includes(p.id))
            }));
            setSelectedIds([]);
            showToast(`${selectedIds.length} Products Deleted`);
        }
    };

    const bulkChangeCategory = (cat: any) => {
        setState(prev => ({
            ...prev,
            products: prev.products.map(p => selectedIds.includes(p.id) ? { ...p, category: cat } : p)
        }));
        setSelectedIds([]);
        showToast(`${selectedIds.length} products moved to ${cat}`);
    };

    useEffect(() => {
        if (lockedUntil && Date.now() > lockedUntil) {
            setLockedUntil(null);
            localStorage.removeItem('admin_lockout');
            setAttempts(0);
        }
    }, [lockedUntil]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (lockedUntil && Date.now() < lockedUntil) return;
        
        if (pass === 'adeel1471') {
            setIsLoggedIn(true);
            sessionStorage.setItem('admin_session', 'active');
            setAttempts(0);
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            if (newAttempts >= 3) {
                const lockTime = Date.now() + 10 * 60 * 1000;
                setLockedUntil(lockTime);
                localStorage.setItem('admin_lockout', lockTime.toString());
            }
            showToast("Invalid Credentials");
        }
    };

    const deleteProduct = (id: number) => {
        if (confirm("Are you sure you want to delete this product?")) {
            setState(prev => {
                const updated = {
                    ...prev,
                    products: prev.products.filter(p => p.id !== id)
                };
                // Immediately persist so deleted product doesn't reappear on refresh
                localStorage.setItem('bullseye_state', JSON.stringify(updated));
                return updated;
            });
            showToast("Product Deleted");
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-12 rounded-xl shadow-xl w-full max-w-sm border border-gray-200">
                    <div className="flex justify-center mb-8">
                        <div className="bg-black p-3 rounded-xl shadow-lg">
                            <Flower className="text-white w-8 h-8" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-2">Bullseye Partner</h2>
                    <p className="text-xs text-center text-gray-500 mb-10">Manage your prestige beauty store</p>
                    
                    {lockedUntil ? (
                        <div className="bg-red-50 p-6 rounded-xl border border-red-100 flex flex-col items-center gap-4 text-red-600">
                            <Clock className="w-8 h-8" />
                            <div className="text-xs font-bold uppercase tracking-widest text-center">Security Lock: 10 minutes</div>
                        </div>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Password</label>
                                <input 
                                    type="password" 
                                    value={pass} 
                                    onChange={e => setPass(e.target.value)}
                                    placeholder="••••••••" 
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-black transition-all" 
                                />
                            </div>
                            <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm hover:translate-y-[-2px] active:translate-y-[0px] transition-all shadow-lg">
                                Login to Dashboard
                            </button>
                            {attempts > 0 && <p className="text-center text-red-500 text-[10px] font-bold">Attempt {attempts} of 3</p>}
                        </form>
                    )}
                </motion.div>
            </div>
        );
    }

    const aov = state.stats.orders > 0 ? (state.stats.revenue / state.stats.orders).toFixed(0) : 0;
    const conversion = state.stats.totalVisits > 0 ? ((state.stats.orders / state.stats.totalVisits) * 100).toFixed(1) : 0;

    return (
        <div className="min-h-screen bg-[#F4F6F8] flex flex-col md:flex-row font-sans">
            {/* Shopify Sidebar */}
            <div className="w-full md:w-64 bg-[#1A1C1D] text-gray-300 flex flex-col h-screen overflow-hidden sticky top-0">
                <div className="p-6 flex items-center gap-3 border-b border-white/5">
                    <div className="bg-white/10 p-2 rounded-lg">
                        <Flower className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-sm text-white tracking-tight">Bullseye HQ</span>
                </div>
                
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {[
                        { id: 'overview', label: 'Home', icon: LayoutDashboard },
                        { id: 'orders', label: 'Orders', icon: ShoppingBag },
                        { id: 'inventory', label: 'Products', icon: Package },
                        { id: 'media', label: 'Media Reels', icon: Film },
                        { id: 'customers', label: 'Insights', icon: Users },
                        { id: 'settings', label: 'Settings', icon: Settings }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${activeTab === tab.id ? 'bg-white/10 text-white' : 'hover:bg-white/5 hover:text-white'}`}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-gray-500'}`} />
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button 
                        onClick={() => { sessionStorage.removeItem('admin_session'); window.location.reload(); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-all text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
                            <p className="text-sm text-gray-500">Real-time store performance</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1.5 border border-green-200">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                LIVE
                            </span>
                        </div>
                    </div>

                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { label: 'Total Revenue', val: `Rs. ${state.stats.revenue.toLocaleString()}`, change: '+12%', icon: DollarSign, color: 'text-blue-600' },
                                    { label: 'Total Orders', val: state.stats.orders, change: '+5%', icon: ShoppingBag, color: 'text-purple-600' },
                                    { label: 'Avg Order Value', val: `Rs. ${aov}`, change: 'Stable', icon: TrendingUp, color: 'text-green-600' },
                                    { label: 'Conversion Rate', val: `${conversion}%`, change: '-2%', icon: Users, color: 'text-orange-600' }
                                ].map((s, i) => (
                                    <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-2 rounded-lg bg-gray-50 ${s.color}`}>
                                                <s.icon className="w-5 h-5" />
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                {s.change}
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                                        <h4 className="text-2xl font-bold text-gray-900">{s.val}</h4>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="font-bold text-sm mb-8 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Sales Velocity</h3>
                                    <div className="h-64 flex items-end gap-2 px-2">
                                        {[45, 67, 89, 56, 78, 120, 90, 110, 85, 95, 130, 150].map((h, i) => (
                                            <div key={i} className="flex-1 bg-black/5 hover:bg-black/10 rounded-t-lg transition-all relative group cursor-pointer" style={{ height: `${h}%` }}>
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Rs.{h * 1000}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between mt-4 text-[10px] text-gray-400 font-bold px-2">
                                        <span>JAN</span>
                                        <span>JUN</span>
                                        <span>DEC</span>
                                    </div>
                                </div>
                                
                                <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="font-bold text-sm mb-8 flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-500" /> Stock Alerts</h3>
                                    <div className="space-y-6">
                                        {state.products.sort((a, b) => (a.stock || 0) - (b.stock || 0)).slice(0, 3).map(p => (
                                            <div key={p.id} className="flex items-center gap-4">
                                                <img src={p.image} className="w-10 h-10 rounded-lg object-cover" />
                                                <div className="flex-1">
                                                    <h5 className="text-[11px] font-bold line-clamp-1">{p.name}</h5>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                            <div 
                                                                className={`h-full rounded-full ${p.stock < 20 ? 'bg-red-500' : 'bg-amber-500'}`} 
                                                                style={{ width: `${Math.min(100, (p.stock / 100) * 100)}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className={`text-[9px] font-bold ${p.stock < 20 ? 'text-red-500' : 'text-amber-500'}`}>{p.stock} units</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => setActiveTab('inventory')} className="w-full mt-8 py-3 text-[10px] font-bold uppercase text-blue-600 hover:bg-blue-50 rounded-lg transition-all">Restock Products</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-sm">Active Shipments</h3>
                                <div className="flex gap-2">
                                    <button className="text-[10px] font-bold uppercase text-gray-400 hover:text-black border border-gray-200 px-4 py-2 rounded-lg">Export CSV</button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-[11px]">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 font-bold text-gray-400 uppercase tracking-widest">
                                            <th className="p-6">Order ID</th>
                                            <th className="p-6">Recipient</th>
                                            <th className="p-6">Product Feed</th>
                                            <th className="p-6">Total</th>
                                            <th className="p-6">Status</th>
                                            <th className="p-6">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {state.orders.map(o => (
                                            <tr key={o.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-6 font-mono text-gray-400">#{o.id.toUpperCase()}</td>
                                                <td className="p-6">
                                                    <div className="font-bold text-gray-900">{o.name}</div>
                                                    <div className="text-[10px] text-gray-500 mt-1">{o.phone}</div>
                                                    <div className="text-[9px] opacity-60 line-clamp-1 italic">{o.address}, {o.city}</div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="font-medium">{o.product}</div>
                                                    <div className="text-[10px] text-gray-400 mt-1">x{o.quantity} units</div>
                                                </td>
                                                <td className="p-6 font-bold">Rs. {o.price * o.quantity}</td>
                                                <td className="p-6">
                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                                                        o.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                                        o.status === 'shipped' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        'bg-green-50 text-green-600 border-green-100'
                                                    }`}>
                                                        {o.status}
                                                    </span>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex gap-2">
                                                        {o.status === 'pending' && (
                                                            <button 
                                                                onClick={() => setState(prev => ({
                                                                    ...prev,
                                                                    orders: prev.orders.map(ord => ord.id === o.id ? { ...ord, status: 'shipped' } : ord)
                                                                }))}
                                                                className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-[9px] font-bold transition-all"
                                                            >
                                                                Ship Order
                                                            </button>
                                                        )}
                                                        {o.status === 'shipped' && (
                                                            <button 
                                                                onClick={() => setState(prev => ({
                                                                    ...prev,
                                                                    orders: prev.orders.map(ord => ord.id === o.id ? { ...ord, status: 'delivered' } : ord)
                                                                }))}
                                                                className="text-white bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg text-[9px] font-bold transition-all"
                                                            >
                                                                Delivered
                                                            </button>
                                                        )}
                                                        <button 
                                                            onClick={() => setState(prev => ({ ...prev, orders: prev.orders.filter(ord => ord.id !== o.id) }))}
                                                            className="text-gray-400 hover:text-red-600 p-2 border border-gray-100 rounded-lg hover:border-red-100 transition-all"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'inventory' && (
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <div className="flex items-center gap-6">
                                    <h3 className="font-bold text-sm">Product Inventory</h3>
                                    <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
                                        {['All', 'Beauty', 'Wellness', 'Sexual Wellness'].map(c => (
                                            <button 
                                                key={c}
                                                onClick={() => setInvFilter(c as any)}
                                                className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${invFilter === c ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                 <button 
                                    onClick={() => setEditingProduct({ id: 0, name: '', slug: '', price: 0, stock: 100, desc: '', image: '', category: 'Beauty', variants: [] })}
                                    className="text-[10px] font-bold uppercase bg-black text-white px-6 py-2.5 rounded-lg hover:brightness-125 transition-all"
                                >
                                    Add Product
                                </button>
                            </div>

                            {selectedIds.length > 0 && (
                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="px-6 py-4 bg-black text-white flex justify-between items-center"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest">{selectedIds.length} Items Selected</span>
                                        <button 
                                            onClick={() => setSelectedIds([])}
                                            className="text-[10px] uppercase font-bold text-gray-400 hover:text-white"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2 border-r border-white/20 pr-3">
                                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Move to:</span>
                                            {['Beauty', 'Wellness', 'Sexual Wellness'].map(c => (
                                                <button 
                                                    key={c}
                                                    onClick={() => bulkChangeCategory(c)}
                                                    className="text-[9px] font-bold uppercase tracking-widest hover:text-[#8B5E3C] transition-colors"
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                        <button 
                                            onClick={bulkDelete}
                                            className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg"
                                        >
                                            <Trash2 className="w-3 h-3" /> Delete Selected
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-[11px]">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 font-bold text-gray-400 uppercase tracking-widest">
                                            <th className="p-6 w-10">
                                                <input 
                                                    type="checkbox" 
                                                    className="w-4 h-4 accent-black cursor-pointer"
                                                    checked={selectedIds.length > 0 && selectedIds.length === state.products.filter(p => invFilter === 'All' || p.category === invFilter).length}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            const visibleIds = state.products
                                                                .filter(p => invFilter === 'All' || p.category === invFilter)
                                                                .map(p => p.id);
                                                            setSelectedIds(visibleIds);
                                                        } else {
                                                            setSelectedIds([]);
                                                        }
                                                    }}
                                                />
                                            </th>
                                            <th className="p-6">Thumbnail</th>
                                            <th className="p-6">Product Details</th>
                                            <th className="p-6">Stock Status</th>
                                            <th className="p-6">Price</th>
                                            <th className="p-6">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {state.products.filter(p => invFilter === 'All' || p.category === invFilter).map(p => (
                                            <tr key={p.id} className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(p.id) ? 'bg-blue-50/30' : ''}`}>
                                                <td className="p-6 align-top">
                                                    <input 
                                                        type="checkbox" 
                                                        className="w-4 h-4 accent-black cursor-pointer"
                                                        checked={selectedIds.includes(p.id)}
                                                        onChange={() => {
                                                            setSelectedIds(prev => 
                                                                prev.includes(p.id) 
                                                                ? prev.filter(id => id !== p.id) 
                                                                : [...prev, p.id]
                                                            );
                                                        }}
                                                    />
                                                </td>
                                                <td className="p-6 align-top">
                                                    <img src={p.image} className="w-14 h-14 rounded-xl object-cover border border-gray-100" />
                                                </td>
                                                <td className="p-6 align-top">
                                                    <div className="font-bold text-gray-900 text-[12px]">{p.name}</div>
                                                    <div className="text-[10px] text-[#8B5E3C] font-medium mt-1">/{p.slug}</div>
                                                    <p className="text-[10px] text-gray-500 mt-2 line-clamp-1 italic max-w-sm">"{p.desc}"</p>
                                                </td>
                                                <td className="p-6 align-top">
                                                    <div className="flex flex-col gap-2">
                                                        <span className={`font-bold ${p.stock < 20 ? 'text-red-500' : 'text-gray-900'}`}>{p.stock} units left</span>
                                                        <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                            <div 
                                                                className={`h-full rounded-full ${p.stock < 20 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-black'}`} 
                                                                style={{ width: `${Math.min(100, (p.stock / 200) * 100)}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6 align-top font-bold text-[12px]">Rs. {p.price.toLocaleString()}</td>
                                                <td className="p-6 align-top">
                                                    <div className="flex gap-2">
                                                        <button 
                                                            onClick={() => setEditingProduct(p)}
                                                            className="text-gray-900 p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all font-bold"
                                                        >
                                                            <Settings className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => deleteProduct(p.id)}
                                                            className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-lg transition-all shadow-sm font-bold"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'media' && (
                        <div className="space-y-10">
                            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="font-bold text-sm">Active Product Reels</h3>
                                    <form className="flex gap-4 items-end" onSubmit={(e) => {
                                        e.preventDefault();
                                        const fd = new FormData(e.currentTarget);
                                        const title = fd.get('title') as string;
                                        const pid = parseInt(fd.get('productId') as string);
                                        const videoFile = fd.get('videoFile') as File;
                                        const videoUrlInput = fd.get('videoUrl') as string;

                                        const addReel = (url: string) => {
                                            const newReel: Reel = {
                                                id: Math.random().toString(36).substr(2, 9),
                                                title,
                                                videoUrl: url,
                                                productId: pid || undefined
                                            };
                                            setState(prev => ({ ...prev, reels: [newReel, ...(prev.reels || [])] }));
                                            showToast("New Reel Added!");
                                            (e.target as HTMLFormElement).reset();
                                        };

                                        if (videoFile && videoFile.size > 0) {
                                            const url = URL.createObjectURL(videoFile);
                                            addReel(url);
                                        } else if (videoUrlInput) {
                                            addReel(videoUrlInput);
                                        } else {
                                            showToast("Please provide a video file or URL");
                                        }
                                    }}>
                                        <div className="space-y-2">
                                            <label className="block text-[9px] font-black uppercase text-gray-400">Reel Title</label>
                                            <input name="title" required placeholder="Glow Serum Demo" className="bg-gray-50 border border-gray-100 p-3 rounded-lg outline-none focus:border-black text-xs w-48 text-[#000000]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[9px] font-black uppercase text-gray-400">Link to Product</label>
                                            <select name="productId" className="bg-gray-50 border border-gray-100 p-3 rounded-lg outline-none focus:border-black text-xs w-48 text-[#000000]">
                                                <option value="">None</option>
                                                {state.products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-[9px] font-black uppercase text-gray-400">MP4 File or URL</label>
                                            <div className="flex gap-2">
                                                <input type="file" name="videoFile" accept="video/*" className="bg-gray-50 border border-gray-100 p-2 rounded-lg text-[9px] w-40" />
                                                <input name="videoUrl" placeholder="or paste URL" className="bg-gray-50 border border-gray-100 p-3 rounded-lg outline-none focus:border-black text-[9px] w-32 text-[#000000]" />
                                            </div>
                                        </div>
                                        <button className="bg-black text-white px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:brightness-125 transition-all">Add Reel</button>
                                    </form>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                    {(state.reels || []).map(reel => (
                                        <div key={reel.id} className="relative group aspect-[9/16] bg-black rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                            <video src={reel.videoUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 pointer-events-none">
                                                <p className="text-white text-[9px] font-bold line-clamp-2">{reel.title}</p>
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    if(confirm("Remove this reel?")) {
                                                        setState(prev => ({ ...prev, reels: prev.reels.filter(r => r.id !== reel.id) }));
                                                        showToast("Reel Removed");
                                                    }
                                                }}
                                                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-xl"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    {(state.reels || []).length === 0 && (
                                        <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center gap-4 text-gray-400">
                                            <Film className="w-8 h-8 opacity-20" />
                                            <p className="text-[10px] font-bold uppercase tracking-widest">No Active Reels Found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'customers' && (
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                                    <Sparkles className="w-64 h-64 rotate-12" />
                                </div>
                                <h3 className="font-bold text-sm mb-8 flex items-center gap-2"><Sparkles className="w-4 h-4 text-purple-500" /> Ayesha AI Insights</h3>
                                <div className="space-y-6 relative z-10">
                                    {(state.aiQueries || []).length === 0 ? (
                                        <div className="py-20 text-center opacity-40 italic">No customer queries recorded yet.</div>
                                    ) : (
                                        state.aiQueries.map(q => (
                                            <div key={q.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="bg-white p-1.5 rounded-lg border border-gray-200">
                                                            <User className="w-3.5 h-3.5 text-gray-500" />
                                                        </div>
                                                        <span className="text-[10px] font-bold text-gray-400 tabular-nums">{q.timestamp}</span>
                                                    </div>
                                                </div>
                                                <p className="text-[12px] font-bold text-gray-900 mb-4 px-1">Q: "{q.query}"</p>
                                                <div className="bg-white/80 p-4 rounded-xl border border-gray-100 text-[11px] text-gray-600 leading-relaxed italic pr-12 relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-2 opacity-10">
                                                        <Flower className="w-8 h-8" />
                                                    </div>
                                                    Ayesha: "{q.response}"
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="bg-white p-10 rounded-xl border border-gray-200 shadow-sm max-w-2xl">
                            <h3 className="font-bold text-sm mb-10 pb-6 border-b border-gray-100">Store Global Configurations</h3>
                            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-3 tracking-widest">Promotion Ticker Text</label>
                                    <textarea 
                                        value={state.settings?.tickerText} 
                                        onChange={(e) => setState(prev => ({ ...prev, settings: { ...prev.settings, tickerText: e.target.value } }))}
                                        className="w-full bg-gray-50 border border-gray-200 p-5 rounded-xl outline-none focus:border-black transition-all font-medium text-sm"
                                        rows={3}
                                    />
                                    <p className="text-[9px] text-gray-400 mt-2 italic font-medium">* This text scrolls at the top of every page.</p>
                                </div>
                                
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-3 tracking-widest">Global Discount Percentage</label>
                                    <div className="flex items-center gap-6">
                                        <input 
                                            type="number"
                                            value={state.settings?.discountPercentage} 
                                            onChange={(e) => setState(prev => ({ ...prev, settings: { ...prev.settings, discountPercentage: parseInt(e.target.value) || 0 } }))}
                                            className="w-32 bg-gray-50 border border-gray-200 p-5 rounded-xl outline-none focus:border-black transition-all font-bold text-lg"
                                        />
                                        <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div className="h-full bg-black" style={{ width: `${state.settings?.discountPercentage}%` }}></div>
                                        </div>
                                        <span className="text-xl font-bold font-serif italic text-gray-900">{state.settings?.discountPercentage}% OFF</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => showToast("Store Settings Saved Successfully!")}
                                    className="w-full bg-black text-white py-5 rounded-xl font-bold uppercase tracking-widest text-xs hover:brightness-125 transition-all shadow-xl flex items-center justify-center gap-3"
                                >
                                    <Save className="w-5 h-5" /> Persist Global Rules
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            {/* Product Quick Edit Sidebar Overlay */}
            <AnimatePresence>
                {editingProduct && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/30 backdrop-blur-sm flex justify-end"
                        onClick={() => setEditingProduct(null)}
                    >
                        <motion.div 
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            className="bg-white w-full max-w-lg h-full shadow-2xl p-10 flex flex-col border-l border-gray-100"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-xl font-bold">{editingProduct.id ? 'Edit Product' : 'Add New Product'}</h3>
                                <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-gray-50 rounded-full"><X className="w-6 h-6" /></button>
                            </div>

                            <form className="flex-1 space-y-8 overflow-y-auto pr-2" onSubmit={(e) => {
                                e.preventDefault();
                                if (editingProduct.id) {
                                    setState(prev => {
                                        const updated = {
                                            ...prev,
                                            products: prev.products.map(p => p.id === editingProduct.id ? editingProduct : p)
                                        };
                                        localStorage.setItem('bullseye_state', JSON.stringify(updated));
                                        return updated;
                                    });
                                    showToast("Changes Committed");
                                } else {
                                    // Use Date.now() for guaranteed unique numeric ID — filter() deletes work perfectly
                                    const newProd = { ...editingProduct, id: Date.now(), slug: editingProduct.name.toLowerCase().replace(/ /g, '-') };
                                    setState(prev => {
                                        const updated = {
                                            ...prev,
                                            products: [...prev.products, newProd]
                                        };
                                        localStorage.setItem('bullseye_state', JSON.stringify(updated));
                                        return updated;
                                    });
                                    showToast("Product Added to Catalog");
                                }
                                setEditingProduct(null);
                            }}>
                                {/* Product Form */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                {/* Left Column: Info */}
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-[#8B5E3C] border-b border-gray-50 pb-4">Product Details</h4>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Product Title</label>
                                            <input 
                                                value={editingProduct.name} 
                                                onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                placeholder="e.g. Glossy Hydration Serum"
                                                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-black font-medium text-lg" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Product Description / Expert Breakdown</label>
                                            <textarea 
                                                value={editingProduct.desc} 
                                                onChange={e => setEditingProduct({ ...editingProduct, desc: e.target.value })}
                                                placeholder="Describe the product, benefits, and how to use it..."
                                                rows={8}
                                                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-black text-sm text-gray-600 leading-relaxed font-sans" 
                                            />
                                            <p className="text-[9px] text-gray-400 mt-2 italic">* This description appears on the product landing page.</p>
                                        </div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-[#8B5E3C] border-b border-gray-50 pb-4">Promo Video</h4>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Attach Promo Video (MP4/MOV or URL)</label>
                                            <div className="flex gap-4">
                                                <input 
                                                    type="file" 
                                                    accept="video/*"
                                                    onChange={e => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const url = URL.createObjectURL(file);
                                                            setEditingProduct({ ...editingProduct, promoVideo: url });
                                                        }
                                                    }}
                                                    className="flex-1 border border-gray-200 p-4 rounded-xl outline-none focus:border-black text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-semibold file:bg-[#F0E6D8] file:text-[#8B5E3C]" 
                                                />
                                                <input 
                                                    value={editingProduct.promoVideo || ''} 
                                                    onChange={e => setEditingProduct({ ...editingProduct, promoVideo: e.target.value })}
                                                    placeholder="or paste video URL"
                                                    className="flex-1 border border-gray-200 p-4 rounded-xl outline-none focus:border-black text-xs font-medium" 
                                                />
                                            </div>
                                            {editingProduct.promoVideo && (
                                                <div className="mt-4 relative aspect-video rounded-xl overflow-hidden bg-black max-w-[200px]">
                                                    <video src={editingProduct.promoVideo} className="w-full h-full object-cover" controls />
                                                    <button 
                                                        type="button" 
                                                        onClick={() => setEditingProduct({ ...editingProduct, promoVideo: '' })}
                                                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-[#8B5E3C] border-b border-gray-50 pb-4">Pricing & Revenue</h4>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Sale Price (PKR)</label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Rs.</span>
                                                    <input 
                                                        type="number"
                                                        value={editingProduct.price} 
                                                        onChange={e => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) || 0 })}
                                                        className="w-full border border-gray-200 p-4 pl-12 rounded-xl outline-none focus:border-black font-black text-xl" 
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Compare-at Price (PKR)</label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Rs.</span>
                                                    <input 
                                                        type="number"
                                                        value={editingProduct.compareAtPrice || 0} 
                                                        onChange={e => setEditingProduct({ ...editingProduct, compareAtPrice: parseInt(e.target.value) || 0 })}
                                                        className="w-full border border-gray-200 p-4 pl-12 rounded-xl outline-none focus:border-black text-gray-400 line-through font-bold text-lg" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                                        <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                                            <h4 className="text-xs font-black uppercase tracking-widest text-[#8B5E3C]">Product Variants</h4>
                                            <button 
                                                type="button"
                                                onClick={() => {
                                                    const newVariant = {
                                                        id: Math.random().toString(36).substr(2, 9),
                                                        name: '',
                                                        price: editingProduct.price,
                                                        stock: 0,
                                                        sku: ''
                                                    };
                                                    setEditingProduct({
                                                        ...editingProduct,
                                                        variants: [...(editingProduct.variants || []), newVariant]
                                                    });
                                                }}
                                                className="text-[10px] font-black uppercase tracking-widest bg-[#FDFBF7] px-4 py-2 rounded-lg border border-[#F0E6D8] hover:bg-[#F0E6D8] transition-all"
                                            >
                                                + Add Variant
                                            </button>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            {(!editingProduct.variants || editingProduct.variants.length === 0) ? (
                                                <div className="py-10 text-center border-2 border-dashed border-gray-50 rounded-2xl flex flex-col items-center gap-3">
                                                    <div className="p-3 bg-gray-50 rounded-full text-gray-300">
                                                        <Plus className="w-5 h-5" />
                                                    </div>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                                                        No variants added. <br/>Add options like Size, Color, or Weight.
                                                    </p>
                                                </div>
                                            ) : (
                                                editingProduct.variants.map((v, idx) => (
                                                    <div key={v.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4 relative group">
                                                        <button 
                                                            type="button"
                                                            onClick={() => {
                                                                const newVariants = [...(editingProduct.variants || [])];
                                                                newVariants.splice(idx, 1);
                                                                setEditingProduct({ ...editingProduct, variants: newVariants });
                                                            }}
                                                            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                        
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="col-span-2">
                                                                <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">Variant Name (e.g. Medium, Red)</label>
                                                                <input 
                                                                    value={v.name} 
                                                                    onChange={e => {
                                                                        const newVariants = [...(editingProduct.variants || [])];
                                                                        newVariants[idx].name = e.target.value;
                                                                        setEditingProduct({ ...editingProduct, variants: newVariants });
                                                                    }}
                                                                    className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:border-black font-bold text-sm" 
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">Price (PKR)</label>
                                                                <input 
                                                                    type="number"
                                                                    value={v.price} 
                                                                    onChange={e => {
                                                                        const newVariants = [...(editingProduct.variants || [])];
                                                                        newVariants[idx].price = parseInt(e.target.value) || 0;
                                                                        setEditingProduct({ ...editingProduct, variants: newVariants });
                                                                    }}
                                                                    className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:border-black font-bold text-sm" 
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">Stock</label>
                                                                <input 
                                                                    type="number"
                                                                    value={v.stock} 
                                                                    onChange={e => {
                                                                        const newVariants = [...(editingProduct.variants || [])];
                                                                        newVariants[idx].stock = parseInt(e.target.value) || 0;
                                                                        setEditingProduct({ ...editingProduct, variants: newVariants });
                                                                    }}
                                                                    className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:border-black font-bold text-sm" 
                                                                />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">Variant SKU</label>
                                                                <input 
                                                                    value={v.sku} 
                                                                    onChange={e => {
                                                                        const newVariants = [...(editingProduct.variants || [])];
                                                                        newVariants[idx].sku = e.target.value;
                                                                        setEditingProduct({ ...editingProduct, variants: newVariants });
                                                                    }}
                                                                    placeholder="e.g. BB-SKN-MED-01"
                                                                    className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:border-black font-mono text-[10px]" 
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Meta */}
                                <div className="space-y-8">
                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-[#8B5E3C] border-b border-gray-50 pb-4">Media & Visibility</h4>
                                        <div className="space-y-6">
                                            {editingProduct.image && (
                                                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
                                                    <img src={editingProduct.image} className="w-full h-full object-cover" />
                                                    <button 
                                                        type="button"
                                                        onClick={() => setEditingProduct({ ...editingProduct, image: '' })}
                                                        className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full backdrop-blur-md hover:bg-black transition-all"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                            <div className="grid gap-3">
                                                <label className="cursor-pointer">
                                                    <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 p-8 rounded-2xl hover:border-black hover:bg-gray-50 transition-all group">
                                                        <div className="p-4 bg-gray-100 rounded-2xl group-hover:bg-black group-hover:text-white transition-all">
                                                            <Upload className="w-6 h-6" />
                                                        </div>
                                                        <span className="text-[11px] font-black uppercase tracking-widest text-gray-500">Upload Image</span>
                                                    </div>
                                                    <input 
                                                        type="file" 
                                                        className="hidden" 
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const url = URL.createObjectURL(file);
                                                                setEditingProduct({ ...editingProduct, image: url });
                                                            }
                                                        }}
                                                    />
                                                </label>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-bold uppercase text-gray-400">Media URL Fallback</label>
                                                    <input 
                                                        placeholder="Or paste image URL..."
                                                        value={editingProduct.image.startsWith('blob:') || editingProduct.image.startsWith('data:') ? '' : editingProduct.image} 
                                                        onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })}
                                                        className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-black text-[11px] font-medium" 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-[#8B5E3C] border-b border-gray-50 pb-4">Organization</h4>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">Category</label>
                                            <select 
                                                value={editingProduct.category} 
                                                onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                                                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-black font-bold bg-[#FDFBF7]"
                                            >
                                                <option value="Beauty">Beauty</option>
                                                <option value="Wellness">Health & Wellness</option>
                                                <option value="Sexual Wellness">Sexual Wellness</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-2">URL Slug</label>
                                            <input 
                                                value={editingProduct.slug} 
                                                onChange={e => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                                                className="w-full border border-gray-200 p-4 rounded-xl outline-none focus:border-black font-mono text-xs text-gray-400" 
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <button className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-2xl active:scale-[0.98] transition-all hover:bg-[#8B5E3C]">
                                            Save All Changes
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setEditingProduct(null)}
                                            className="w-full bg-white text-gray-400 py-6 rounded-2xl font-bold uppercase tracking-[0.15em] text-xs border border-gray-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                                        >
                                            Discard & Exit
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
