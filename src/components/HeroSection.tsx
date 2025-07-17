import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Environment } from '@react-three/drei';
import { Mesh } from 'three';
import { ArrowDown, Zap, Code, Rocket } from 'lucide-react';
import SpeedLinesEffect from './SpeedLinesEffect';
import RoadDustParticlesEffect from './RoadDustParticlesEffect';

// 3D Speed Lines Effect
function SpeedLines() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });

  const lines = Array.from({ length: 30 }, (_, i) => (
    <mesh key={i} ref={meshRef} position={[Math.sin(i) * 15, Math.cos(i) * 15, -8]}>
      <cylinderGeometry args={[0.02, 0.02, 8]} />
      <meshStandardMaterial 
        color="#DC143C" 
        emissive="#DC143C"
        emissiveIntensity={0.6}
      />
    </mesh>
  ));

  return <>{lines}</>;
}

// Enhanced Engine Sound Visualizer
function EngineVisualizer() {
  const [intensity, setIntensity] = useState(0.5);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIntensity(0.3 + Math.random() * 0.7);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <Float speed={3} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh>
        <sphereGeometry args={[0.4, 20, 20]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700"
          emissiveIntensity={intensity}
        />
      </mesh>
    </Float>
  );
}

// 3D Particle System for Dust/Smoke Effect
function ParticleSystem() {
  const particlesRef = useRef<Mesh[]>([]);
  
  useFrame((state) => {
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        particle.position.x -= 0.1;
        particle.position.y += Math.sin(state.clock.elapsedTime + i) * 0.01;
        particle.rotation.z += 0.02;
        
        if (particle.position.x < -20) {
          particle.position.x = 20;
        }
      }
    });
  });

  const particles = Array.from({ length: 15 }, (_, i) => (
    <mesh 
      key={i} 
      ref={(el) => { if (el) particlesRef.current[i] = el; }}
      position={[Math.random() * 40 - 20, Math.random() * 10 - 5, Math.random() * 5 - 10]}
    >
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial 
        color="#666666" 
        transparent 
        opacity={0.3}
      />
    </mesh>
  ));

  return <>{particles}</>;
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Car physics values
  const carPosition = useMotionValue(0);
  const carVelocity = useMotionValue(0);
  const wheelRotation = useMotionValue(0);
  const engineIntensity = useMotionValue(0);
  
  // Wheel physics constants
  const WHEEL_RADIUS = 24; // pixels
  const WHEEL_CIRCUMFERENCE = 2 * Math.PI * WHEEL_RADIUS;
  
  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  // Text animations
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-50%']);

  // Realistic car rolling physics
  const startRolling = () => {
    setIsRolling(true);
    setShowStartButton(false);
    
    const startTime = Date.now();
    const ACCELERATION = 0.0008; // pixels per ms²
    const MAX_SPEED = 0.8; // pixels per ms
    const ROLL_DURATION = 5000; // 5 seconds
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / ROLL_DURATION, 1);
      
      if (progress < 1) {
        // Realistic acceleration curve
        let currentVelocity = Math.min(ACCELERATION * elapsed, MAX_SPEED);
        
        // Apply some deceleration near the end for realism
        if (progress > 0.8) {
          const decelerationFactor = 1 - ((progress - 0.8) / 0.2) * 0.3;
          currentVelocity *= decelerationFactor;
        }
        
        carVelocity.set(currentVelocity);
        
        // Update position based on velocity
        const currentPosition = carPosition.get();
        const newPosition = currentPosition + currentVelocity;
        carPosition.set(newPosition);
        
        // Calculate wheel rotation based on distance traveled
        // Each pixel moved = rotation in degrees
        const rotationIncrement = (currentVelocity / WHEEL_CIRCUMFERENCE) * 360;
        wheelRotation.set(wheelRotation.get() + rotationIncrement);
        
        // Engine intensity based on velocity
        engineIntensity.set(Math.min(currentVelocity / MAX_SPEED, 1));
        
        requestAnimationFrame(animate);
      } else {
        // Car has finished rolling
        setTimeout(() => {
          // Reset for next animation
          setShowStartButton(true);
          setIsRolling(false);
          carPosition.set(0);
          carVelocity.set(0);
          wheelRotation.set(0);
          engineIntensity.set(0);
        }, 2000);
      }
    };
    
    requestAnimationFrame(animate);
  };

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Enhanced Dynamic City Background */}
      <motion.div 
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/src/assets/city-background.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-background/90" />
        
        {/* Moving city lights effect */}
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 0%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(220, 20, 60, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)',
            backgroundSize: '200% 100%'
          }}
        />
      </motion.div>

      {/* Enhanced 3D Speed Lines and Effects */}
      <div className="absolute inset-0 z-5">
        <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
          <Environment preset="night" />
          <ambientLight intensity={0.4} />
          <directionalLight position={[15, 15, 8]} intensity={0.8} />
          <pointLight position={[0, 0, 15]} color="#DC143C" intensity={4} />
          <pointLight position={[-10, 5, 10]} color="#FFD700" intensity={2} />
          
          <SpeedLines />
          <EngineVisualizer />
          <ParticleSystem />
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      {/* Ferrari Car with Realistic Rolling Physics */}
      <motion.div
        style={{ 
          x: useTransform(carPosition, (value) => `${value}px`),
        }}
        className="absolute bottom-0 left-0 z-10 w-auto h-full pointer-events-none"
      >
        <div className="relative w-auto h-full">
          {/* Main car body with realistic engine vibration */}
          <motion.div
            className="absolute bottom-0 left-0 w-auto h-1/2"
            animate={isRolling ? {
              y: [0, -1, 0, -0.5, 0],
              x: [0, 0.5, -0.5, 0]
            } : {
              y: [0, -2, 0],
            }}
            transition={isRolling ? { 
              duration: 0.08, 
              repeat: Infinity,
              ease: "easeInOut"
            } : { 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <motion.img
              src="/src/assets/ferrari-car.png"
              alt="Ferrari"
              className="w-auto h-full object-contain"
              style={{ 
                filter: useTransform(engineIntensity, (value) => 
                  `drop-shadow(0 0 ${25 + value * 20}px rgba(220, 20, 60, ${0.6 + value * 0.4})) brightness(${1 + value * 0.2})`
                ),
              }}
            />
          </motion.div>
          
          {/* Front Wheel with Physics-Based Rotation */}
          <motion.div
            className="absolute bottom-8 left-16 w-12 h-12 rounded-full border-4 border-gray-400 bg-gray-800 overflow-hidden"
            style={{ 
              rotate: useTransform(wheelRotation, (value) => `${value}deg`),
              boxShadow: useTransform(engineIntensity, (value) => 
                `0 0 ${10 + value * 20}px rgba(150, 150, 150, ${0.5 + value * 0.5})`
              )
            }}
          >
            {/* Realistic tire tread pattern */}
            <div className="absolute inset-1 rounded-full border-2 border-gray-500 bg-gray-700">
              {/* Tire spokes */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-0.5" />
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-0.5" />
              <div className="absolute top-1/2 left-1/2 w-3 h-0.5 bg-gray-300 transform -translate-x-1/2 -translate-y-0.5 rotate-45" />
              <div className="absolute top-1/2 left-1/2 w-3 h-0.5 bg-gray-300 transform -translate-x-1/2 -translate-y-0.5 -rotate-45" />
              
              {/* Center hub */}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            {/* Tire tread marks */}
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-1 bg-gray-600"
                style={{
                  top: '10%',
                  left: '50%',
                  transformOrigin: '50% 400%',
                  transform: `translateX(-50%) rotate(${i * 45}deg)`
                }}
              />
            ))}
          </motion.div>
          
          {/* Rear Wheel with Physics-Based Rotation */}
          <motion.div
            className="absolute bottom-8 left-4 w-12 h-12 rounded-full border-4 border-gray-400 bg-gray-800 overflow-hidden"
            style={{ 
              rotate: useTransform(wheelRotation, (value) => `${value}deg`),
              boxShadow: useTransform(engineIntensity, (value) => 
                `0 0 ${10 + value * 20}px rgba(150, 150, 150, ${0.5 + value * 0.5})`
              )
            }}
          >
            {/* Realistic tire tread pattern */}
            <div className="absolute inset-1 rounded-full border-2 border-gray-500 bg-gray-700">
              {/* Tire spokes */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-0.5" />
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform -translate-x-0.5" />
              <div className="absolute top-1/2 left-1/2 w-3 h-0.5 bg-gray-300 transform -translate-x-1/2 -translate-y-0.5 rotate-45" />
              <div className="absolute top-1/2 left-1/2 w-3 h-0.5 bg-gray-300 transform -translate-x-1/2 -translate-y-0.5 -rotate-45" />
              
              {/* Center hub */}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            {/* Tire tread marks */}
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-1 bg-gray-600"
                style={{
                  top: '10%',
                  left: '50%',
                  transformOrigin: '50% 400%',
                  transform: `translateX(-50%) rotate(${i * 45}deg)`
                }}
              />
            ))}
          </motion.div>
          
          {/* Enhanced Exhaust Effect - Intensity based on speed */}
          <motion.div
            className="absolute bottom-16 left-8 h-3 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80 rounded-full"
            style={{
              width: useTransform(engineIntensity, (value) => `${24 + value * 48}px`),
              scaleX: useTransform(engineIntensity, (value) => 1 + value * 2),
              opacity: useTransform(engineIntensity, (value) => 0.8 + value * 0.2),
              x: useTransform(engineIntensity, (value) => -value * 30)
            }}
            animate={isRolling ? {
              scaleY: [1, 1.5, 1.2, 1.5],
            } : {
              scaleY: [1, 1.2, 1],
            }}
            transition={{ duration: isRolling ? 0.1 : 0.4, repeat: Infinity }}
          />
          
          {/* Tire smoke effect - More intense when rolling */}
          <motion.div
            className="absolute bottom-4 left-8 h-8 bg-gradient-to-t from-gray-500/30 to-transparent rounded-full"
            style={{
              width: useTransform(engineIntensity, (value) => `${20 + value * 40}px`),
              scaleX: useTransform(engineIntensity, (value) => 1 + value * 2),
              opacity: useTransform(engineIntensity, (value) => 0.3 + value * 0.5),
              x: useTransform(engineIntensity, (value) => -value * 25)
            }}
            animate={isRolling ? {
              scaleY: [1, 1.8, 1.4, 1.8],
            } : {
              scaleY: [1, 0.8, 1],
            }}
            transition={{ duration: isRolling ? 0.1 : 0.8, repeat: Infinity }}
          />
          
          {/* Ground shadow - Dynamic based on movement */}
          <motion.div
            className="absolute bottom-0 left-0 w-32 h-4 bg-black/20 rounded-full blur-sm"
            style={{
              scaleX: useTransform(engineIntensity, (value) => 1 + value * 0.5),
              opacity: useTransform(engineIntensity, (value) => 0.2 + value * 0.4)
            }}
          />
          
          {/* Speed lines when car is rolling */}
          <SpeedLinesEffect isRolling={isRolling} carVelocity={carVelocity} />
          
          {/* Road dust particles */}
          <RoadDustParticlesEffect isRolling={isRolling} />
        </div>
      </motion.div>

      {/* Enhanced Dynamic Hero Content */}
      <div className="relative z-20 flex h-full items-center justify-center px-6">
        <motion.div 
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="text-center max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary"
            >
              <Zap size={32} className="text-primary-foreground" />
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-8xl font-display font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent"
              animate={{
                textShadow: [
                  '0 0 20px rgba(220, 20, 60, 0.5)',
                  '0 0 40px rgba(220, 20, 60, 0.8)',
                  '0 0 20px rgba(220, 20, 60, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              DRIVE THE CODE
            </motion.h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 font-body"
          >
            Where Performance Meets Precision • Full-Stack Developer
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "var(--glow-primary)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-lg shadow-primary transition-all duration-300 flex items-center gap-3"
            >
              <Code size={20} />
              View Projects
            </motion.button>
            
            {/* Start Rolling Button */}
            {showStartButton && (
              <motion.button
                onClick={startRolling}
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "hsl(var(--accent))",
                  color: "hsl(var(--accent-foreground))",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg border border-border transition-all duration-300 flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Rocket size={20} />
                {isRolling ? 'Rolling...' : 'Start Rolling'}
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center"
            >
              <ArrowDown size={24} className="text-primary" />
            </motion.div>
            <motion.div 
              className="absolute inset-0 border-2 border-primary/30 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <motion.span 
            className="text-sm text-muted-foreground font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SCROLL TO ACCELERATE
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}