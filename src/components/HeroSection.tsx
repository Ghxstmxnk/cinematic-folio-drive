import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
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
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Enhanced car movement with realistic physics
  const carX = useTransform(scrollYProgress, [0, 1], ['0%', '120%']);
  const carRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const carY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  
  // Background parallax with depth
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  // Smooth spring animations for realistic movement
  const smoothCarX = useSpring(carX, { stiffness: 80, damping: 25 });
  const smoothCarRotate = useSpring(carRotate, { stiffness: 100, damping: 30 });
  const smoothCarY = useSpring(carY, { stiffness: 90, damping: 28 });

  // Dynamic text animations with scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.7]);
  const textY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-50%']);

  // Tire rotation animation
  const tireRotation = useMotionValue(0);
  
  useAnimationFrame(() => {
    const currentX = smoothCarX.get();
    const speed = parseFloat(currentX.replace('%', '')) / 100;
    tireRotation.set(tireRotation.get() + speed * 10);
  });

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Enhanced Dynamic City Background */}
      <motion.div 
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${cityBackground})` }}
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

      {/* Enhanced Ferrari Car with 3D Rolling Effect */}
      <motion.div
        style={{ 
          x: smoothCarX,
          y: smoothCarY,
          rotate: smoothCarRotate,
          scale: carScale
        }}
        className="absolute bottom-0 left-0 z-10 w-full h-full pointer-events-none"
      >
        <div className="relative w-full h-full">
          {/* Main car body */}
          <motion.div
            className="absolute bottom-0 left-0 w-auto h-1/2"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src={ferrariCar}
              alt="Ferrari"
              className="w-auto h-full object-contain"
              style={{ 
                filter: 'drop-shadow(0 0 25px rgba(220, 20, 60, 0.6))',
              }}
              animate={{
                filter: [
                  'drop-shadow(0 0 25px rgba(220, 20, 60, 0.6))',
                  'drop-shadow(0 0 35px rgba(220, 20, 60, 0.9))',
                  'drop-shadow(0 0 25px rgba(220, 20, 60, 0.6))'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Front Tire */}
          <motion.div
            className="absolute bottom-8 left-16 w-12 h-12 rounded-full border-4 border-gray-400 bg-gray-800"
            style={{ rotate: tireRotation }}
            animate={{
              boxShadow: [
                '0 0 10px rgba(100, 100, 100, 0.5)',
                '0 0 20px rgba(150, 150, 150, 0.8)',
                '0 0 10px rgba(100, 100, 100, 0.5)'
              ]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {/* Tire spokes */}
            <div className="absolute inset-2 rounded-full border-2 border-gray-500">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-500 transform -translate-y-0.5" />
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-500 transform -translate-x-0.5" />
            </div>
          </motion.div>
          
          {/* Rear Tire */}
          <motion.div
            className="absolute bottom-8 left-4 w-12 h-12 rounded-full border-4 border-gray-400 bg-gray-800"
            style={{ rotate: tireRotation }}
            animate={{
              boxShadow: [
                '0 0 10px rgba(100, 100, 100, 0.5)',
                '0 0 20px rgba(150, 150, 150, 0.8)',
                '0 0 10px rgba(100, 100, 100, 0.5)'
              ]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {/* Tire spokes */}
            <div className="absolute inset-2 rounded-full border-2 border-gray-500">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-500 transform -translate-y-0.5" />
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-500 transform -translate-x-0.5" />
            </div>
          </motion.div>
          
          {/* Enhanced Exhaust Effect */}
          <motion.div
            className="absolute bottom-16 left-8 w-24 h-3 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80 rounded-full"
            animate={{
              scaleX: [1, 1.8, 1],
              opacity: [0.8, 0.3, 0.8],
              x: [0, -10, 0]
            }}
            transition={{ duration: 0.4, repeat: Infinity }}
          />
          
          {/* Tire smoke effect */}
          <motion.div
            className="absolute bottom-4 left-8 w-20 h-8 bg-gradient-to-t from-gray-500/30 to-transparent rounded-full"
            animate={{
              scaleX: [1, 1.5, 1],
              scaleY: [1, 0.8, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          
          {/* Ground shadow */}
          <motion.div
            className="absolute bottom-0 left-0 w-32 h-4 bg-black/20 rounded-full blur-sm"
            animate={{
              scaleX: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
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
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "hsl(var(--muted))",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg border border-border transition-all duration-300 flex items-center gap-3"
            >
              <Rocket size={20} />
              Start Engine
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator with speedometer style */}
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