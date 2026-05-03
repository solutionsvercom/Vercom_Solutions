import { motion, useMotionValue, useTransform } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const floatingElements = [
    { id: 1, delay: 0, duration: 3, left: 10, top: 15, type: 'graph' },
    { id: 2, delay: 0.5, duration: 4, left: 85, top: 20, type: 'chart' },
    { id: 3, delay: 1, duration: 3.5, left: 88, top: 75, type: 'dashboard' },
  ];

  // Network node configuration for rotating spokes
  const networkNodes = [
    { label: 'AI', angle: 0 },
    { label: 'DATA', angle: 72 },
    { label: 'ANALYTICS', angle: 144 },
    { label: 'GROWTH', angle: 216 },
    { label: 'CLOUD', angle: 288 },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f] pt-20 px-4 sm:px-0">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Particle Effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-cyan-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-violet-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-600/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Floating Elements - Meaningful Visuals - Hidden on small mobile */}
        {floatingElements.map((elem) => (
          <motion.div
            key={elem.id}
            className="hidden lg:block absolute w-24 h-24 border border-cyan-500/15 rounded-xl backdrop-blur-lg bg-gradient-to-br from-white/[0.03] to-white/[0.08]"
            style={{
              left: `${elem.left}%`,
              top: `${elem.top}%`,
              boxShadow: '0 0 25px rgba(0,255,255,0.08), inset 0 0 20px rgba(255,255,255,0.03)',
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 3, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: elem.duration,
              repeat: Infinity,
              delay: elem.delay,
            }}
          >
            <div className="w-full h-full p-3 flex items-center justify-center">
              {elem.type === 'graph' && (
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                  <motion.path
                    d="M 10 80 L 25 65 L 40 55 L 55 40 L 70 30 L 85 15"
                    stroke="url(#gradient1)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00ffff" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#8a2be2" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
              {elem.type === 'chart' && (
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                  {[20, 35, 55, 70, 85].map((x, i) => (
                    <motion.rect
                      key={i}
                      x={x - 4}
                      width="8"
                      height={30 + i * 10}
                      y={70 - (30 + i * 10)}
                      fill="url(#gradient2)"
                      initial={{ height: 0, y: 70 }}
                      animate={{ height: 30 + i * 10, y: 70 - (30 + i * 10) }}
                      transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatDelay: 2 }}
                    />
                  ))}
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8a2be2" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
              {elem.type === 'dashboard' && (
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                  <rect x="10" y="10" width="35" height="25" rx="3" stroke="#00ffff" strokeWidth="2" opacity="0.5" />
                  <rect x="55" y="10" width="35" height="25" rx="3" stroke="#8a2be2" strokeWidth="2" opacity="0.5" />
                  <rect x="10" y="45" width="80" height="15" rx="3" stroke="#00ffff" strokeWidth="2" opacity="0.3" />
                  <rect x="10" y="70" width="80" height="15" rx="3" stroke="#8a2be2" strokeWidth="2" opacity="0.3" />
                  <motion.circle
                    cx="25"
                    cy="22"
                    r="3"
                    fill="#00ffff"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </svg>
              )}
            </div>
          </motion.div>
        ))}

        {/* Central 3D Object - Enhanced Tech Sphere */}
        <motion.div
          className="relative mx-auto mb-12 w-64 h-64 sm:w-80 sm:h-80"
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/25 shadow-[0_0_40px_rgba(0,255,255,0.2)]" />

          {/* Middle Ring */}
          <motion.div
            className="absolute inset-8 rounded-full border border-violet-500/35 shadow-[0_0_30px_rgba(138,43,226,0.25)]"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />

          {/* Central 3D Tech Object - Enhanced AI Core */}
          <motion.div
            className="absolute inset-14 rounded-full bg-gradient-to-br from-cyan-500/30 via-violet-600/30 to-blue-500/30 backdrop-blur-md"
            style={{
              boxShadow: '0 0 50px rgba(0,255,255,0.5), inset 0 0 30px rgba(0,255,255,0.3)',
            }}
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                '0 0 50px rgba(0,255,255,0.5), inset 0 0 30px rgba(0,255,255,0.3)',
                '0 0 70px rgba(138,43,226,0.6), inset 0 0 45px rgba(138,43,226,0.4)',
                '0 0 50px rgba(0,255,255,0.5), inset 0 0 30px rgba(0,255,255,0.3)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            {/* Minimal AI Core Pattern */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
              <defs>
                <radialGradient id="coreGrad">
                  <stop offset="0%" stopColor="#00ffff" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#8a2be2" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0000ff" stopOpacity="0.2" />
                </radialGradient>
              </defs>

              {/* Pulsing Center Core */}
              <motion.circle
                cx="100"
                cy="100"
                r="15"
                fill="url(#coreGrad)"
                animate={{
                  r: [15, 22, 15],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />

              {/* Subtle Inner Ring */}
              <motion.circle
                cx="100"
                cy="100"
                r="25"
                fill="none"
                stroke="#00ffff"
                strokeWidth="0.5"
                opacity="0.3"
                animate={{
                  r: [25, 30, 25],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </svg>

            {/* Enhanced Particle Effect Around Core */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: '-2px',
                  marginTop: '-2px',
                  background: 'radial-gradient(circle, rgba(0,255,255,1) 0%, rgba(0,255,255,0) 70%)',
                  boxShadow: '0 0 6px rgba(0,255,255,0.8)',
                }}
                animate={{
                  x: [0, 35 * Math.cos((i * 30 * Math.PI) / 180)],
                  y: [0, 35 * Math.sin((i * 30 * Math.PI) / 180)],
                  opacity: [0.8, 0],
                  scale: [0.8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeOut',
                }}
              />
            ))}
          </motion.div>

          {/* Rotating Network Structure with Spokes */}
          {networkNodes.map((node, i) => {
            const spokeLength = 180; // Extended length
            const dotRadius = 8;
            const textOffset = 12;

            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: 0,
                  height: 0,
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {/* Radial Spoke Line */}
                <div
                  style={{
                    position: 'absolute',
                    width: `${spokeLength}px`,
                    height: '2px',
                    left: '0px',
                    top: '-1px',
                    transformOrigin: '0 50%',
                    transform: `rotate(${node.angle}deg)`,
                    background: 'linear-gradient(90deg, rgba(0,255,255,0.6) 0%, rgba(0,255,255,0.3) 50%, rgba(0,255,255,0.1) 100%)',
                  }}
                />

                {/* Glowing Dot at End of Spoke */}
                <motion.div
                  style={{
                    position: 'absolute',
                    width: `${dotRadius}px`,
                    height: `${dotRadius}px`,
                    left: `${spokeLength * Math.cos((node.angle * Math.PI) / 180) - dotRadius / 2}px`,
                    top: `${spokeLength * Math.sin((node.angle * Math.PI) / 180) - dotRadius / 2}px`,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,255,255,1) 0%, rgba(0,255,255,0.6) 50%, rgba(0,255,255,0) 100%)',
                    boxShadow: '0 0 15px rgba(0,255,255,0.8), 0 0 30px rgba(0,255,255,0.4)',
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />

                {/* Text Label - Always Horizontal */}
                <motion.div
                  style={{
                    position: 'absolute',
                    left: `${(spokeLength + dotRadius + textOffset) * Math.cos((node.angle * Math.PI) / 180)}px`,
                    top: `${(spokeLength + dotRadius + textOffset) * Math.sin((node.angle * Math.PI) / 180)}px`,
                    transformOrigin: 'center',
                  }}
                  animate={{
                    rotate: [0, -360], // Counter-rotate to keep text horizontal
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div
                    className="text-[11px] font-bold text-cyan-300 tracking-widest whitespace-nowrap px-2 py-1"
                    style={{
                      fontFamily: '"Orbitron", "Rajdhani", sans-serif',
                      textShadow: '0 0 8px rgba(0, 255, 255, 0.4)',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {node.label}
                  </div>
                </motion.div>

                {/* Depth Effect - Front/Back Overlay */}
                <motion.div
                  style={{
                    position: 'absolute',
                    width: `${spokeLength}px`,
                    height: '2px',
                    left: '0px',
                    top: '-1px',
                    transformOrigin: '0 50%',
                    transform: `rotate(${node.angle}deg)`,
                    pointerEvents: 'none',
                  }}
                  animate={{
                    opacity: [
                      Math.abs(Math.cos(((node.angle + 180) * Math.PI) / 180)) * 0.4 + 0.6,
                      Math.abs(Math.cos(((node.angle + 540) * Math.PI) / 180)) * 0.4 + 0.6,
                    ],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent leading-tight tracking-tight"
          style={{
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Transforming Businesses Through
        </motion.h1>

        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent tracking-tight"
          style={{
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Innovative Digital Solutions
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-cyan-100/75 mb-12 max-w-3xl mx-auto leading-relaxed"
          style={{
            fontFamily: '"Inter", sans-serif',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Empowering businesses with cutting-edge technology, scalable solutions, and digital expertise for measurable growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-full font-semibold text-white text-lg overflow-hidden tracking-wide"
            style={{
              boxShadow: '0 0 30px rgba(0,255,255,0.4), 0 0 60px rgba(138,43,226,0.2)',
              fontFamily: '"Inter", sans-serif',
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 40px rgba(0,255,255,0.6), 0 0 80px rgba(138,43,226,0.3)',
              brightness: 1.1,
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/get-started')}
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            className="group px-10 py-5 border-2 border-cyan-500/50 rounded-full font-semibold text-cyan-300 text-lg backdrop-blur-sm transition-all tracking-wide"
            style={{
              boxShadow: '0 0 20px rgba(0,255,255,0.1)',
              fontFamily: '"Inter", sans-serif',
            }}
            whileHover={{
              scale: 1.08,
              borderColor: 'rgba(0,255,255,0.8)',
              backgroundColor: 'rgba(0,255,255,0.1)',
              boxShadow: '0 0 30px rgba(0,255,255,0.2)',
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/services')}
          >
            Explore Services
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-cyan-300/60 text-sm tracking-wide" style={{ fontFamily: '"Inter", sans-serif' }}>
              Think Forward Think Vercom
            </span>
            <ChevronDown className="w-6 h-6 text-cyan-300/80" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}