import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Mesh } from 'three';
import { ArrowDown, Zap, Code, Rocket } from 'lucide-react';
import ferrariCar from '../assets/ferrari-car.png';
import cityBackground from '../assets/city-background.jpg';

// 3D Speed Lines Effect
function SpeedLines() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });

  const lines = Array.from({ length: 20 }, (_, i) => (
    <mesh key={i} ref={meshRef} position={[Math.sin(i) * 10, Math.cos(i) * 10, -5]}>
      <cylinderGeometry args={[0.02, 0.02, 5]} />
      <meshStandardMaterial 
        color="#DC143C" 
        emissive="#DC143C"
        emissiveIntensity={0.5}
      />
    </mesh>
  ));

  return <>{lines}</>;
}

// Dynamic Engine Sound Visualizer
function EngineVisualizer() {
  const [intensity, setIntensity] = useState(0.5);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIntensity(0.3 + Math.random() * 0.7);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700"
          emissiveIntensity={intensity}
        />
      </mesh>
    </Float>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Car movement on scroll
  const carX = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const carRotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  // Background parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  // Smooth spring animations
  const smoothCarX = useSpring(carX, { stiffness: 100, damping: 30 });
  const smoothCarRotate = useSpring(carRotate, { stiffness: 100, damping: 30 });

  // Dynamic text animations
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Dynamic City Background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${cityBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80" />
      </motion.div>

      {/* Speed Lines 3D Effect */}
      <div className="absolute inset-0 z-5">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Environment preset="night" />
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <pointLight position={[0, 0, 10]} color="#DC143C" intensity={3} />
          
          <SpeedLines />
          <EngineVisualizer />
          
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Ferrari Car - Scrolling Animation */}
      <motion.div
        style={{ 
          x: smoothCarX,
          rotate: smoothCarRotate,
          scale: carScale
        }}
        className="absolute bottom-0 left-0 z-10 w-full h-full pointer-events-none"
      >
        <div className="relative w-full h-full">
          <motion.img
            src={ferrariCar}
            alt="Ferrari"
            className="absolute bottom-0 left-0 w-auto h-1/2 object-contain"
            style={{ 
              filter: 'drop-shadow(0 0 20px rgba(220, 20, 60, 0.5))',
            }}
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(220, 20, 60, 0.5))',
                'drop-shadow(0 0 30px rgba(220, 20, 60, 0.8))',
                'drop-shadow(0 0 20px rgba(220, 20, 60, 0.5))'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Exhaust Effect */}
          <motion.div
            className="absolute bottom-16 left-8 w-20 h-2 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80 rounded-full"
            animate={{
              scaleX: [1, 1.5, 1],
              opacity: [0.8, 0.4, 0.8]
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Dynamic Hero Content */}
      <div className="relative z-20 flex h-full items-center justify-center px-6">
        <motion.div 
          style={{ opacity: textOpacity, scale: textScale }}
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
            
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              DRIVE THE CODE
            </h1>
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
              whileHover={{ scale: 1.05, boxShadow: "var(--glow-primary)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-lg shadow-primary transition-all duration-300 flex items-center gap-3"
            >
              <Code size={20} />
              View Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--muted))" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg border border-border transition-all duration-300 flex items-center gap-3"
            >
              <Rocket size={20} />
              Start Engine
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with speedometer style */}
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
            <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping" />
          </div>
          <span className="text-sm text-muted-foreground font-mono">SCROLL TO ACCELERATE</span>
        </div>
      </motion.div>
    </section>
  );
}