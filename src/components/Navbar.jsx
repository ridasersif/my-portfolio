import { useEffect, useState, useRef } from "react";
import {
  Home,
  User,
  Code,
  Briefcase,
  MessageSquare,
  Mail,
  BookOpen,
  Sun,
  Moon,
  Youtube,
  Volume2,
  VolumeX,
  Github,
  Linkedin,
} from "lucide-react";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Testimonials", href: "#testimonials", icon: MessageSquare },
  { name: "Contact", href: "#contact", icon: Mail },
 
];

const ThemeToggle = ({ className = "" }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${className}`}
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("#hero");
  const [showNavbar, setShowNavbar] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const lastScrollYRef = useRef(0);
  const audioRef = useRef(null);

  const musicUrl = "/music.mp3";

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.preload = "auto";

      const handleCanPlay = () => setIsAudioReady(true);

      audioRef.current.addEventListener("canplaythrough", handleCanPlay);

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener("canplaythrough", handleCanPlay);
          audioRef.current = null;
        }
      };
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current || !isAudioReady) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }

    setIsMusicPlaying(!isMusicPlaying);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar on scroll down for mobile only
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
      }

      lastScrollYRef.current = currentScrollY;

      const sections = navItems.map((item) => item.href);
      const scrollPosition = currentScrollY + 100;

      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/20 dark:border-slate-700/20 transition-all duration-300">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
                Rida Sersif
              </div>

              {/* Navigation Links - Center */}
              <div className="flex items-center space-x-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 ${
                      activeSection === item.href
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                        : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`}
                    aria-label={item.name}
                    target={item.href.startsWith('http') ? '_blank' : '_self'}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </a>
                ))}
              </div>

              {/* Right Side Controls */}
              <div className="flex items-center space-x-2">
                {/* Social Links */}
                <a
                  href="https://github.com/ridasersif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/rida-sersif-721497330/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-all duration-300 hover:scale-110 text-blue-600 dark:text-blue-400"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href="https://youtube.com/@ridasersif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-red-100 dark:bg-red-900/50 hover:bg-red-200 dark:hover:bg-red-800/50 transition-all duration-300 hover:scale-110 text-red-600 dark:text-red-400"
                  title="YouTube Channel"
                >
                  <Youtube className="w-5 h-5" />
                </a>

                {/* Music Button */}
                <button
                  onClick={toggleMusic}
                  disabled={!isAudioReady}
                  className={`p-2 rounded-full transition-all duration-300 hover:scale-110 bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-200 dark:hover:bg-purple-800/50 text-purple-600 dark:text-purple-400 ${
                    !isAudioReady ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  title={isAudioReady ? (isMusicPlaying ? "Pause music" : "Play music") : "Loading music..."}
                >
                  {isMusicPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>

                {/* Theme Toggle */}
                <ThemeToggle className="bg-slate-100 dark:bg-slate-800 hover:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile - Keep Original Code (Bottom Navbar Only) */}
      <div className="md:hidden">
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 ease-in-out ${
            showNavbar ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full shadow-lg p-2 border border-gray-200 dark:border-gray-700">
            <div className="flex space-x-1 items-center">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`p-2 rounded-full transition-colors flex flex-col items-center ${
                    activeSection === item.href
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                  }`}
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs mt-1 hidden sm:block">{item.name}</span>
                </a>
              ))}
              <div className="flex items-center px-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Smooth scrolling for anchor links */
        html {
          scroll-behavior: smooth;
        }

        /* Custom backdrop blur for better browser support */
        .backdrop-blur-xl {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        /* Gradient background animation */
        .bg-gradient-to-r {
          background-size: 200% 200%;
          animation: gradientShift 3s ease-in-out infinite alternate;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        /* Enhanced hover effects */
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }

        .hover\:scale-110:hover {
          transform: scale(1.1);
        }

        /* Custom shadow effects */
        .shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Mobile menu animation */
        .mobile-menu-enter {
          animation: slideInFromTop 0.3s ease-out;
        }
      `}</style>
    </>
  );
};