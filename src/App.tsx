/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Menu, 
  X,
  Send, 
  ChevronRight, 
  Activity, 
  Lock, 
  Database, 
  Zap,
  Globe,
  Settings,
  User
} from "lucide-react";
import { useState, FormEvent } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isShortcutAdded, setIsShortcutAdded] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    coordinates: "",
    message: ""
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Transmission Initiated:", formData);
    // Add success feedback or reset
    alert("TRANSMISSION_INITIATED: Data packet sent to Stark Industries cloud.");
    setFormData({ identifier: "", coordinates: "", message: "" });
  };

  const handleGetApp = () => {
    setShowDownloadModal(true);
    setIsMenuOpen(false);
  };

  const startDownload = () => {
    setIsDownloading(true);
    setShowDownloadModal(false);
    alert("VANGUARD_INITIATED: Synchronizing with satellite server... OS installer packet is being prepared.");
    
    // Simulate a download delay
    setTimeout(() => {
      setIsDownloading(false);
      setIsShortcutAdded(true);
      alert("DOWNLOAD_COMPLETE: Vanguard OS has been added to your system homescreen. You can now access the tactical shortcut.");
    }, 4000);
  };

  const handleViewBlueprints = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
    alert("ACCESSING_FILES: Loading technical schematics for System Architecture...");
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-tertiary/20 selection:text-tertiary selection:backdrop-blur-sm">
      {/* HUD Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 hud-scanline opacity-10" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 glass-panel border-b border-white/10 px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center group overflow-visible">
            {/* Generative Arc Reactor Effect */}
            <div className="absolute inset-0 bg-tertiary/20 rounded-full blur-xl group-hover:bg-primary/20 transition-colors duration-500" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-tertiary/30 rounded-full"
            />
            <div className="relative w-8 h-8 md:w-10 md:h-10 glass-panel rounded-full flex items-center justify-center border-2 border-tertiary shadow-[0_0_20px_rgba(71,214,255,0.4)] group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(255,180,172,0.4)] transition-all duration-300">
              <Zap className="w-5 h-5 text-tertiary fill-tertiary group-hover:text-primary group-hover:fill-primary transition-all transition-colors" />
            </div>
            
            {/* Visual HUD Metadata */}
            <div className="absolute -right-16 hidden lg:flex flex-col text-[7px] font-mono text-tertiary/50 uppercase leading-none gap-1 pointer-events-none">
              <span>Core_Sync: Stable</span>
              <span>Power_Flow: Optimized</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-headline text-sm tracking-widest uppercase">
          <a href="#home" className="text-tertiary font-bold border-b-2 border-tertiary pb-1">Home</a>
          <a href="#about" className="text-on-surface-variant hover:text-primary transition-colors">About</a>
          <button 
            onClick={handleGetApp}
            disabled={isDownloading}
            className={`${isDownloading ? 'bg-tertiary/50 animate-pulse cursor-wait' : 'bg-primary-container hover:bg-primary-container/80 shadow-primary-container/20'} text-on-primary-container px-6 py-2 rounded-sm font-bold active:scale-95 transition-all shadow-lg overflow-hidden relative`}
          >
            <span className="relative z-10">{isDownloading ? 'DOWNLOADING...' : 'GET APP'}</span>
            {isDownloading && <motion.div className="absolute inset-0 bg-white/10" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ repeat: Infinity, duration: 1 }} />}
          </button>
        </div>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-on-surface p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-30 md:hidden glass-panel pt-24 px-6"
          >
            <div className="flex flex-col gap-8 items-center">
              <a 
                href="#home" 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-headline font-bold text-tertiary tracking-widest uppercase"
              >
                Home
              </a>
              <a 
                href="#about" 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-headline font-bold text-on-surface-variant hover:text-primary transition-colors tracking-widest uppercase"
              >
                About
              </a>
              <button 
                onClick={handleGetApp}
                disabled={isDownloading}
                className={`w-full ${isDownloading ? 'bg-tertiary/50 animate-pulse' : 'bg-primary-container shadow-primary-container/20'} py-4 rounded-sm font-bold active:scale-95 transition-all shadow-lg uppercase tracking-widest`}
              >
                {isDownloading ? 'Downloading...' : 'Get App'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simulated Homescreen Shortcut */}
      <AnimatePresence>
        {isShortcutAdded && (
          <motion.button 
            initial={{ opacity: 0, scale: 0, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => alert("VANGUARD_LAUNCH: Initializing primary OS modules...")}
            className="fixed bottom-24 right-8 z-50 flex flex-col items-center gap-2 group"
          >
            <div className="relative w-16 h-16 glass-panel rounded-xl flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(255,180,172,0.2)] group-hover:shadow-[0_0_30px_rgba(255,180,172,0.4)] transition-all">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md" />
                <Zap className="w-8 h-8 text-primary fill-primary relative z-10" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-tertiary rounded-full animate-ping" />
            </div>
            <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-on-surface bg-surface/80 px-2 py-0.5 rounded border border-white/5 uppercase">Vanguard_OS</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Download Modal */}
      <AnimatePresence>
        {showDownloadModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDownloadModal(false)}
              className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass-panel p-8 rounded-xl technical-bracket border border-primary/20"
            >
              <div className="absolute top-4 right-4">
                <button onClick={() => setShowDownloadModal(false)} className="text-slate-500 hover:text-primary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="p-4 bg-primary-container/20 rounded-full border border-primary/30 shadow-[0_0_20px_rgba(255,180,172,0.1)]">
                  <Zap className="w-10 h-10 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-bold uppercase tracking-tight text-on-surface">Vanguard OS v8.4</h3>
                  <p className="text-sm font-mono text-tertiary uppercase tracking-widest">Advanced System Deployment</p>
                </div>

                <div className="w-full space-y-4 py-4 border-y border-white/5">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                    <span>File_Type</span>
                    <span className="text-on-surface">Secure_Installer (.msi)</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                    <span>Packet_Size</span>
                    <span className="text-on-surface">2.4 GB</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase">
                    <span>Encryption</span>
                    <span className="text-on-surface">AES_256_RSA</span>
                  </div>
                </div>

                <div className="w-full space-y-4 pt-2">
                  <button 
                    onClick={startDownload}
                    className="w-full py-4 metal-gradient text-on-primary font-headline font-black uppercase tracking-[0.2em] rounded-md shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                  >
                    <Activity className="w-4 h-4" />
                    Begin_Download
                  </button>
                  <button 
                    onClick={() => setShowDownloadModal(false)}
                    className="w-full py-3 border border-outline-variant hover:bg-white/5 text-slate-500 hover:text-on-surface transition-all font-mono text-[10px] uppercase tracking-widest rounded-md"
                  >
                    Abort_Process
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[8px] font-mono text-slate-600 uppercase tracking-widest">
                <Shield className="w-3 h-3" />
                Protected by Stark Security Protocols
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section 
          id="home"
          className="relative min-h-screen flex items-center pt-24 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(16, 20, 26, 0.85), rgba(16, 20, 26, 0.95)), url('https://lh3.googleusercontent.com/aida/ADBb0ugQ1IBEOb8ZrHj8Bo5fEmM7Jcd04umK53w0aDM7rHxneVnFjIL1dl1fgRfIf56oa6umoj5FffJa1qi2muEpEax8d5_KHCFROaEo-zGoq1MMNXheUXhB2iuMnxR1LQ7ExbDTVzL8JvCRuibyl1wA-QSzaT7XKHMgzp-clGmuPnsjO8G1eWY7RWkWK_LO9-awVFJybB6q3wMNeYquUpiTCG548YPB3Qdf80ReYBV7Q7rTFZSyFpQD2JPdhlPKJtRNUuOCX6gEFiXM')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="initial"
              whileInView="animate"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary-container/30 border border-tertiary/20 rounded-full">
                <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-tertiary uppercase">SYSTEM_INITIALIZED_V8.4</span>
              </motion.div>

              <motion.h1 
                variants={fadeIn}
                className="text-5xl md:text-8xl font-headline font-extrabold tracking-tighter leading-tight text-on-surface"
              >
                <span className="text-secondary">Great</span> <span className="text-primary">design.</span>
              </motion.h1>

              <motion.div variants={fadeIn} className="max-w-xl space-y-6">
                <p className="text-lg text-on-surface-variant font-light leading-relaxed">
                  The legacy of the <span className="text-secondary font-bold">Great Engineer</span> isn't just in the steel—it's in the synthesis of human intent and autonomous precision. Stark industries redefined the horizon of what is possible.
                </p>
                
                <div className="flex items-center gap-3 text-xs font-mono text-tertiary/80 uppercase tracking-widest">
                  <Activity className="w-4 h-4" />
                  <span>Data Stream: Cultural_Impact_Analysis // Stark_Industries</span>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
                <button 
                  onClick={handleViewBlueprints}
                  className="px-10 py-4 border border-outline-variant hover:bg-white/5 transition-all font-headline font-bold rounded-md uppercase tracking-wider text-sm"
                >
                  View Blueprints
                </button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="hidden md:block"
            >
              <div className="relative glass-panel p-8 rounded-xl technical-bracket overflow-hidden group">
                <div className="absolute inset-0 bg-tertiary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="grid grid-cols-2 gap-6 relative z-10">
                  <div className="p-5 bg-surface-container-highest/20 rounded-lg space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                      <span className="text-tertiary">Armor_Integrity</span>
                      <span>94%</span>
                    </div>
                    <div className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "94%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-tertiary shadow-[0_0_8px_#47d6ff]" 
                      />
                    </div>
                  </div>
                  
                  <div className="p-5 bg-surface-container-highest/20 rounded-lg space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                      <span className="text-secondary">Power_Reserve</span>
                      <span>82%</span>
                    </div>
                    <div className="h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "82%" }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="h-full bg-secondary shadow-[0_0_8px_#e9c349]" 
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-2 font-mono text-[10px] text-tertiary/60 leading-tight">
                  <div className="flex gap-2">
                    <span className="text-secondary opacity-50">&gt;</span>
                    <span>BOOTING STARK_INTERFACE...</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-secondary opacity-50">&gt;</span>
                    <span>CALIBRATING OPTICAL SENSORS...</span>
                  </div>
                  <div className="flex gap-2 animate-pulse">
                    <span className="text-secondary opacity-50">&gt;</span>
                    <span className="text-tertiary">NEURAL LINK ESTABLISHED.</span>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <span className="text-secondary opacity-50 font-bold">&gt;</span>
                    <span className="text-on-surface font-bold">WELCOME BACK, SIR.</span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 opacity-10">
                  <Shield className="w-24 h-24" />
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-tertiary/10 blur-[120px] rounded-full pointer-events-none" />
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-surface-container-lowest relative">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-5 gap-16 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="md:col-span-2 space-y-10"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-tertiary rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative rounded-lg overflow-hidden border border-white/10 aspect-square">
                    <img 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                      referrerPolicy="no-referrer"
                      alt="System Architect" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ49RX0STcwU8t8TqHf3SkIIYprTYV1uV9lSwKL7nVoW456eoVKFGP6jTQo4sLOHF-cky1xVcXidNwlogXSOeN-gz842QBiyzl9ab1vArOO9vI7WqA0t_RilYIWrGI_8MCnVudObmeEONcfC28rEMCIQaQ74bU6IIASBI2PlwfiFtt1YLVBECSGv412rM_u3dLPrh08unZgokX9o1J-Ndvty-KeUvUvNMye5UJ892wwSQq0e85ScYdTy7lid890I3h7Tlbx2QyCg"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-[2px] bg-primary" />
                    <h3 className="text-2xl font-headline font-bold uppercase tracking-tight">System Architect</h3>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed font-light text-lg">
                    Born from a deep fascination with the intersection of industrial hardware and ethereal software, I specialize in crafting digital interfaces that feel as solid and responsive as a Mark XLII suit. My passion for the Iron Man aesthetic drives every pixel—balancing raw power with refined elegance.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                      { icon: Activity, label: "Core Performance" },
                      { icon: Lock, label: "Encrypted Design" },
                      { icon: Database, label: "Data Integrity" },
                      { icon: Zap, label: "Autonomous UI" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-surface-container rounded-lg border border-white/5">
                        <item.icon className="w-4 h-4 text-tertiary" />
                        <span className="text-[10px] font-mono tracking-widest uppercase">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="md:col-span-3 h-full"
              >
                <div className="bg-surface-container-high/40 p-10 rounded-2xl border border-white/5 relative h-full glass-panel">
                  <div className="absolute top-6 right-8 opacity-20">
                    <Shield className="w-16 h-16 text-tertiary" />
                  </div>
                  
                  <h3 className="text-3xl font-headline font-bold uppercase tracking-tighter mb-10 flex items-center gap-4">
                    <span className="w-2 h-12 bg-primary metal-gradient" />
                    Secure Transmission
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-mono tracking-widest text-slate-500 uppercase flex items-center gap-2">
                          <User className="w-3 h-3" />
                          Identifier
                        </label>
                        <input 
                          required
                          value={formData.identifier}
                          onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                          className="w-full bg-surface-container-lowest border border-white/5 rounded-md px-5 py-4 focus:ring-1 focus:ring-tertiary/50 outline-none text-on-surface placeholder:text-slate-700 transition-all" 
                          placeholder="Your Name" 
                          type="text"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-mono tracking-widest text-slate-500 uppercase flex items-center gap-2">
                          <Globe className="w-3 h-3" />
                          Coordinates
                        </label>
                        <input 
                          required
                          value={formData.coordinates}
                          onChange={(e) => setFormData({...formData, coordinates: e.target.value})}
                          className="w-full bg-surface-container-lowest border border-white/5 rounded-md px-5 py-4 focus:ring-1 focus:ring-tertiary/50 outline-none text-on-surface placeholder:text-slate-700 transition-all" 
                          placeholder="Email Address" 
                          type="email"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-mono tracking-widest text-slate-500 uppercase flex items-center gap-2">
                        <Lock className="w-3 h-3" />
                        Encrypted_Message
                      </label>
                      <textarea 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-surface-container-lowest border border-white/5 rounded-md px-5 py-4 focus:ring-1 focus:ring-tertiary/50 outline-none text-on-surface placeholder:text-slate-700 transition-all resize-none min-h-[160px]" 
                        placeholder="Input payload data..." 
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-5 metal-gradient text-on-primary font-headline font-black uppercase tracking-[0.2em] rounded-md shadow-[0_0_20px_rgba(255,180,172,0.15)] hover:shadow-[0_0_30px_rgba(255,180,172,0.3)] hover:scale-[1.01] transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                    >
                      <motion.div 
                        initial={false}
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-3"
                      >
                        <Send className="w-5 h-5" />
                        Initiate_Send
                      </motion.div>
                    </button>
                    
                    <div className="pt-4 flex justify-between items-center text-[8px] font-mono text-slate-600 uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Encryption: AES_256_GCM
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings className="w-2 h-2" />
                        Node_Status: Online
                      </div>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 border-t border-primary-container/20 bg-surface-container-lowest flex flex-col items-center gap-10 px-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-container/50 to-transparent" />
        
        <div className="flex flex-wrap justify-center items-center gap-10">
          {["Privacy_Policy", "System_Status", "Support"].map((link) => (
            <button 
              key={link}
              onClick={() => alert(`SYSTEM_NOTICE: Accessing ${link.replace('_', ' ')} terminal...`)}
              className="text-slate-500 hover:text-tertiary transition-colors font-mono text-[10px] uppercase tracking-[0.2em]" 
            >
              {link}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 relative">
          <div className="text-2xl font-black text-on-surface/40 font-headline tracking-widest uppercase">
            Stark<span className="text-secondary opacity-50">_Industries</span>
          </div>
          <div className="text-primary-container font-mono text-[9px] uppercase tracking-[0.3em] font-medium">
            © 2026 Stark Industries. All Rights Reserved.
          </div>
        </div>

        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/5 blur-3xl rounded-full" />
      </footer>
    </div>
  );
}
